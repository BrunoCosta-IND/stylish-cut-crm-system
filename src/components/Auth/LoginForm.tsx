
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    
    if (!success) {
      toast({
        title: "Erro no login",
        description: "Email ou senha inválidos",
        variant: "destructive",
      });
    }
  };

  const demoAccounts = [
    { email: 'superadmin@barberpro.com', role: 'Super Admin' },
    { email: 'admin@barbeariax.com', role: 'Admin da Barbearia' },
    { email: 'jose.barbeiro@barbeariax.com', role: 'Funcionário' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-black font-bold text-2xl">BP</span>
          </div>
          <h1 className="text-3xl font-bold text-white">BarberPro</h1>
          <p className="text-gray-400">Sistema de Gestão para Barbearias</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Fazer Login</CardTitle>
            <CardDescription className="text-gray-300">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="pt-6">
            <h3 className="text-white font-semibold mb-3">Contas de Demonstração:</h3>
            <div className="space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('123456');
                  }}
                  className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-white text-sm font-medium">{account.email}</div>
                  <div className="text-gray-400 text-xs">{account.role} • Senha: 123456</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
