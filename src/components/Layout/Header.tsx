
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 ml-64">
      <div>
        <h1 className="text-xl font-semibold">
          Bem-vindo, {user?.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-9 h-9"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </Button>
      </div>
    </header>
  );
}
