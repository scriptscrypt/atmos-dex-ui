"use client";
import atmosLogo from "@/assets/atmosLogo.png";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import useMode from "@/hooks/useMode";
import { Globe, Menu, Moon, Search, Sun } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function NavbarComponent() {
  const [activeItem, setActiveItem] = useState("Trade");
  const { isDarkMode, toggleDarkMode } = useMode();

  const menuItems = ["Trade", "Explore", "Pool"];

  const MobileMenuItem = ({ item }: { item: string }) => (
    <SheetClose asChild>
      <button
        className={`w-full text-left px-4 py-3 text-lg ${
          activeItem === item
            ? "text-[#0bd790] bg-gray-100 dark:bg-gray-800"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        onClick={() => setActiveItem(item)}
      >
        {item}
      </button>
    </SheetClose>
  );

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <nav className="flex items-center justify-between p-4 bg-background text-foreground border-b transition-colors duration-200">
        {/* Left section */}
        <div className="flex items-center space-x-8">
          <div className="w-32 cursor-pointer">
            <Image src={atmosLogo} alt="Atmos Logo" width={100} height={100} />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <button
                key={item}
                className={`text-sm font-medium ${
                  activeItem === item
                    ? "text-[#0bd790]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Search - hidden on mobile */}
          <div className="hidden md:relative md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tokens and NFT collections"
              className="pl-10 pr-4 py-2 w-80 rounded-full"
            />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Select language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Connect Button */}
          <Button className="bg-[#0bd790] hover:bg-[#0bd790d5] text-gray-800 rounded-full px-4 py-2">
            Connect
          </Button>

          {/* Hamburger Menu - visible only on mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col py-4">
                  {/* Mobile Search */}
                  <div className="px-4 pb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search tokens and NFT collections"
                        className="pl-10 pr-4 py-2 w-full rounded-full"
                      />
                    </div>
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="border-y">
                    {menuItems.map((item) => (
                      <MobileMenuItem key={item} item={item} />
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
