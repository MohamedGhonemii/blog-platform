import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from blog.models import Category, Tag, BlogPost
from django.utils import timezone

def create_sample_data():
    print("📝 Creating sample data...")
    
    # Get or create admin user
    admin_user, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@example.com',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("✅ Created admin user")

    # Create sample author
    author, created = User.objects.get_or_create(
        username='author1',
        defaults={
            'email': 'author@example.com',
            'first_name': 'John',
            'last_name': 'Doe'
        }
    )
    if created:
        author.set_password('password123')
        author.save()
        print("✅ Created author user")

    # Create categories
    categories_data = [
        {'name': 'Technology', 'description': 'Latest technology trends and news'},
        {'name': 'Web Development', 'description': 'Web development tutorials and guides'},
        {'name': 'Design', 'description': 'UI/UX design principles and inspiration'},
        {'name': 'Business', 'description': 'Business strategies and insights'},
    ]
    
    categories = {}
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data['name'],
            defaults={'description': cat_data['description']}
        )
        categories[cat_data['name']] = category
        if created:
            print(f"✅ Created category: {cat_data['name']}")

    # Create tags
    tags_data = ['Django', 'React', 'Python', 'JavaScript', 'CSS', 'HTML', 'NextJS', 'Tailwind', 'API', 'UI/UX', 'Design']
    
    tags = {}
    for tag_name in tags_data:
        tag, created = Tag.objects.get_or_create(name=tag_name)
        tags[tag_name] = tag
        if created:
            print(f"✅ Created tag: {tag_name}")

    # Create sample blog posts
    sample_posts = [
        {
            'title': 'Getting Started with Django REST Framework',
            'slug': 'getting-started-with-django-rest-framework',
            'content': '''
            <h2>Introduction to Django REST Framework</h2>
            <p>Django REST Framework (DRF) is a powerful and flexible toolkit for building Web APIs in Django. It provides features like serialization, authentication, and viewSets that make API development straightforward.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li>Web browsable API</li>
                <li>Authentication policies</li>
                <li>Serialization that supports both ORM and non-ORM data sources</li>
                <li>Customizable all the way down</li>
            </ul>
            
            <p>In this tutorial, we will build a simple blog API with DRF.</p>
            ''',
            'excerpt': 'Learn how to build RESTful APIs with Django REST Framework in this comprehensive guide.',
            'categories': ['Technology', 'Web Development'],
            'tags': ['Django', 'Python', 'API'],
        },
        {
            'title': 'Building Modern React Applications',
            'slug': 'building-modern-react-applications',
            'content': '''
            <h2>Modern React Development</h2>
            <p>React has evolved significantly over the years. With the introduction of hooks and functional components, building React applications has become more intuitive and powerful.</p>
            
            <h3>What We'll Cover</h3>
            <ul>
                <li>React Hooks (useState, useEffect)</li>
                <li>Context API for state management</li>
                <li>Custom hooks</li>
                <li>Performance optimization</li>
            </ul>
            
            <p>By the end of this guide, you will have a solid understanding of modern React patterns.</p>
            ''',
            'excerpt': 'Explore modern React patterns and best practices for building scalable applications.',
            'categories': ['Web Development'],
            'tags': ['React', 'JavaScript'],
        },
        {
            'title': 'The Principles of Good UI/UX Design',
            'slug': 'principles-of-good-ui-ux-design',
            'content': '''
            <h2>UI/UX Design Principles</h2>
            <p>Good design is not just about making things look pretty. It is about creating intuitive, accessible, and enjoyable experiences for users.</p>
            
            <h3>Key Principles</h3>
            <ul>
                <li>Consistency across the application</li>
                <li>Clear visual hierarchy</li>
                <li>Accessibility considerations</li>
                <li>User-centered design approach</li>
            </ul>
            
            <p>Implementing these principles will significantly improve user satisfaction and engagement.</p>
            ''',
            'excerpt': 'Discover the fundamental principles that make for great user interfaces and experiences.',
            'categories': ['Design'],
            'tags': ['Design', 'UI/UX'],
        },
    ]
    
    for i, post_data in enumerate(sample_posts):
        post, created = BlogPost.objects.get_or_create(
            title=post_data['title'],
            defaults={
                'slug': post_data['slug'],
                'author': author,
                'content': post_data['content'],
                'excerpt': post_data['excerpt'],
                'status': 'published',
                'published_at': timezone.now(),
            }
        )
        
        if created:
            # Add categories
            for cat_name in post_data['categories']:
                post.categories.add(categories[cat_name])
            
            # Add tags
            for tag_name in post_data['tags']:
                if tag_name in tags:
                    post.tags.add(tags[tag_name])
            
            print(f"✅ Created post: {post.title}")
        else:
            print(f"ℹ️  Post already exists: {post.title}")
    
    print("🎉 Sample data creation completed!")

if __name__ == '__main__':
    create_sample_data()
