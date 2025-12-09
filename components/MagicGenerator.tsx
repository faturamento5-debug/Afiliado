
import React, { useState } from 'react';
import { Wand2, Copy, Send, Loader2, ShoppingBag, Smartphone, Radio, Terminal, Search, ArrowDown } from 'lucide-react';
import { generateMarketingCopy } from '../services/geminiService';
import { Platform, GeneratedContent, AffiliateSettings, IntegrationState } from '../types';

interface MagicGeneratorProps {
  affiliateSettings: AffiliateSettings;
  integrationState: IntegrationState;
}

export const MagicGenerator: React.FC<MagicGeneratorProps> = ({ affiliateSettings, integrationState }) => {
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  
  // Input States
  const [url, setUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');
  const [platform, setPlatform] = useState<Platform>(Platform.AMAZON);
  
  const [result, setResult] = useState<GeneratedContent | null>(null);
  
  // Auto-Bot State
  const [isAutoSending, setIsAutoSending] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  // Simulate Scraping Logic
  const handleSimulateScrape = async () => {
    if (!url) return;
    setScraping(true);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500));
    
    // Mock Data based on Platform
    if (url.includes('amazon')) setPlatform(Platform.AMAZON);
    else if (url.includes('shopee')) setPlatform(Platform.SHOPEE);
    else if (url.includes('mercado')) setPlatform(Platform.MERCADO_LIVRE);

    setProductName('Smart TV 50" 4K UHD Crystal');
    setOriginalPrice('3.299,00');
    setPromotionalPrice('2.150,00');
    
    setScraping(false);
  };

  const handleGenerate = async (autoSend: boolean = false) => {
    if (!productName || !promotionalPrice) return;
    setLoading(true);
    if (autoSend) {
      setIsAutoSending(true);
      setLogs(['INICIANDO PROTOCOLO DE DISPARO...', `🔗 Link Base: ${url}`]);
    }

    try {
      if (autoSend) await new Promise(r => setTimeout(r, 800)); 
      if (autoSend) addLog('🔎 Validando disponibilidade do produto...');
      if (autoSend) await new Promise(r => setTimeout(r, 500)); 

      // 1. Generate Content with AI
      if (autoSend) addLog('🧠 AI: Criando copy viral com gatilhos de urgência...');
      const copy = await generateMarketingCopy({
        name: productName,
        originalPrice: originalPrice,
        promotionalPrice: promotionalPrice,
        platform: platform,
        url: url
      });

      if (autoSend) addLog('✅ Copy gerada: "Comparaçao de Preço" incluída.');

      // 2. Append Affiliate Tag based on Platform
      if (autoSend) addLog(`🏷️ Injetando tag de afiliado (${platform})...`);
      
      let finalLink = url;
      const hasQuery = url.includes('?');
      const prefix = hasQuery ? '&' : '?';

      switch (platform) {
        case Platform.AMAZON:
          if (affiliateSettings.amazonTag) finalLink += `${prefix}tag=${affiliateSettings.amazonTag}`;
          break;
        case Platform.SHOPEE:
          if (affiliateSettings.shopeeId) finalLink += `${prefix}aff_id=${affiliateSettings.shopeeId}`;
          break;
        case Platform.MERCADO_LIVRE:
          if (affiliateSettings.mlId) finalLink += `${prefix}id=${affiliateSettings.mlId}`;
          break;
        default:
          break;
      }

      const generatedResult = {
        ...copy,
        finalUrl: finalLink
      };
      setResult(generatedResult);

      if (autoSend) {
        // 3. Check Groups Logic
        await new Promise(r => setTimeout(r, 800));
        addLog('👥 Verificando lotação dos grupos...');
        addLog('ℹ️ Grupo "Ofertas VIP #02" tem 780 membros (Limite 800).');
        addLog('⚠️ Alerta: Próximo da rotação automática.');

        if (integrationState.whatsapp === 'connected') {
             addLog('🚀 Conectado. Disparando para 3 grupos ativos...');
             await new Promise(r => setTimeout(r, 500));
             addLog('📨 Enviado: Ofertas VIP #01');
             addLog('📨 Enviado: Ofertas VIP #02');
             addLog('📨 Enviado: Lista de Espera');
        } else {
            addLog('❌ ERRO: WhatsApp desconectado. Falha no envio.');
        }
        
        await new Promise(r => setTimeout(r, 500));
        addLog('🏁 TAREFA CONCLUÍDA.');
        setLoading(false);
      }

    } catch (error) {
      console.error(error);
      if(autoSend) addLog('❌ ERRO CRÍTICO NA IA.');
    } finally {
      if (!autoSend) setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
            <Wand2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Gerador Viral</h2>
            <p className="text-xs text-slate-400">Cole o link, nós fazemos o resto.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-400 mb-1">Link do Produto (Amazon/Shopee)</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..." 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <button 
                onClick={handleSimulateScrape}
                disabled={!url || scraping}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg flex items-center gap-2 disabled:opacity-50"
                title="Simular Scraping Automático"
              >
                {scraping ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">*Clique na lupa para preencher os dados automaticamente (Simulação).</p>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-400 mb-1">Nome do Produto</label>
             <input 
               type="text" 
               value={productName}
               onChange={(e) => setProductName(e.target.value)}
               placeholder="Ex: iPhone 15 Pro Max" 
               className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
             />
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preço Antigo (De)</label>
              <input 
                type="text" 
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="R$ 0,00" 
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-400 focus:ring-2 focus:ring-purple-500 outline-none line-through decoration-slate-500"
              />
            </div>
            <div className="relative">
              <label className="block text-xs font-bold text-green-500 uppercase mb-1">Preço Promo (Por)</label>
              <input 
                type="text" 
                value={promotionalPrice}
                onChange={(e) => setPromotionalPrice(e.target.value)}
                placeholder="R$ 0,00" 
                className="w-full bg-slate-800 border border-green-500/50 rounded-lg px-3 py-2 text-white font-bold focus:ring-2 focus:ring-green-500 outline-none"
              />
              {originalPrice && promotionalPrice && (
                 <div className="absolute -right-2 -top-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-bounce">
                    OFERTA!
                 </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Plataforma</label>
            <div className="grid grid-cols-3 gap-2">
              {[Platform.AMAZON, Platform.MERCADO_LIVRE, Platform.SHOPEE].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    platform === p 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
                onClick={() => handleGenerate(false)}
                disabled={loading || !productName}
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
                {loading && !isAutoSending ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                Ver Preview
            </button>
            <button
                onClick={() => handleGenerate(true)}
                disabled={loading || !productName}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-green-900/20"
            >
                {loading && isAutoSending ? <Loader2 className="animate-spin" size={18} /> : <Radio size={18} />}
                Disparar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col relative overflow-hidden">
        {isAutoSending && (
            <div className="absolute inset-0 bg-slate-950/95 z-20 p-6 font-mono text-xs md:text-sm text-green-400 flex flex-col">
                <div className="flex items-center gap-2 border-b border-green-900/50 pb-2 mb-4">
                    <Terminal size={16} />
                    <span className="uppercase tracking-widest font-bold">Log do Sistema v2.0</span>
                </div>
                <div className="flex-1 space-y-3 overflow-auto scrollbar-hide">
                    {logs.map((log, i) => (
                        <div key={i} className="animate-in slide-in-from-left-2 fade-in duration-300 border-l-2 border-green-900/30 pl-2">
                            {log}
                        </div>
                    ))}
                    {loading && (
                        <div className="animate-pulse pl-2">_ processando...</div>
                    )}
                </div>
                {!loading && (
                    <button 
                        onClick={() => setIsAutoSending(false)} 
                        className="mt-4 w-full bg-green-900/30 border border-green-500 text-green-400 py-3 rounded font-bold hover:bg-green-900/50 uppercase tracking-wide"
                    >
                        Fechar Terminal
                    </button>
                )}
            </div>
        )}

        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <ShoppingBag size={20} className="text-purple-400"/> Preview WhatsApp
        </h3>
        
        {result ? (
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-[#0b141a] p-4 rounded-lg border border-slate-800 flex-1 relative group bg-opacity-50">
               {/* WhatsApp Bubble Mockup */}
               <div className="bg-[#202c33] p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg text-sm text-[#e9edef] max-w-[95%] shadow-sm">
                  <p className="font-bold text-base mb-1">{result.title}</p>
                  <p className="whitespace-pre-line mb-2 text-[#d1d7db]">{result.description}</p>
                  <p className="text-[#53bdeb] mb-2">{result.hashtags.join(' ')}</p>
                  <div className="bg-[#1d282f] p-2 rounded flex items-center gap-2 border border-[#2a3942] mt-2">
                      <div className="bg-slate-700 w-10 h-10 rounded flex items-center justify-center">
                          <ShoppingBag size={16} />
                      </div>
                      <div className="overflow-hidden">
                          <p className="text-xs text-slate-400 truncate">{result.finalUrl}</p>
                          <p className="text-[10px] text-slate-500">amazon.com.br</p>
                      </div>
                  </div>
               </div>
               <div className="text-[10px] text-slate-500 mt-1 ml-2">12:42 • Enviado via AffiliBot</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => copyToClipboard(`${result.title}\n\n${result.description}\n\n🛒 *COMPRE AQUI:* ${result.finalUrl}\n\n${result.hashtags.join(' ')}`)}
                className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
              >
                <Copy size={18} /> Copiar Texto
              </button>
              <div className="flex gap-1">
                 <div className={`flex-1 flex items-center justify-center rounded-lg border ${integrationState.whatsapp === 'connected' ? 'bg-green-900/20 border-green-500 text-green-500' : 'bg-slate-700 border-slate-600 text-slate-500'}`}>
                    <Smartphone size={18} />
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
            <ArrowDown size={32} className="mb-2 opacity-50 animate-bounce" />
            <p className="text-center text-sm">Preencha e clique em "Ver Preview"</p>
          </div>
        )}
      </div>
    </div>
  );
};
