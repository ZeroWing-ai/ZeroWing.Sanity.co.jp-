'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllTags } from '@/sanity/lib/api';
import Tag from './Tag';

export default function TagCloud({ className = '' }: { className?: string }) {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getAllTags();
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (tags.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Tag tag={tag} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
