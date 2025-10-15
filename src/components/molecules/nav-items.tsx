"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NavItems = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";

    const firstSegment = pathname.split("/")[1];
    const pathSegment = path.split("/")[1];
    return firstSegment === pathSegment;
  };
  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            title={label}
            aria-current={isActive(href) ? "page" : undefined}
            className={cn(
              "hover:text-yellow-500 transition-colors",
              isActive(href) ? "text-gray-100" : "",
            )}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
