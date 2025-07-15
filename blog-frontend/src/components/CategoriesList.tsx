'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Category } from '@/types/post';
import CategoryBadge from './CategoryBadge';

interface CategoryWithCount extends Category {
  postCount: number;
}

interface CategoriesListProps {
  categories: CategoryWithCount[];
  className?: string;
}

export default function CategoriesList({ categories, className = '' }: CategoriesListProps) {
  if (!categories || categories.length === 0) return null;

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Categories
      </h3>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/category/${category.slug.current}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <CategoryBadge
                  title={category.title}
                  slug={category.slug.current}
                  color={category.color}
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
