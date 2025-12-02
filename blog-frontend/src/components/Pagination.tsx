'use client'

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Don't show pagination if only 1 page
  if (totalPages <= 1) {
    return (
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
        Showing all {totalItems} articles
      </div>
    );
  }
  
  const generatePageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Keep all existing query parameters (category, search, etc.)
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page'); // Remove page param for page 1
    }
    
    const queryString = params.toString();
    return queryString ? `/blog?${queryString}` : '/blog';
  };
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    router.push(generatePageUrl(page), { scroll: true });
  };
  
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);
  
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      {/* Pagination Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{totalItems}</span> articles
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
              currentPage === 1
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg border text-sm font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
              currentPage === totalPages
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </div>
      </div>
    </div>
  );
}
