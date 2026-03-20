import { cn } from "../../utils/cn";

const s = {
  base: "px-2 py-1 rounded-full text-xs font-medium",
  success: "bg-green-100 text-green-700",
  neutral: "bg-gray-100 text-gray-600",
  danger: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-800"
};

export function Badge({ variant = "neutral", className, children, ...props }) {
    return (
        <span className={cn(s.base, s[variant], className)} {...props}>
            {children}
        </span>
    );
}
