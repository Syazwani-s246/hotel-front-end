
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  DoorOpen, 
  Users, 
  UserCog, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
    },
    {
      title: 'Bookings',
      icon: BookOpen,
      href: '/bookings',
    },
    {
      title: 'Rooms',
      icon: DoorOpen,
      href: '/rooms',
    },
    {
      title: 'Guests',
      icon: Users,
      href: '/guests',
    },
    {
      title: 'Staff',
      icon: UserCog,
      href: '/staff',
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <h1 
          className={cn(
            "font-semibold text-xl transition-opacity duration-200", 
            collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}
        >
          Hotel
        </h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  'flex items-center group px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className={cn('flex-shrink-0 h-5 w-5', collapsed ? 'mx-auto' : 'mr-3')} />
                <span className={cn('transition-opacity duration-200', 
                  collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                )}>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className={cn(
            "flex items-center w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed ? "justify-center px-2" : "justify-start"
          )}
          asChild
        >
          <Link to="/">
            <LogOut className={cn('h-5 w-5', collapsed ? '' : 'mr-3')} />
            <span className={cn('transition-opacity duration-200', 
              collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            )}>
              Logout
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
