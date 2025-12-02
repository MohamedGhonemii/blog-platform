// blog-frontend/src/types/blog.ts

/**
 * تعريف نوع الـ PaginatedResponse الذي تعيده Django REST Framework.
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * تعريف نوع بيانات الفئة (Category).
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string; // تم الإضافة: لوصف الفئة
}

/**
 * تعريف نوع بيانات الوسم (Tag).
 */
export interface Tag {
  id: number;
  name: string;
  slug: string;
}

/**
 * تعريف نوع بيانات منشور المدونة (Post).
 * ملاحظة: يجب أن يتطابق هذا مع الـ Serializer في Django.
 */
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  // تم التعديل: نفترض أن الـ Serializer سيعيد مسار URL كـ string
  featured_image: string; 
  // تم التعديل: نفترض أن الـ Serializer سيعيد اسم المستخدم (username) كـ string فقط
  author: number; 
  categories: Category[]; 
  tags: Tag[]; 
  // تم الإبقاء على حقل حالة النشر لأنه أساسي لمنطق العرض والتصفية
  publication_status: 'draft' | 'published'; 
  created_at: string;
  updated_at: string;
  view_count: number;
  reading_time: number;
  // تم التعديل: استخدام meta_title/meta_description كحقول اختيارية
  meta_title?: string; 
  meta_description?: string; 
}

/**
 * تعريف نوع بيانات مرشحات البحث.
 */
export interface BlogFilters {
  // تم التعديل: جميع المرشحات أصبحت اختيارية 
  search?: string;
  categories?: string; // slug of category
  tags?: string; // slug of tag
  ordering?: string;
  page?: number;
}