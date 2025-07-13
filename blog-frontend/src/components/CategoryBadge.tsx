import Link from 'next/link';

interface CategoryBadgeProps {
  title: string;
  slug: string;
  color?: string;
  className?: string;
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  green: 'bg-green-100 text-green-800 hover:bg-green-200',
  purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  pink: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
};

export default function CategoryBadge({ title, slug, color = 'blue', className = '' }: CategoryBadgeProps) {
  const colorClasses = colorMap[color] || colorMap.blue;
  
  return (
    <Link
      href={`/category/${slug}`}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${colorClasses} ${className}`}
    >
      {title}
    </Link>
  );
}
