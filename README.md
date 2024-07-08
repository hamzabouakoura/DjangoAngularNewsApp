# News App Project

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
   - [Database Configuration](#database-configuration)
   - [Caching Configuration](#caching-configuration)
3. [Running the Project](#Running-Project)
4. [API Documentation](#api-documentation)
   - [Fetch News](#fetch-news)

---

## Project Overview

This project is a news web application built with Django and Django REST framework as the backend to fetch news from the News API, incorporating database optimizations and caching. The frontend is built with Angular to display the news articles.

---

## Setup Instructions

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/hamzabouakoura/DjangoAngularNewsApp.git
   cd DjangoAngularNewsApp/newsApp-Back
2. Create and Activate Virtual Environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

4. Install Dependencies:
   ```bash
   pip install -r requirements.txt

6. Set Up Environment Variables:
   ```bash
   DB_USER=your postgres database user
   DB_PASSWORD=your postgres database password
   DB_HOST=your postgres database host
   DB_PORT=your postgres database port (eg:6543)
   NEWS_API_KEY=Your_news_api_key
   
8. Run Migrations:
   ```bash
   python manage.py migrate

   

### Frontend Setup
1. Navigate to Frontend Directory:
   ```bash
   cd ../newsApp-Front
3. Install Dependencies:
   ```bash
   npm install


### Caching Configuration
1. Set up caching in your Django settings (settings.py):
   ```bash
   CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
        'KEY_PREFIX': 'newsAppProject'
    }
   }
2. Unsure that redis is running on you machine (you can use docker to run it on windows)


### Running the Project
```bash

# Navigate to the backend directory and start the Django server
cd newsApp-Back
# run django server
source venv/bin/activate  # Activate virtual environment
python manage.py runserver

# Navigate to the frontend directory and start the Angular server
cd ../newsApp-Front
# run angular server
ng serve 

```


## API Documentation



### Fetch News

- **URL:** `/news/fetch_news/`
- **Method:** `GET`
- **Query Parameters:**
  - `category`: Category of the news (required)
  - `country`: Country code (required)
  - `page`: Page number (optional)
  - `pageSize`: Number of articles per page (optional)

**Example Request:**
```http
GET /news/fetch_news/?category=technology&country=us&page=1&pageSize=10







