import React, { useState } from 'react';
import { Users, Plus, Trash2, ExternalLink, RefreshCw } from 'lucide-react';
import { GroupConfig } from '../types';

export const GroupManager: React.FC = () => {
  const [groups, setGroups] = useState<GroupConfig[]>([
    { id: '1', name: 'Ofertas VIP #01', link: 'https://chat.whatsapp.com/ExAmPlE1', clicks: 980, maxClicks: 1000, isActive: false },
    { id: '2', name: 'Ofertas VIP #02', link: 'https://chat.whatsapp.com/ExAmPlE2', clicks: 45, maxClicks: 1000, isActive: true },
    { id: '3', name: 'Ofertas VIP #03', link: 'https://chat.whatsapp.com/ExAmPlE3', clicks: 0, maxClicks: 1000, isActive: false },
  ]);

  const [newGroupLink, setNewGroupLink] = useState('');
  const [newGroupName, setNewGroupName] = useState('');

  const addGroup = () => {
    if (!newGroupLink || !newGroupName) return;
    const newGroup: GroupConfig = {
      id: Date.now().toString(),
      name: newGroupName,
      link: newGroupLink,
      clicks: 0,
      maxClicks: 1000,
      isActive: groups.every(g => !g.isActive) // Make active if it's the only valid one? Simple logic here.
    };
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewGroupLink('');
  };

  const removeGroup = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
  };

  const activeGroup = groups.find(g => g.isActive) || groups.find(g => g.clicks < g.maxClicks);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Active Link Status */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-full">
              <RefreshCw size={24} className="animate-spin-slow" />
            </div>
            <h3 className="font-bold text-lg">Rotator Ativo</h3>
          </div>
          <div className="space-y-2">
            <p className="opacity-80 text-sm">Grupo Atual:</p>
            <p className="font-bold text-2xl">{activeGroup?.name || "Nenhum Ativo"}</p>
            <div className="w-full bg-black/20 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500" 
                style={{ width: activeGroup ? `${(activeGroup.clicks / activeGroup.maxClicks) * 100}%` : '0%' }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 opacity-80">
              {activeGroup ? `${activeGroup.clicks} / ${activeGroup.maxClicks} leads` : '0/0'}
            </p>
          </div>
          <div className="mt-6 p-3 bg-black/20 rounded-lg text-sm break-all font-mono">
             {activeGroup?.link}
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
           <h3 className="text-white font-semibold mb-2">Como funciona?</h3>
           <p className="text-slate-400 text-sm leading-relaxed">
             O sistema monitora os cliques. Quando o <strong>Grupo #01</strong> atingir 1000 cliques (limite teórico do WhatsApp), ele automaticamente redireciona os novos leads para o <strong>Grupo #02</strong>, garantindo que você nunca perca uma venda.
           </p>
        </div>
      </div>

      {/* Management List */}
      <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users size={24} className="text-purple-400"/> Gerenciar Grupos
          </h2>
        </div>

        {/* Add New */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
          <input 
            placeholder="Nome (ex: Grupo VIP 04)" 
            className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <input 
            placeholder="Link do WhatsApp" 
            className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
            value={newGroupLink}
            onChange={(e) => setNewGroupLink(e.target.value)}
          />
          <button 
            onClick={addGroup}
            className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Adicionar
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {groups.map((group) => (
            <div key={group.id} className={`flex items-center justify-between p-4 rounded-lg border ${group.isActive ? 'border-green-500/50 bg-green-500/10' : 'border-slate-700 bg-slate-900'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${group.isActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-600'}`}></div>
                <div>
                  <p className="text-white font-medium">{group.name}</p>
                  <a href={group.link} target="_blank" rel="noreferrer" className="text-slate-400 text-sm hover:text-blue-400 flex items-center gap-1">
                    {group.link} <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-slate-300 text-sm font-medium">{group.clicks} / {group.maxClicks}</p>
                  <p className="text-slate-500 text-xs">cliques</p>
                </div>
                <button 
                  onClick={() => removeGroup(group.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};