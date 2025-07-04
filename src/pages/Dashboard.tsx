
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();

  // Mock data - would come from API
  const stats = {
    todayAppointments: 12,
    todayRevenue: 850,
    monthlyRevenue: 15200,
    totalClients: 245,
    completedToday: 8,
    pendingToday: 4,
  };

  const recentAppointments = [
    { id: 1, client: 'João Silva', service: 'Corte + Barba', time: '09:00', barber: 'José', status: 'completed' },
    { id: 2, client: 'Pedro Santos', service: 'Corte', time: '10:30', barber: 'Carlos', status: 'pending' },
    { id: 3, client: 'Lucas Oliveira', service: 'Barba', time: '11:00', barber: 'José', status: 'pending' },
    { id: 4, client: 'Rafael Costa', service: 'Corte + Barba', time: '14:00', barber: 'Carlos', status: 'scheduled' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'pending': return 'Em andamento';
      case 'scheduled': return 'Agendado';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da sua barbearia
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Agendamentos Hoje"
          value={stats.todayAppointments}
          description={`${stats.completedToday} concluídos, ${stats.pendingToday} pendentes`}
          icon="📅"
          trend={{ value: 15, isPositive: true }}
        />
        
        <StatsCard
          title="Faturamento Hoje"
          value={`R$ ${stats.todayRevenue.toLocaleString()}`}
          description="Meta: R$ 1.000"
          icon="💰"
          trend={{ value: 8, isPositive: true }}
        />
        
        <StatsCard
          title="Faturamento Mensal"
          value={`R$ ${stats.monthlyRevenue.toLocaleString()}`}
          description="Meta: R$ 20.000"
          icon="📊"
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatsCard
          title="Total de Clientes"
          value={stats.totalClients}
          description="Clientes cadastrados"
          icon="👥"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Recent Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📅 Agendamentos de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <div>
                    <div className="font-medium">{appointment.client}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.service} • {appointment.time}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Barbeiro: {appointment.barber}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📈 Resumo Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Agendamentos</span>
                <span className="font-semibold">87</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Faturamento</span>
                <span className="font-semibold">R$ 4.350</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Novos Clientes</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Taxa de Conclusão</span>
                <span className="font-semibold text-green-600">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚡ Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-center">
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium">Novo Agendamento</div>
            </button>
            <button className="p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-center">
              <div className="text-2xl mb-2">👤</div>
              <div className="font-medium">Novo Cliente</div>
            </button>
            <button className="p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">Relatórios</div>
            </button>
            <button className="p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-medium">Configurações</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
