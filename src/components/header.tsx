import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--accent-a5)] backdrop-blur-sm supports-backdrop-filter:bg-[var(--accent-3)]/60">
      <div className="container mx-auto flex h-14 w-full items-center justify-between px-4">
        My Radix App
        <ThemeToggle />
      </div>
    </header>
  );
}
