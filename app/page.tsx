import Breadcrumbs from "@/components/Breadcrumbs";
import MobileFilters from "@/components/mobile-filters";
import { ProductFilters } from "@/components/product-filters";
import ProductsSort from "@/components/product-sort";

interface Props {
  searchParams: {
    price?: string;
  };
}

export default function HomePage({ searchParams }: Props) {
  return (
    <main className="py-20 min-h-screen bg-[#F2F4F6]">
      <div className="container">
        <Breadcrumbs />
        <div className="mt-10 lg:grid lg:grid-cols-12 gap-10">
          <div className="hidden lg:block lg:col-span-3 bg-white shadow-md rounded-md">
            <ProductFilters />
          </div>
          <div className="lg:col-span-8">
            <div className="lg:hidden">
              <MobileFilters />
            </div>
            <div className="hidden lg:block">
              <ProductsSort />
            </div>
            {/* Product cards goes here */}
            المنتجات هنا
          </div>
        </div>
      </div>
    </main>
  );
}
