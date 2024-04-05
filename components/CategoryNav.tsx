import { Category } from "@/constants/category";
import { cn } from "@/lib/utils";

const CategoryNav = ({
  setCat,
  cat,
}: {
  setCat: (cat: string) => void;
  cat: string;
}) => {
  return (
    <div className="flex gap-4">
      {Category.map((category) => (
        <div
          className={cn(
            "p-2 px-3 bg-zinc-200 dark:bg-slate-900 rounded-lg cursor-pointer transition h-fit",
            cat === category && "bg-zinc-400 dark:bg-neutral-800"
          )}
          onClick={() => setCat(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;
