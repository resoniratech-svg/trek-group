import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:text-blue-600 flex items-center transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={crumb.item} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400 flex-shrink-0" />
              {isLast ? (
                <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg inline-block" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.item}
                  className="hover:text-blue-600 transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
