import React, { useState } from 'react';
import { Wand2, Copy, Send, CheckCircle2, Loader2, ShoppingBag, Smartphone, Radio, Terminal } from 'lucide-react';
import { generateMarketingCopy } from '../services/geminiService';
import { ProductDetails, Platform, GeneratedContent, AffiliateSettings, IntegrationState } from '../types';

interface MagicGeneratorProps {
  affiliateSettings: AffiliateSettings;
  integrationState: IntegrationState;
}

export const MagicGenerator: React.FC<MagicGeneratorProps> = ({ affiliateSettings, integrationState }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [platform, setPlatform] = useState<Platform>(Platform.AMAZON);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  
  // Auto-Bot State
  const [isAutoSending, setIsAutoSending] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  const handleGenerate = async (autoSend: boolean = false) => {
    if (!productName || !price) return;
    setLoading(true);
    if (autoSend) {
      setIsAutoSending(true);
      setLogs(['Iniciando robô de automação...', `Analisando link: ${url}`]);
    }

    try {
      if (autoSend) await new Promise(r => setTimeout(r, 800)); // Simulate delay
      if (autoSend) addLog('Solicitando copy criativa para IA Gemini...');

      // 1. Generate Content with AI
      const copy = await generateMarketingCopy({
        name: productName,
        price: price,
        platform: platform,
        url: url
      });

      if (autoSend) addLog('Copy gerada com sucesso.');
      if (autoSend) await new Promise(r => setTimeout(r, 600));

      // 2. Append Affiliate Tag based on Platform
      if (autoSend) addLog(`Identificando plataforma: ${platform}...`);
      
      let finalLink = url;
      const hasQuery = url.includes('?');
      const prefix = hasQuery ? '&' : '?';

      switch (platform) {
        case Platform.AMAZON:
          if (affiliateSettings.amazonTag) {
            finalLink += `${prefix}tag=${affiliateSettings.amazonTag}`;
            if (autoSend) addLog(`Tag Amazon inserida: ${affiliateSettings.amazonTag}`);
          }
          break;
        case Platform.SHOPEE:
          if (affiliateSettings.shopeeId) {
            finalLink += `${prefix}aff_id=${affiliateSettings.shopeeId}`;
            if (autoSend) addLog(`ID Shopee inserido: ${affiliateSettings.shopeeId}`);
          }
          break;
        case Platform.MERCADO_LIVRE:
          if (affiliateSettings.mlId) {
            finalLink += `${prefix}id=${affiliateSettings.mlId}`;
            if (autoSend) addLog(`ID ML inserido: ${affiliateSettings.mlId}`);
          }
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
        // Simulate Broadcasting
        await new Promise(r => setTimeout(r, 800));
        
        if (integrationState.whatsapp === 'connected') {
             addLog('Conectando ao WhatsApp Session...');
             await new Promise(r => setTimeout(r, 500));
             addLog('Enviando para Grupo: Ofertas VIP #01');
             addLog('Enviando para Grupo: Ofertas VIP #02');
             addLog('Enviando para Grupo: Lista de Espera');
        } else {
            addLog('ALERTA: WhatsApp desconectado. Pulei o envio.');
        }

        if (integrationState.telegram === 'connected') {
            addLog(`Conectando Bot Telegram...`);
            await new Promise(r => setTimeout(r, 500));
            addLog(`Enviando para canal ${integrationState.telegramChatId}...`);
        } else {
             addLog('ALERTA: Telegram não configurado.');
        }
        
        await new Promise(r => setTimeout(r, 500));
        addLog('PROCESSO FINALIZADO COM SUCESSO.');
        setLoading(false);
        // Keep logs open for a bit or let user close
      }

    } catch (error) {
      console.error(error);
      if(autoSend) addLog('ERRO: Falha na geração.');
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
          <h2 className="text-xl font-bold text-white">Criador Mágico & Robô</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Link do Produto</label>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Nome do Produto</label>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ex: iPhone 15" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Preço (R$)</label>
              <input 
                type="text" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 4.500,00" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
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
                Gerar Rascunho
            </button>
            <button
                onClick={() => handleGenerate(true)}
                disabled={loading || !productName}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
                {loading && isAutoSending ? <Loader2 className="animate-spin" size={18} /> : <Radio size={18} />}
                Disparo Automático
            </button>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col relative overflow-hidden">
        {isAutoSending && (
            <div className="absolute inset-0 bg-slate-900/95 z-20 p-6 font-mono text-xs md:text-sm text-green-400 flex flex-col">
                <div className="flex items-center gap-2 border-b border-green-900/50 pb-2 mb-4">
                    <Terminal size={16} />
                    <span className="uppercase tracking-widest font-bold">Log do Robô v1.0</span>
                </div>
                <div className="flex-1 space-y-2 overflow-auto scrollbar-hide">
                    {logs.map((log, i) => (
                        <div key={i} className="animate-in slide-in-from-left-2 fade-in duration-300">
                            {log}
                        </div>
                    ))}
                    {loading && (
                        <div className="animate-pulse">_</div>
                    )}
                </div>
                {!loading && (
                    <button 
                        onClick={() => setIsAutoSending(false)} 
                        className="mt-4 w-full bg-green-900/30 border border-green-500 text-green-400 py-2 rounded hover:bg-green-900/50"
                    >
                        Fechar Terminal
                    </button>
                )}
            </div>
        )}

        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <ShoppingBag size={20} className="text-purple-400"/> Preview da Mensagem
        </h3>
        
        {result ? (
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex-1 relative group">
              <p className="text-white font-bold text-lg mb-2">{result.title}</p>
              <p className="text-slate-300 whitespace-pre-line mb-4">{result.description}</p>
              <p className="text-blue-400 text-sm mb-4">{result.hashtags.join(' ')}</p>
              <div className="text-xs text-slate-500 break-all bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-purple-400 font-bold">Link Formatado:</span> {result.finalUrl}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => copyToClipboard(`${result.title}\n\n${result.description}\n\nCompre aqui: ${result.finalUrl}\n\n${result.hashtags.join(' ')}`)}
                className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
              >
                <Copy size={18} /> Copiar
              </button>
              <div className="flex gap-1">
                 <div className={`flex-1 flex items-center justify-center rounded-lg border ${integrationState.whatsapp === 'connected' ? 'bg-green-900/20 border-green-500 text-green-500' : 'bg-slate-700 border-slate-600 text-slate-500'}`}>
                    <Smartphone size={18} />
                 </div>
                 <div className={`flex-1 flex items-center justify-center rounded-lg border ${integrationState.telegram === 'connected' ? 'bg-blue-900/20 border-blue-500 text-blue-500' : 'bg-slate-700 border-slate-600 text-slate-500'}`}>
                    <Send size={18} />
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
            <Wand2 size={48} className="mb-4 opacity-20" />
            <p className="text-center">Preencha os dados.<br/>Use o "Disparo Automático" para enviar direto.</p>
          </div>
        )}
      </div>
    </div>
  );
};