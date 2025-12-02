import { Category, Tag } from '@/types/blog';

interface FilterSidebarProps {
  categories: Category[] | null | undefined;
  tags: Tag[] | null | undefined;
  activeCategory: string;
  onCategoryFilter: (categorySlug: string) => void;
}

export default function FilterSidebar({
  categories,
  tags,
  activeCategory,
  onCategoryFilter,
}: FilterSidebarProps) {
  // More defensive array handling
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeTags = Array.isArray(tags) ? tags : [];

  console.log('FilterSidebar - categories:', categories);
  console.log('FilterSidebar - safeCategories:', safeCategories);

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryFilter('')}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
              !activeCategory
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {safeCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryFilter(category.slug)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeCategory === category.slug
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
          {safeCategories.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-2">
              No categories available
            </p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {safeTags.slice(0, 10).map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
            >
              #{tag.name}
            </span>
          ))}
          {safeTags.length === 0 && (
            <p className="text-gray-500 text-sm text-center w-full py-2">
              No tags available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}