
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const clients = [
    {
      id: 1,
      name: 'João Silva',
      phone: '(11) 99999-9999',
      email: 'joao@email.com',
      birthday: '1985-05-15',
      lastVisit: '2024-07-01',
      totalVisits: 15,
      totalSpent: 675.00,
      preferredBarber: 'José Santos',
      notes: 'Cliente fiel, prefere corte baixo'
    },
    {
      id: 2,
      name: 'Pedro Santos',
      phone: '(11) 88888-8888',
      email: 'pedro@email.com',
      birthday: '1990-03-22',
      lastVisit: '2024-06-28',
      totalVisits: 8,
      totalSpent: 320.00,
      preferredBarber: 'Carlos Silva',
      notes: 'Alérgico a alguns produtos'
    },
    {
      id: 3,
      name: 'Lucas Oliveira',
      phone: '(11) 77777-7777',
      email: 'lucas@email.com',
      birthday: '1992-11-08',
      lastVisit: '2024-07-03',
      totalVisits: 22,
      totalSpent: 880.00,
      preferredBarber: 'José Santos',
      notes: 'Cliente VIP, sempre agenda com antecedência'
    },
    {
      id: 4,
      name: 'Rafael Costa',
      phone: '(11) 66666-6666',
      email: 'rafael@email.com',
      birthday: '1988-07-12',
      lastVisit: '2024-06-25',
      totalVisits: 5,
      totalSpent: 225.00,
      preferredBarber: 'Carlos Silva',
      notes: 'Cliente novo, ainda experimentando serviços'
    },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientTier = (totalSpent: number) => {
    if (totalSpent >= 800) return { label: 'VIP', color: 'bg-gold-100 text-gold-800' };
    if (totalSpent >= 400) return { label: 'Premium', color: 'bg-purple-100 text-purple-800' };
    return { label: 'Regular', color: 'bg-blue-100 text-blue-800' };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const daysSinceLastVisit = (lastVisit: string) => {
    const today = new Date();
    const visitDate = new Date(lastVisit);
    const diffTime = Math.abs(today.getTime() - visitDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie sua base de clientes
          </p>
        </div>
        <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black">
          + Novo Cliente
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Buscar por nome, telefone ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{clients.length}</div>
            <div className="text-sm text-muted-foreground">Total de Clientes</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {clients.filter(c => getClientTier(c.totalSpent).label === 'VIP').length}
            </div>
            <div className="text-sm text-muted-foreground">Clientes VIP</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {clients.filter(c => daysSinceLastVisit(c.lastVisit) <= 30).length}
            </div>
            <div className="text-sm text-muted-foreground">Ativos (30 dias)</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {formatCurrency(clients.reduce((sum, c) => sum + c.totalSpent, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Receita Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => {
          const tier = getClientTier(client.totalSpent);
          const daysSince = daysSinceLastVisit(client.lastVisit);
          
          return (
            <Card key={client.id} className="card-shadow hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-black font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-lg flex items-center gap-2">
                          {client.name}
                          <Badge className={tier.color}>{tier.label}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{client.phone}</div>
                        <div className="text-sm text-muted-foreground">{client.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">Última visita:</span>
                        <div className="text-muted-foreground">
                          {formatDate(client.lastVisit)} ({daysSince} dias)
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Barbeiro preferido:</span>
                        <div className="text-muted-foreground">{client.preferredBarber}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">Total de visitas:</span>
                        <div className="text-lg font-semibold">{client.totalVisits}</div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Total gasto:</span>
                        <div className="text-lg font-semibold text-green-600">
                          {formatCurrency(client.totalSpent)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        Ver Histórico
                      </Button>
                      <Button size="sm" variant="outline">
                        Agendar
                      </Button>
                    </div>
                  </div>
                </div>
                
                {client.notes && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm">
                      <span className="font-medium">Observações:</span> {client.notes}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-semibold mb-2">Nenhum cliente encontrado</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? 'Tente ajustar os termos de busca'
                : 'Cadastre seu primeiro cliente para começar'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
