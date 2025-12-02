# backend/blog/serializers.py
from rest_framework import serializers
from .models import Category, Tag, BlogPost

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']

class BlogPostListSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.get_full_name', read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image', 
            'author', 'categories', 'tags', 'published_at', 
            'view_count', 'reading_time'
        ]

class BlogPostDetailSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.get_full_name', read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 'featured_image',
            'author', 'categories', 'tags', 'published_at', 'updated_at',
            'view_count', 'reading_time', 'meta_title', 'meta_description'
        ]