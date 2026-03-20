import { cn } from "../../utils/cn";

const s = {
  b: "inline-flex items-center justify-center gap-2 font-bold transition-all shadow-sm focus:outline-none focus:ring-2 disabled:opacity-50",
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 rounded-xl",
  lg: "px-8 py-3 text-lg rounded-xl",
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200",
  danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
  ghost: "bg-transparent text-gray-400 hover:text-blue-600 hover:bg-blue-50 shadow-none p-1.5"
};

export function Button({ variant = "primary", size = "md", className, children, ...props }) {
    const sizeCls = size === "sm" ? s.sm : size === "lg" ? s.lg : s.md;
    return (
        <button
            className={cn(s.b, sizeCls, s[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
}
