'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, Search } from 'lucide-react'

export function NavbarComponent() {
  const [activeItem, setActiveItem] = useState('Trade')

  return (
    <div className="dark">
      <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
        <div className="flex items-center space-x-8">
          <div className="w-32">
            {/* Logo placeholder */}
          </div>
          <div className="flex space-x-6">
            {['Trade', 'Explore', 'Pool'].map((item) => (
              <button
                key={item}
                className={`text-sm font-medium ${
                  activeItem === item ? 'text-pink-500' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tokens and NFT collections"
              className="pl-10 pr-4 py-2 w-80 bg-gray-800 text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5 text-gray-300" />
                <span className="sr-only">Select language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 text-white">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 py-2">
            Connect
          </Button>
        </div>
      </nav>
    </div>
  )
}