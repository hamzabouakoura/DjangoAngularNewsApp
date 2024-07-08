import json
import os
from venv import logger
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache
import requests
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.db.models import Q



class ArticlePagination(PageNumberPagination):
    page_size = 10 

@api_view(["GET"])
def fetch_news(request):
    category = request.query_params.get('category')
    country = request.query_params.get('country')
    q = request.query_params.get('q', '')
    page = request.query_params.get('page', 1)
    page_size = request.query_params.get('pageSize', 10)

    if not category or not country:
        return Response({"error": "Category and country are required parameters."}, status=status.HTTP_400_BAD_REQUEST)
    
    cache_key = f'news_{category}_{country}_{q}_{page}_{page_size}'
    cached_news = cache.get(cache_key)

    if cached_news:
        return Response(json.loads(cached_news), status=status.HTTP_200_OK)
    
    

    # Fetch articles from the database
    articles = Article.objects.filter(category=category, country=country , title__icontains=q).order_by('-published_date')
    
    if articles.exists():
        paginator = ArticlePagination()
        result_page = paginator.paginate_queryset(articles, request)
        serializer = ArticleSerializer(result_page, many=True)
        response_data = paginator.get_paginated_response(serializer.data).data
        cache.set(cache_key, json.dumps(response_data), timeout=60 * 60)  # Cache for 1 hour

        return Response(response_data, status=status.HTTP_200_OK)
    
    # Fetch articles from the News API
    params = {
        'apiKey': os.getenv('NEWS_API_KEY'),
        'category': category,
        'country': country,
        'q': q,
        'pageSize': 100
    }

    try:
        response = requests.get('https://newsapi.org/v2/top-headlines', params=params)
        response.raise_for_status()
    except requests.RequestException as e:
        logger.error(f"Error fetching news from News API: {e}")
        return Response({"error": "Failed to fetch news from external source."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    data = response.json()

    if 'articles' not in data:
        return Response({"error": "Invalid response from News API."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    articles_to_create = []
    for article_data in data['articles']:
        articles_to_create.append(Article(
            title=article_data['title'],
            url=article_data['url'],
            description=article_data['description'],
            imageUrl=article_data['urlToImage'],
            published_date=article_data['publishedAt'],
            author=article_data['author'],
            category=category,
            country=country
        ))

    # Bulk create articles
    Article.objects.bulk_create(articles_to_create)

    # Fetch newly created articles
    articles = Article.objects.filter(category=category, country=country)
    paginator = ArticlePagination()
    result_page = paginator.paginate_queryset(articles, request)
    serializer = ArticleSerializer(result_page, many=True)
    response_data = paginator.get_paginated_response(serializer.data).data
    cache.set(cache_key, json.dumps(response_data), timeout=60 * 60)

    return Response(response_data, status=status.HTTP_200_OK)


