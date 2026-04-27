'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  Warehouse, 
  BarChart3, 
  Users, 
  Lock,
  User,
  Settings,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', locked: false },
  { name: 'Menu', icon: UtensilsCrossed, href: '/menu', locked: true },
  { name: 'Orders', icon: ShoppingBag, href: '/orders', locked: true },
  { name: 'Inventory', icon: Warehouse, href: '/inventory', locked: true },
  { name: 'Analytics', icon: BarChart3, href: '/analytics', locked: true },
  { name: 'Staff', icon: Users, href: '/staff', locked: true },
];

const bottomItems = [
  { name: 'Profile', icon: User, href: '/profile' },
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Help', icon: HelpCircle, href: '/help' },
];

export const OwnerSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-surface-low border-r border-border flex flex-col sticky top-0">
      <div className="p-8">
        <h1 className="font-display text-primary text-xl font-bold tracking-tight leading-none">
          CULINARY LEDGER
        </h1>
        <p className="text-secondary text-xs mt-1 font-sans">Restaurant Portal</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.name} className="relative group">
              <Link
                href={item.locked ? '#' : item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200",
                  isActive 
                    ? "bg-surface-lowest text-foreground shadow-ambient" 
                    : "text-secondary hover:bg-surface-container hover:text-foreground",
                  item.locked && "cursor-not-allowed opacity-60"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActive ? "text-primary" : ""} />
                  <span className="font-sans font-medium text-sm">{item.name}</span>
                </div>
                {item.locked && <Lock size={14} className="text-secondary/50" />}
              </Link>
            </div>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button className="w-full py-3 px-4 rounded-md bg-primary-gradient text-on-primary font-sans font-semibold text-sm flex items-center justify-center gap-2 shadow-ambient hover:opacity-90 transition-opacity">
          <ShieldCheck size={18} />
          Verify Account
        </button>
      </div>

      <div className="p-4 border-t border-border space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 text-secondary hover:text-foreground transition-colors"
          >
            <item.icon size={18} />
            <span className="font-sans text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};
