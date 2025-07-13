import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles and updates',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <main className="pt-24 pb-16">
        {children}
      </main>
    </div>
  );
}
