from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from .models import Category, Tag, BlogPost

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'post_count']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ['name']}
    
    def post_count(self, obj):
        return obj.blog_posts.count()
    post_count.short_description = 'Post Count'

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'post_count']
    search_fields = ['name']
    prepopulated_fields = {'slug': ['name']}
    
    def post_count(self, obj):
        return obj.blog_posts.count()
    post_count.short_description = 'Post Count'

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'status', 'published_at', 'view_count', 'reading_time', 'featured_image_preview']
    list_filter = ['status', 'categories', 'tags', 'published_at', 'author']
    search_fields = ['title', 'content', 'excerpt']
    prepopulated_fields = {'slug': ['title']}
    readonly_fields = ['view_count', 'reading_time', 'created_at', 'updated_at']
    filter_horizontal = ['categories', 'tags']
    actions = ['publish_posts', 'unpublish_posts']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'content', 'excerpt', 'featured_image')
        }),
        ('Classification', {
            'fields': ('author', 'categories', 'tags')
        }),
        ('Publication', {
            'fields': ('status', 'published_at')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description')
        }),
        ('Statistics', {
            'fields': ('view_count', 'reading_time', 'created_at', 'updated_at')
        }),
    )
    
    def featured_image_preview(self, obj):
        if obj.featured_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.featured_image.url)
        return "-"
    featured_image_preview.short_description = 'Featured Image'
    
    def publish_posts(self, request, queryset):
        updated = queryset.update(status='published', published_at=timezone.now())
        self.message_user(request, f'{updated} posts were successfully published.')
    
    def unpublish_posts(self, request, queryset):
        updated = queryset.update(status='draft', published_at=None)
        self.message_user(request, f'{updated} posts were successfully unpublished.')
    
    publish_posts.short_description = "Publish selected posts"
    unpublish_posts.short_description = "Unpublish selected posts"
