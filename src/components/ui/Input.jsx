import { cn } from "../../utils/cn";

const s = {
  base: "w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all",
  focus: "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  defaultBorder: "border-gray-200",
  error: "border-red-300 focus:ring-red-500"
};

export function Input({ className, hasError, ...props }) {
    return (
        <input
            className={cn(s.base, s.focus, hasError ? s.error : s.defaultBorder, className)}
            {...props}
        />
    );
}
