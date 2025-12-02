from rest_framework import generics, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter
from django.db.models import Q
from .models import Category, Tag, BlogPost
from .serializers import (
    CategorySerializer, TagSerializer,
    BlogPostListSerializer, BlogPostDetailSerializer
)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

# Custom filter for BlogPost to support slug filtering
class BlogPostFilter(FilterSet):
    category = CharFilter(field_name='categories__slug', lookup_expr='exact')
    categories = CharFilter(field_name='categories__slug', lookup_expr='exact')
    tag = CharFilter(field_name='tags__slug', lookup_expr='exact')
    tags = CharFilter(field_name='tags__slug', lookup_expr='exact')
    
    class Meta:
        model = BlogPost
        fields = []

class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = BlogPostFilter
    search_fields = ['title', 'content', 'excerpt', 'categories__name', 'tags__name']
    ordering_fields = ['published_at', 'view_count', 'reading_time']
    ordering = ['-published_at']

    def get_queryset(self):
        queryset = BlogPost.objects.filter(status='published').select_related('author').prefetch_related('categories', 'tags')

        # Handle search with Q objects for better performance
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(content__icontains=search_query) |
                Q(excerpt__icontains=search_query) |
                Q(categories__name__icontains=search_query) |
                Q(tags__name__icontains=search_query)
            ).distinct()

        return queryset

class BlogPostDetailView(generics.RetrieveAPIView):
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return BlogPost.objects.filter(status='published').select_related('author').prefetch_related('categories', 'tags')

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.increment_view_count()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
