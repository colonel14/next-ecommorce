"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";

const filters = [
  {
    id: "category",
    name: "التصنيف",
    options: [
      { value: "bags", label: "حقائب" },
      { value: "belts", label: "أحزمة" },
      { value: "gloves", label: "جلوفز" },
      { value: "scarves", label: "أوشحة" },
      { value: "wallets", label: "محافظ" },
    ],
  },
  {
    id: "size",
    name: "الحجم",
    options: [
      { value: "xs", label: "X-Small" },
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" },
      { value: "xl", label: "X-Large" },
      { value: "one-size", label: "One Size" },
    ],
  },
  {
    id: "color",
    name: "اللون",
    options: [
      { value: "black", label: "أسود" },
      { value: "blue", label: "أزرق" },
      { value: "brown", label: "بني" },
      { value: "green", label: "أخضر" },
      { value: "yellow", label: "أصفر" },
    ],
  },
];

const priceFilters = [
  { value: "0-5000", label: "0 - 5000$" },
  { value: "5000-7500", label: "5000 - 7500$" },
  { value: "7500-10000", label: "7500 - 10000$" },
  { value: "10000-15000", label: "10000 - 15000$" },
];

interface FilterSelection {
  [key: string]: string[];
}

export function ProductFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterValues = Array.from(searchParams.entries());

  const activeFilters: FilterSelection = filterValues.reduce(
    (acc: any, [key, value]) => {
      if (!acc[key]) {
        acc[key] = [];
      }

      // Split the value by comma to form an array if there are comma-separated values
      const parsedValues = value.split(",");
      parsedValues.forEach((val) => {
        if (!acc[key].includes(val)) {
          acc[key].push(val);
        }
      });

      return acc;
    },
    {}
  );

  function handleMultiFilter(query: string, value: string, isChecked: boolean) {
    const params = new URLSearchParams(searchParams);
    const currentValues = activeFilters[query] || [];

    if (isChecked && !currentValues.includes(value)) {
      currentValues.push(value);
    } else if (!isChecked) {
      const index = currentValues.indexOf(value);
      if (index !== -1) {
        currentValues.splice(index, 1);
      }
    }

    if (currentValues.length > 0) {
      activeFilters[query] = currentValues;
      params.set(query, currentValues.join(","));
    } else {
      delete activeFilters[query];
      params.delete(query);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function isFilterActive(query: string, value: string): boolean {
    return (activeFilters[query] || []).includes(value);
  }

  function handleCheckboxChange(query: string, value: string) {
    const isChecked = isFilterActive(query, value);
    handleMultiFilter(query, value, !isChecked);
  }

  return (
    <form className="sticky top-20 py-7 p-4">
      <h3 className="sr-only">التصنيفات</h3>
      <div className="mb-8">
        <span className="block ml-1 mb-4">بحث</span>
        <Input type="text" />
      </div>
      <div className="mb-8">
        <span>
          السعر
          <span className="block ml-1 mb-4 text-xs font-extrabold uppercase text-gray-400"></span>
        </span>
        <div className="space-y-4">
          <RadioGroup>
            {priceFilters.map((option, optionIdx) => (
              <div
                key={option.value}
                className="flex items-center rtl:flex-row-reverse gap-2"
              >
                <RadioGroupItem
                  value={option.value}
                  id={`filter-price-${optionIdx}`}
                  checked={filterValues.some(
                    ([key, value]) =>
                      key == "price" && value.includes(option.value)
                  )}
                  onClick={(e) => {
                    const params = new URLSearchParams(searchParams);
                    const checked = e.currentTarget.dataset.state == "checked";

                    checked
                      ? params.delete("price")
                      : params.set("price", option.value);

                    replace(`${pathname}?${params.toString()}`);
                  }}
                />
                <label
                  htmlFor={`filter-price-${optionIdx}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      {filters.map((section, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>
              <span>
                {section.name}{" "}
                <span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`filter-${section.id}-${optionIdx}`}
                      checked={filterValues.some(
                        ([key, value]) =>
                          key == section.id && value.includes(option.value)
                      )}
                      onClick={(e) => {
                        const checked =
                          e.currentTarget.dataset.state == "checked";
                        handleCheckboxChange(section.id, option.value);
                      }}
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </form>
  );
}
