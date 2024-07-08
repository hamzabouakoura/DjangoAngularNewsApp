from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=1000)
    description = models.CharField(max_length=1000, null=True)
    author = models.CharField(max_length=1000, null=True)
    category = models.CharField(max_length=100, null=True)
    url = models.CharField(max_length=1000, null=True)
    imageUrl = models.CharField(max_length=1000, null=True)
    published_date = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.title
