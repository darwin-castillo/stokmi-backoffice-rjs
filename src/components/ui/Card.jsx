import { cn } from "../../utils/cn";

const s = {
  base: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden",
  padding: "p-6 sm:p-8"
};

export function Card({ className, noPadding, children, ...props }) {
    return (
        <div className={cn(s.base, !noPadding && s.padding, className)} {...props}>
            {children}
        </div>
    );
}
