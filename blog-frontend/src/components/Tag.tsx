import Link from 'next/link';

interface TagProps {
  tag: string;
  count?: number;
  className?: string;
}

export default function Tag({ tag, count, className = '' }: TagProps) {
  return (
    <Link
      href={`/tag/${encodeURIComponent(tag)}`}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors ${className}`}
    >
      {tag}
      {count !== undefined && (
        <span className="ml-1.5 bg-white/50 rounded-full px-1.5 py-0.5 text-xs font-medium">
          {count}
        </span>
      )}
    </Link>
  );
}
