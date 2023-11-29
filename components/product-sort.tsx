"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const sortOptions = [
  { id: "selling", name: "الأفضل مبيعا", value: "desc" },
  { id: "price", name: "الأقل سعرا", value: "asc" },
  { id: "price", name: "الأعلي سعرا", value: "desc" },
  { id: "score", name: "الأفضل تقييما", value: "desc" },
  { id: "date", name: "الأحدث", value: "desc" },
];

function ProductsSort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const sortValues = Array.from(searchParams.entries());

  return (
    <div className="flex gap-px shadow-md rounded-md overflow-hidden mb-10">
      {sortOptions.map((option) => (
        <div
          key={option.value}
          className={cn(
            "relative py-4 px-2 bg-white text-center flex-1 hover:bg-[#F2F4F6] transition-all cursor-pointer",
            sortValues.some(
              ([key, value]) => key == option.id && value.includes(option.value)
            ) &&
              "after:content-['*'] after:w-full after:h-[2px] after:bg-black after:absolute after:bottom-0 after:left-0"
          )}
          onClick={() => replace(`${pathname}/?${option.id}=${option.value}`)}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
}

export default ProductsSort;
