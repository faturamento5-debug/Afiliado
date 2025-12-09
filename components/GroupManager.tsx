
import React, { useState } from 'react';
import { Users, Plus, Trash2, ExternalLink, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GroupConfig } from '../types';

export const GroupManager: React.FC = () => {
  const [groups, setGroups] = useState<GroupConfig[]>([
    { id: '1', name: 'Ofertas VIP #01', link: 'https://chat.whatsapp.com/ExAmPlE1', clicks: 2400, maxClicks: 1000, members: 1024, isActive: false },
    { id: '2', name: 'Ofertas VIP #02', link: 'https://chat.whatsapp.com/ExAmPlE2', clicks: 890, maxClicks: 1000, members: 780, isActive: true },
    { id: '3', name: 'Ofertas VIP #03', link: 'https://chat.whatsapp.com/ExAmPlE3', clicks: 0, maxClicks: 1000, members: 5, isActive: false },
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
      members: 1,
      isActive: groups.every(g => !g.isActive)
    };
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewGroupLink('');
  };

  const removeGroup = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
  };

  const activeGroup = groups.find(g => g.isActive) || groups[groups.length - 1];
  
  // Logic: 800 members trigger a warning/new group creation
  const isNearLimit = activeGroup ? activeGroup.members >= 800 : false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Active Link Status */}
      <div className="lg:col-span-1 space-y-6">
        <div className={`p-6 rounded-xl text-white shadow-lg relative overflow-hidden transition-all ${isNearLimit ? 'bg-gradient-to-br from-orange-600 to-red-800' : 'bg-gradient-to-br from-green-600 to-emerald-800'}`}>
          
          {isNearLimit && (
            <div className="absolute top-0 right-0 p-4 opacity-20">
                <AlertTriangle size={100} />
            </div>
          )}

          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-white/20 rounded-full">
              <RefreshCw size={24} className="animate-spin-slow" />
            </div>
            <div>
                <h3 className="font-bold text-lg">Rotator Inteligente</h3>
                <p className="text-xs opacity-90">{isNearLimit ? 'LIMITE PRÓXIMO!' : 'Operação Normal'}</p>
            </div>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div>
                <p className="opacity-80 text-sm">Grupo Atual:</p>
                <p className="font-bold text-2xl truncate">{activeGroup?.name || "Nenhum Ativo"}</p>
            </div>

            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span>Membros: {activeGroup?.members || 0}</span>
                    <span className="opacity-70">Meta: 800 (Troca Automática)</span>
                </div>
                <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden border border-white/10">
                <div 
                    className={`h-full transition-all duration-500 ${isNearLimit ? 'bg-yellow-300 animate-pulse' : 'bg-white'}`}
                    style={{ width: activeGroup ? `${(activeGroup.members / 800) * 100}%` : '0%' }}
                ></div>
                </div>
                {isNearLimit && (
                    <p className="text-xs bg-black/30 inline-block px-2 py-1 rounded mt-2 font-bold text-yellow-200">
                        ⚠️ Criando novo grupo em breve...
                    </p>
                )}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
           <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><ShieldCheck size={18} className="text-purple-400" /> Lógica de Proteção</h3>
           <ul className="text-slate-400 text-sm space-y-3 leading-relaxed">
             <li className="flex gap-2">
                <span className="text-green-500 font-bold">1.</span>
                Monitoramos a contagem de membros em tempo real via API.
             </li>
             <li className="flex gap-2">
                <span className="text-yellow-500 font-bold">2.</span>
                Ao atingir <strong>800 membros</strong>, o sistema cria automaticamente o próximo grupo para garantir vagas para "convidados de convidados".
             </li>
             <li className="flex gap-2">
                <span className="text-blue-500 font-bold">3.</span>
                O link de convite do site é atualizado instantaneamente, sem perder tráfego.
             </li>
           </ul>
        </div>
      </div>

      {/* Management List */}
      <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users size={24} className="text-purple-400"/> Gerenciar Grupos
          </h2>
          <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Total Leads: {groups.reduce((acc, g) => acc + g.members, 0)}
          </span>
        </div>

        {/* Add New */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
          <input 
            placeholder="Nome (ex: Ofertas VIP #04)" 
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
            <Plus size={18} /> Adicionar Manual
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {groups.map((group) => (
            <div key={group.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all ${group.isActive ? 'border-green-500/50 bg-green-900/10' : 'border-slate-700 bg-slate-900 hover:border-slate-600'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${group.isActive ? 'bg-green-500 shadow-green-500/50' : 'bg-slate-600'}`}></div>
                <div>
                  <div className="flex items-center gap-2">
                     <p className="text-white font-medium">{group.name}</p>
                     {group.members >= 800 && <span className="text-[10px] bg-red-500 text-white px-1 rounded font-bold">CHEIO</span>}
                  </div>
                  <a href={group.link} target="_blank" rel="noreferrer" className="text-slate-400 text-sm hover:text-blue-400 flex items-center gap-1">
                    {group.link} <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className={`text-sm font-bold ${group.members >= 800 ? 'text-red-400' : 'text-slate-300'}`}>
                      {group.members} <span className="text-slate-500 font-normal">/ 1024</span>
                  </p>
                  <p className="text-slate-500 text-xs">membros</p>
                </div>
                <button 
                  onClick={() => removeGroup(group.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
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
