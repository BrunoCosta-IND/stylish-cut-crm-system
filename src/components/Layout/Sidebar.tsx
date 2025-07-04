
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  calendar, 
  users, 
  settings, 
  user, 
  file-text,
  log-out 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = {
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: 'calendar' },
    { title: 'Agendamentos', url: '/appointments', icon: 'calendar' },
    { title: 'Clientes', url: '/clients', icon: 'users' },
    { title: 'Funcionários', url: '/employees', icon: 'user' },
    { title: 'Relatórios', url: '/reports', icon: 'file-text' },
    { title: 'Configurações', url: '/settings', icon: 'settings' },
  ],
  employee: [
    { title: 'Meus Agendamentos', url: '/my-appointments', icon: 'calendar' },
    { title: 'Clientes', url: '/clients', icon: 'users' },
  ],
  superadmin: [
    { title: 'Dashboard', url: '/dashboard', icon: 'calendar' },
    { title: 'Barbearias', url: '/barbershops', icon: 'settings' },
    { title: 'Relatórios Gerais', url: '/global-reports', icon: 'file-text' },
  ]
};

const iconMap = {
  calendar,
  users,
  settings,
  user,
  'file-text': file-text,
};

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const currentItems = menuItems[user.role] || [];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card border-r transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">BP</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg">BarberPro</h1>
                <p className="text-xs text-muted-foreground">CRM System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {currentItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isActive = location.pathname === item.url;
              
              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-primary text-primary-foreground shadow-md"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span className="font-medium">{item.title}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
          >
            <log-out className="w-4 h-4" />
            {!collapsed && "Sair"}
          </Button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-md"
        >
          <span className="text-xs">
            {collapsed ? '→' : '←'}
          </span>
        </button>
      </div>
    </div>
  );
}
