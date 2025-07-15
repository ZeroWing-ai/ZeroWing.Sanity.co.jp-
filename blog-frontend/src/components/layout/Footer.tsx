import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/sorattigo', icon: 'github' },
  { name: 'Twitter', href: 'https://twitter.com/sorattigo', icon: 'twitter' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/hayato-ikeda', icon: 'linkedin' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Hayato Ikeda. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label={item.name}
              >
                <span className="sr-only">{item.name}</span>
                <i className={`fab fa-${item.icon} text-xl`} />
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Built with Next.js, Sanity, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
