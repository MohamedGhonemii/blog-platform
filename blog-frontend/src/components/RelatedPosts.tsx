import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  currentPost: BlogPost;
}

export default function RelatedPosts({ currentPost }: RelatedPostsProps) {
  // For now, return an empty component since we don't have related posts API
  // You can implement this later when you have the API endpoint
  return null;
  
  // Example implementation when you have related posts:
  /*
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
  */
}
