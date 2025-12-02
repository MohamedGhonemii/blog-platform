import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { format } from 'date-fns';

interface BlogContentProps {
  post: BlogPost;
}

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <article>
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.published_at}>
            {format(new Date(post.published_at), 'MMMM dd, yyyy')}
          </time>
          <span className="mx-2">•</span>
          <span>{post.reading_time} min read</span>
          <span className="mx-2">•</span>
          <span>👁️ {post.view_count} views</span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.map((category) => (
            <span
              key={category.id}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
