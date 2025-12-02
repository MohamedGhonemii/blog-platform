const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  author: string;
  categories: Category[];
  tags: Tag[];
  published_at: string;
  view_count: number;
  reading_time: number;
  content?: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogPost[];
}

export async function getPublishedPosts(
  searchQuery?: string,
  categorySlug?: string
): Promise<ApiResponse> {
  try {
    // Build URL without pagination
    let apiUrl = `${API_BASE_URL}/api/posts/`;

    // Add query parameters if provided
    const params = new URLSearchParams();
    
    if (categorySlug) {
      params.append('category', categorySlug);
    }
    
    if (searchQuery) {
      params.append('search', searchQuery);
    }
    
    // Add params to URL if any exist
    const queryString = params.toString();
    if (queryString) {
      apiUrl += `?${queryString}`;
    }

    console.log('📡 Fetching posts from:', apiUrl);

    const response = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status}`);
      // Try without trailing slash
      const altUrl = `${API_BASE_URL}/api/posts`;
      console.log('🔄 Trying alternative URL:', altUrl);
      
      const altResponse = await fetch(altUrl, { cache: 'no-store' });
      if (!altResponse.ok) {
        console.error(`❌ Alternative URL also failed: ${altResponse.status}`);
        return {
          count: 0,
          next: null,
          previous: null,
          results: []
        };
      }
      
      const altData: ApiResponse = await altResponse.json();
      console.log(`✅ Fetched ${altData.results.length} posts`);
      return altData;
    }

    const data: ApiResponse = await response.json();
    console.log(`✅ Fetched ${data.results.length} posts`);

    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const apiUrl = `${API_BASE_URL}/api/categories/?limit=100`;
    console.log('📡 Fetching categories from:', apiUrl);

    const response = await fetch(apiUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`❌ API Error for categories: ${response.status}`);
      // Return mock categories if API fails
      return [
        { id: 1, name: "Technology", slug: "technology", description: "Latest technology trends and news" },
        { id: 2, name: "Web Development", slug: "web-development", description: "Web development tutorials and guides" },
        { id: 3, name: "Design", slug: "design", description: "UI/UX design principles and inspiration" }
      ];
    }

    const data = await response.json();
    // Extract results array from paginated response
    const categories = data.results || data;
    console.log(`✅ Fetched ${categories.length} categories`);

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const apiUrl = `${API_BASE_URL}/api/posts/${slug}/`;
    console.log('📡 Fetching post from:', apiUrl);

    const response = await fetch(apiUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.log(`API returned ${response.status} for slug: ${slug}`);
      if (response.status === 404) {
        return null;
      }
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
