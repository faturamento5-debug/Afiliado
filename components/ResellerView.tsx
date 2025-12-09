import React, { useState } from 'react';
import { 
  ShieldCheck, Zap, DollarSign, LayoutTemplate, 
  Palette, Globe, Image as ImageIcon, Check, 
  Plus, Trash2, Code, Copy, Terminal 
} from 'lucide-react';
import { BrandingConfig, Plan } from '../types';

interface ResellerViewProps {
  branding: BrandingConfig;
  setBranding: (config: BrandingConfig) => void;
}

export const ResellerView: React.FC<ResellerViewProps> = ({ branding, setBranding }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'customization' | 'plans' | 'api'>('overview');
  
  // -- PLANS STATE --
  const [plans, setPlans] = useState<Plan[]>([
    { 
      id: '1', name: 'Starter', price: '49,90', period: 'mês', active: true,
      features: ['50 Links/mês', '1 Grupo WhatsApp', 'Suporte Básico'] 
    },
    { 
      id: '2', name: 'Pro', price: '97,00', period: 'mês', active: true,
      features: ['Links Ilimitados', '10 Grupos WhatsApp', 'API Access', 'White-label'] 
    },
    { 
      id: '3', name: 'Vitalício', price: '497,00', period: 'único', active: true,
      features: ['Acesso para sempre', 'Atualizações futuras', 'Comunidade VIP'] 
    },
  ]);

  const [isCopied, setIsCopied] = useState(false);
  const apiKey = "sk_live_affilibot_89237498237498234";

  const handleCopyApi = () => {
    navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const togglePlan = (id: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const deletePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Top Navigation for Reseller Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-bold text-white">Área do Revendedor</h2>
           <p className="text-slate-400">Gerencie sua marca, planos e integrações.</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
          {[
            { id: 'overview', label: 'Visão Geral', icon: ShieldCheck },
            { id: 'customization', label: 'Personalização', icon: Palette },
            { id: 'plans', label: 'Planos', icon: DollarSign },
            { id: 'api', label: 'API & Dev', icon: Code },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-slate-700 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon size={16} />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 rounded-2xl border border-purple-500/30 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">Seu SaaS está Ativo!</h2>
              <p className="text-purple-200 max-w-2xl mb-6">
                Você tem 142 clientes ativos gerando receita recorrente. Use as abas acima para configurar sua marca e preços.
              </p>
              <div className="flex gap-4">
                 <div className="bg-black/30 px-4 py-2 rounded-lg">
                    <p className="text-xs text-purple-200 uppercase">Receita Mensal</p>
                    <p className="text-xl font-bold text-white">R$ 14.250,00</p>
                 </div>
                 <div className="bg-black/30 px-4 py-2 rounded-lg">
                    <p className="text-xs text-purple-200 uppercase">Clientes Ativos</p>
                    <p className="text-xl font-bold text-white">142</p>
                 </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500 blur-[100px] opacity-20 pointer-events-none"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer" onClick={() => setActiveTab('customization')}>
                <Palette className="text-purple-400 mb-4" size={32} />
                <h3 className="text-white font-bold mb-2">White-Label</h3>
                <p className="text-slate-400 text-sm">Configure o logo, cores e domínio do aplicativo.</p>
             </div>
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer" onClick={() => setActiveTab('plans')}>
                <DollarSign className="text-green-400 mb-4" size={32} />
                <h3 className="text-white font-bold mb-2">Gerenciar Preços</h3>
                <p className="text-slate-400 text-sm">Crie planos mensais, anuais ou vitalícios.</p>
             </div>
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer" onClick={() => setActiveTab('api')}>
                <Code className="text-blue-400 mb-4" size={32} />
                <h3 className="text-white font-bold mb-2">Desenvolvedor</h3>
                <p className="text-slate-400 text-sm">Acesse a API para integrações com Hotmart/Kiwify.</p>
             </div>
          </div>
        </div>
      )}

      {/* CONTENT: CUSTOMIZATION */}
      {activeTab === 'customization' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <LayoutTemplate size={24} className="text-purple-400"/> Identidade Visual
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nome do Aplicativo</label>
              <input 
                value={branding.appName}
                onChange={(e) => setBranding({...branding, appName: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">Isso altera o nome no topo e na aba do navegador.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Cor Primária (Marca)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                  className="h-12 w-24 bg-transparent cursor-pointer rounded border-none"
                />
                <div className="flex-1">
                   <div className="text-white font-mono bg-slate-900 px-3 py-2 rounded border border-slate-700">
                     {branding.primaryColor}
                   </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Experimente mudar! O app inteiro atualizará instantaneamente.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Domínio Personalizado (CNAME)</label>
              <div className="flex items-center gap-2">
                 <Globe size={18} className="text-slate-500" />
                 <input 
                    value={branding.domain}
                    onChange={(e) => setBranding({...branding, domain: e.target.value})}
                    placeholder="app.seusite.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                 />
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-slate-400 mb-2">Logo (URL ou Upload)</label>
               <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-slate-500 hover:border-purple-500/50 hover:bg-slate-900/50 transition-all cursor-pointer">
                  <ImageIcon size={32} className="mb-2" />
                  <p className="text-sm">Arraste sua logo ou clique aqui</p>
                  <p className="text-xs opacity-50">PNG transparente recomendado</p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
               <p className="text-slate-400 text-sm mb-6">
                 Veja como o aplicativo ficará para seus clientes com as configurações atuais.
               </p>
               
               {/* Mini Preview Mockup */}
               <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center gap-4 border-b border-slate-800 pb-4 mb-4">
                     <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-xs" style={{backgroundColor: branding.primaryColor, color: 'white'}}>
                        {branding.appName.substring(0,2).toUpperCase()}
                     </div>
                     <div className="text-sm font-bold text-white">{branding.appName}</div>
                  </div>
                  <div className="space-y-3">
                     <div className="h-8 w-3/4 bg-slate-800 rounded animate-pulse"></div>
                     <div className="h-32 w-full bg-slate-900 rounded border border-slate-800 p-4">
                        <div className="h-4 w-1/2 bg-slate-800 rounded mb-2"></div>
                        <div className="h-4 w-1/3 bg-slate-800 rounded"></div>
                        <div className="mt-4 h-8 w-full rounded text-center text-xs flex items-center justify-center text-white font-bold" style={{backgroundColor: branding.primaryColor}}>
                           Botão com sua cor
                        </div>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* CONTENT: PLANS */}
      {activeTab === 'plans' && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Seus Planos de Venda</h3>
            <button className="bg-white text-slate-900 hover:bg-slate-200 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm">
               <Plus size={18} /> Novo Plano
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {plans.map((plan) => (
                <div key={plan.id} className={`relative p-6 rounded-xl border transition-all ${plan.active ? 'bg-slate-900 border-slate-700' : 'bg-slate-900/50 border-slate-800 opacity-60'}`}>
                   {!plan.active && <div className="absolute top-4 right-4 text-xs font-bold bg-slate-800 text-slate-500 px-2 py-1 rounded">INATIVO</div>}
                   
                   <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                   <div className="flex items-baseline gap-1 mt-2 mb-4">
                      <span className="text-2xl font-bold text-white">R$ {plan.price}</span>
                      <span className="text-slate-400 text-sm">/{plan.period}</span>
                   </div>

                   <ul className="space-y-2 mb-6">
                      {plan.features.map((feat, idx) => (
                         <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                            <Check size={14} className="text-green-500" /> {feat}
                         </li>
                      ))}
                   </ul>

                   <div className="flex items-center gap-2 border-t border-slate-800 pt-4">
                      <button 
                        onClick={() => togglePlan(plan.id)}
                        className={`flex-1 py-2 rounded text-sm font-medium ${plan.active ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-green-900/30 text-green-400 border border-green-900 hover:bg-green-900/50'}`}
                      >
                         {plan.active ? 'Desativar' : 'Ativar'}
                      </button>
                      <button 
                        onClick={() => deletePlan(plan.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded"
                      >
                         <Trash2 size={18} />
                      </button>
                   </div>
                </div>
             ))}
             
             {/* Add New Mockup */}
             <button className="border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center p-6 text-slate-500 hover:border-purple-500/50 hover:text-purple-400 hover:bg-slate-900 transition-all min-h-[300px]">
                <Plus size={48} className="mb-2 opacity-50" />
                <span className="font-medium">Criar Novo Plano</span>
             </button>
          </div>
        </div>
      )}

      {/* CONTENT: API */}
      {activeTab === 'api' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-yellow-400" /> Credenciais da API
                 </h3>
                 <div className="space-y-4">
                    <div>
                       <label className="text-sm text-slate-400 mb-1 block">Chave Secreta (Live)</label>
                       <div className="flex gap-2">
                          <code className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 font-mono text-purple-400 text-sm overflow-hidden">
                             {apiKey}
                          </code>
                          <button 
                             onClick={handleCopyApi}
                             className="bg-slate-700 hover:bg-slate-600 text-white px-4 rounded-lg flex items-center justify-center transition-colors"
                          >
                             {isCopied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                          </button>
                       </div>
                       <p className="text-xs text-slate-500 mt-2">
                          Mantenha esta chave segura. Use-a para integrar com webhooks de pagamento (Stripe/Hotmart).
                       </p>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Terminal size={20} className="text-slate-400" /> Documentação Rápida
                 </h3>
                 
                 <div className="space-y-6">
                    <div>
                       <h4 className="text-sm font-semibold text-white mb-2">Criar Novo Usuário (Webhook)</h4>
                       <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800">
                          <span className="text-purple-400">POST</span> https://api.{branding.domain || 'affilibot.com'}/v1/users<br/><br/>
                          <span className="text-slate-500">// Header</span><br/>
                          Authorization: Bearer {apiKey}<br/><br/>
                          <span className="text-slate-500">// Body</span><br/>
                          {`{
  "email": "cliente@email.com",
  "plan_id": "premium_monthly",
  "name": "João da Silva"
}`}
                       </div>
                    </div>
                    
                    <div>
                       <h4 className="text-sm font-semibold text-white mb-2">Gerar Copy (Node.js)</h4>
                       <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800">
                          <span className="text-blue-400">const</span> response = <span className="text-blue-400">await</span> axios.post(<span className="text-green-400">'https://api.affilibot.com/v1/generate'</span>, {'{'}...{'}'});
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-fit">
              <h3 className="text-white font-bold mb-4">Uso da API</h3>
              <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-400">Requisições (Hoje)</span>
                       <span className="text-white font-mono">14,203</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                       <div className="h-full bg-purple-500 w-[65%]"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-400">Erros (5xx)</span>
                       <span className="text-white font-mono">0.01%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                       <div className="h-full bg-green-500 w-[1%]"></div>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-slate-700">
                    <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors">
                       Ver Logs Completos
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
