import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/constants/site";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        variant === "light" && "rounded-md bg-white px-2 py-1",
        className
      )}
    >
      <Image
        src="/images/logo.png"
        alt={SITE_CONFIG.fullName}
        width={941}
        height={265}
        className="h-12 w-auto sm:h-16"
        priority
      />
    </div>
  );
}
