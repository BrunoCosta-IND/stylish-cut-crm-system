
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const appointments = [
    {
      id: 1,
      client: 'João Silva',
      phone: '(11) 99999-9999',
      service: 'Corte + Barba',
      barber: 'José Santos',
      date: '2024-07-04',
      time: '09:00',
      status: 'completed',
      value: 45.00,
      payment: 'pix'
    },
    {
      id: 2,
      client: 'Pedro Santos',
      phone: '(11) 88888-8888',
      service: 'Corte',
      barber: 'Carlos Silva',
      date: '2024-07-04',
      time: '10:30',
      status: 'pending',
      value: 25.00,
      payment: 'dinheiro'
    },
    {
      id: 3,
      client: 'Lucas Oliveira',
      phone: '(11) 77777-7777',
      service: 'Barba',
      barber: 'José Santos',
      date: '2024-07-04',
      time: '11:00',
      status: 'scheduled',
      value: 20.00,
      payment: 'cartao'
    },
    {
      id: 4,
      client: 'Rafael Costa',
      phone: '(11) 66666-6666',
      service: 'Corte + Barba + Sobrancelha',
      barber: 'Carlos Silva',
      date: '2024-07-04',
      time: '14:00',
      status: 'scheduled',
      value: 55.00,
      payment: 'pix'
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      completed: 'Concluído',
      pending: 'Em andamento',
      scheduled: 'Agendado',
      cancelled: 'Cancelado'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getPaymentIcon = (payment: string) => {
    const icons = {
      pix: '💳',
      dinheiro: '💵',
      cartao: '💳'
    };
    return icons[payment as keyof typeof icons] || '💳';
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agendamentos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os agendamentos da barbearia
          </p>
        </div>
        <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black">
          + Novo Agendamento
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por cliente ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'Todos' },
                { key: 'scheduled', label: 'Agendados' },
                { key: 'pending', label: 'Em andamento' },
                { key: 'completed', label: 'Concluídos' }
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={filterStatus === filter.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(filter.key)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="card-shadow hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-3">
                  <div className="font-semibold text-lg">{appointment.client}</div>
                  <div className="text-sm text-muted-foreground">{appointment.phone}</div>
                </div>
                
                <div className="md:col-span-3">
                  <div className="font-medium">{appointment.service}</div>
                  <div className="text-sm text-muted-foreground">
                    Barbeiro: {appointment.barber}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="font-medium">{appointment.time}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(appointment.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="font-semibold text-lg text-green-600">
                    R$ {appointment.value.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    {getPaymentIcon(appointment.payment)}
                    {appointment.payment.charAt(0).toUpperCase() + appointment.payment.slice(1)}
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  {getStatusBadge(appointment.status)}
                </div>
                
                <div className="md:col-span-1">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">✏️</Button>
                    <Button size="sm" variant="ghost">❌</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterStatus !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Crie seu primeiro agendamento para começar'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
