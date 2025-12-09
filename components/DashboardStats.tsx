import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users, MousePointerClick } from 'lucide-react';

const data = [
  { name: 'Seg', clicks: 400, sales: 240 },
  { name: 'Ter', clicks: 300, sales: 139 },
  { name: 'Qua', clicks: 200, sales: 980 },
  { name: 'Qui', clicks: 278, sales: 390 },
  { name: 'Sex', clicks: 189, sales: 480 },
  { name: 'Sab', clicks: 239, sales: 380 },
  { name: 'Dom', clicks: 349, sales: 430 },
];

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        <p className={`text-xs mt-2 ${color === 'green' ? 'text-green-400' : 'text-blue-400'}`}>
          {sub}
        </p>
      </div>
      <div className={`p-3 rounded-lg bg-opacity-10 ${color === 'green' ? 'bg-green-500 text-green-500' : 'bg-blue-500 text-blue-500'}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

export const DashboardStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Receita Total" value="R$ 12.450,00" sub="+12% essa semana" icon={DollarSign} color="green" />
        <StatCard title="Cliques no Link" value="45.2k" sub="+5% essa semana" icon={MousePointerClick} color="blue" />
        <StatCard title="Leads Grupos" value="3.200" sub="+120 novos hoje" icon={Users} color="green" />
        <StatCard title="Taxa de Conversão" value="2.4%" sub="+0.4% essa semana" icon={TrendingUp} color="blue" />
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-6">Performance de Cliques</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
              />
              <Area type="monotone" dataKey="clicks" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorClicks)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};