"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ListFilter, ArrowUpDown } from "lucide-react";
import { ProductFilters } from "./product-filters";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { sortOptions } from "./product-sort";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

function MobileFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterValues = Array.from(searchParams.entries());

  return (
    <div className="mb-10 flex items-center  gap-4">
      <Sheet>
        <SheetTrigger className="flex items-center gap-3 bg-white shadow-sm rounded-sm p-2 px-3">
          التصنيفات <ListFilter className="w-4 h-4" />
        </SheetTrigger>
        <SheetContent className="w-screen h-screen" side="bottom">
          <ProductFilters />
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger className="flex items-center gap-3 bg-white shadow-sm rounded-sm p-2 px-3">
          الترتيب <ArrowUpDown className="w-4 h-4" />
        </SheetTrigger>
        <SheetContent className="w-screen h-auto py-20" side="bottom">
          <div className="space-y-8">
            <RadioGroup>
              {sortOptions.map((option, optionIdx) => (
                <div
                  key={option.value}
                  className="flex items-center rtl:flex-row-reverse gap-2"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`filter-price-${optionIdx}`}
                    checked={filterValues.some(
                      ([key, value]) =>
                        key == option.id && value.includes(option.value)
                    )}
                    onClick={(e) => {
                      const params = new URLSearchParams(searchParams);
                      const checked =
                        e.currentTarget.dataset.state == "checked";

                      checked
                        ? params.delete(option.id)
                        : params.set(option.id, option.value);

                      replace(`${pathname}/?${option.id}=${option.value}`);
                    }}
                  />
                  <label
                    htmlFor={`filter-${option.id}-${optionIdx}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileFilters;
