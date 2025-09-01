
'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Music, Users, Settings, X, Tv, Waypoints } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/artists', icon: Music, label: 'Artists' },
    { href: '/users', icon: Users, label: 'Users' },
    { href: '/videos', icon: Tv, label: 'Videos' },
    { href: '/tunnel', icon: Waypoints, label: 'Tunnels' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-secondary text-secondary-foreground transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold">Connectonic</h2>
          <button onClick={onClose} className="md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center p-3 rounded-lg transition-colors hover:bg-primary/20',
                    pathname === item.href ? 'bg-primary/10 text-primary font-semibold' : ''
                  )}
                  onClick={onClose}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
