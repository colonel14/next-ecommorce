import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";

function Breadcrumbs() {
  const breadcrumbLinks = [
    { title: "المنتجات", url: "/products" },
    { title: "التصنيف", url: "/products/category" },
    { title: "الصفحة الحالية", url: "/products/category/current" },
  ];
  return (
    <ul className="list-none p-0 inline-flex items-center gap-1">
      <li className="flex items-center gap-2">
        <Link href="/">
          <Home className="w-5 h-5" />
        </Link>
        <ChevronLeft className="w-4 h-4" />
      </li>
      {breadcrumbLinks.map((link, index) => (
        <li key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronLeft className="w-4 h-4" /> // Separator
          )}
          {index === breadcrumbLinks.length - 1 ? ( // Last item in breadcrumb
            <span className="text-muted-foreground">{link.title}</span>
          ) : (
            <Link
              href={link.url}
              className={"text-blue-500 hover:text-blue-500"}
            >
              {link.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Breadcrumbs;
