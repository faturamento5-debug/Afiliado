import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wand2, 
  Users, 
  Settings, 
  Menu, 
  X, 
  Briefcase,
  Bell,
  Shield,
  LogOut,
  User,
  CreditCard,
  Link2
} from 'lucide-react';
import { DashboardStats } from './components/DashboardStats';
import { MagicGenerator } from './components/MagicGenerator';
import { GroupManager } from './components/GroupManager';
import { ResellerView } from './components/ResellerView';
import { Integrations } from './components/Integrations';
import { AffiliateSettings, BrandingConfig, IntegrationState } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Header Dropdown States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Global Branding State (White-Label)
  const [branding, setBranding] = useState<BrandingConfig>({
    appName: 'AffiliBot AI',
    primaryColor: '#9333ea', // Default Purple
    domain: 'app.affilibot.com'
  });

  const [affiliateSettings, setAffiliateSettings] = useState<AffiliateSettings>({
    amazonTag: 'seuid-20',
    shopeeId: '123456',
    mlId: 'MLB123'
  });

  // Integration State
  const [integrationState, setIntegrationState] = useState<IntegrationState>({
    whatsapp: 'disconnected',
    telegram: 'disconnected',
    telegramBotToken: '',
    telegramChatId: ''
  });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generator', label: 'Gerador & Robô', icon: Wand2 },
    { id: 'integrations', label: 'Conexões', icon: Link2 },
    { id: 'groups', label: 'Grupos WhatsApp', icon: Users },
    { id: 'reseller', label: 'Área do Revendedor', icon: Briefcase },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'generator':
        return <MagicGenerator affiliateSettings={affiliateSettings} integrationState={integrationState} />;
      case 'integrations':
        return <Integrations state={integrationState} setState={setIntegrationState} />;
      case 'groups':
        return <GroupManager />;
      case 'reseller':
        return <ResellerView branding={branding} setBranding={setBranding} />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: branding.primaryColor }}
          >
            {branding.appName.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-bold text-lg text-white">{branding.appName}</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg"
                style={{ backgroundColor: branding.primaryColor, boxShadow: `0 10px 15px -3px ${branding.primaryColor}33` }}
              >
                AI
              </div>
              <div>
                <h1 className="font-bold text-xl text-white tracking-tight">{branding.appName}</h1>
                <p className="text-xs text-slate-500 font-medium">Automação v1.0</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                  style={activeTab === item.id ? { color: branding.primaryColor, borderColor: `${branding.primaryColor}66`, backgroundColor: `${branding.primaryColor}1A` } : {}}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-slate-800">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Configurações Rápidas</h4>
              <div className="space-y-4 px-2">
                 <div>
                   <label className="text-xs text-slate-400 block mb-1">Tag Amazon</label>
                   <input 
                      value={affiliateSettings.amazonTag}
                      onChange={(e) => setAffiliateSettings({...affiliateSettings, amazonTag: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white focus:border-purple-500 outline-none"
                   />
                 </div>
                 <div>
                   <label className="text-xs text-slate-400 block mb-1">ID Shopee</label>
                   <input 
                      value={affiliateSettings.shopeeId}
                      onChange={(e) => setAffiliateSettings({...affiliateSettings, shopeeId: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white focus:border-purple-500 outline-none"
                   />
                 </div>
                 <div>
                   <label className="text-xs text-slate-400 block mb-1">ID Mercado Livre</label>
                   <input 
                      value={affiliateSettings.mlId}
                      onChange={(e) => setAffiliateSettings({...affiliateSettings, mlId: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white focus:border-purple-500 outline-none"
                   />
                 </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 relative">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex items-center justify-between hidden lg:flex">
             <h2 className="text-xl font-semibold text-white">
               {navItems.find(n => n.id === activeTab)?.label}
             </h2>
             
             {/* Header Right Actions */}
             <div className="flex items-center gap-4 relative">
                
                {/* Settings Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => {
                      setIsSettingsOpen(!isSettingsOpen);
                      setIsProfileOpen(false);
                    }}
                    className={`p-2 transition-colors rounded-lg ${isSettingsOpen ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <Settings size={20} />
                  </button>

                  {isSettingsOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                       <div className="px-4 py-2 border-b border-slate-700 mb-1">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configurações Gerais</p>
                       </div>
                       <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3 transition-colors">
                          <Bell size={16} /> Preferências de Notificação
                       </button>
                       <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3 transition-colors">
                          <Shield size={16} /> Segurança e Senha
                       </button>
                       <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3 transition-colors">
                          <CreditCard size={16} /> Assinatura do Software
                       </button>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsSettingsOpen(false);
                    }}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div 
                      className="h-9 w-9 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold shadow-sm" 
                      style={{ backgroundColor: `${branding.primaryColor}20`, color: branding.primaryColor, borderColor: `${branding.primaryColor}40` }}
                    >
                      ADM
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                       <div className="px-4 py-3 border-b border-slate-700 mb-1">
                          <p className="text-sm font-bold text-white">Administrador</p>
                          <p className="text-xs text-slate-400">admin@affilibot.com</p>
                       </div>
                       <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3 transition-colors">
                          <User size={16} /> Meu Perfil
                       </button>
                       <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3 transition-colors">
                          <Briefcase size={16} /> Conta Empresarial
                       </button>
                       <div className="h-px bg-slate-700 my-1 mx-4"></div>
                       <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 flex items-center gap-3 transition-colors">
                          <LogOut size={16} /> Sair do Sistema
                       </button>
                    </div>
                  )}
                </div>
             </div>
          </header>

          <div className="p-4 lg:p-8 max-w-7xl mx-auto" onClick={() => {
            if(isSettingsOpen) setIsSettingsOpen(false);
            if(isProfileOpen) setIsProfileOpen(false);
          }}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;