from django.urls import path
from .views import (
    BlogPostListView,
    BlogPostDetailView,
    CategoryListView,
    TagListView,
)

urlpatterns = [
    path('posts/', BlogPostListView.as_view(), name='blogpost-list'),
    path('posts/<slug:slug>/', BlogPostDetailView.as_view(), name='blogpost-detail'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('tags/', TagListView.as_view(), name='tag-list'),
]
