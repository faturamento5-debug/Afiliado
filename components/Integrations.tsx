import React, { useState, useEffect } from 'react';
import { Smartphone, Send, QrCode, CheckCircle2, XCircle, Loader2, Bot, MessageSquare } from 'lucide-react';
import { IntegrationState, ConnectionStatus } from '../types';

interface IntegrationsProps {
  state: IntegrationState;
  setState: (state: IntegrationState) => void;
}

export const Integrations: React.FC<IntegrationsProps> = ({ state, setState }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Simulate QR Code generation
  const handleGenerateQR = () => {
    setState({ ...state, whatsapp: 'connecting' });
    setTimeout(() => {
      // Using a static QR code API for visualization
      setQrCodeUrl('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WhatsApp-Auth-Simulation');
      setState({ ...state, whatsapp: 'qr_ready' });
    }, 1500);
  };

  // Simulate scanning the QR code
  useEffect(() => {
    if (state.whatsapp === 'qr_ready') {
      const timer = setTimeout(() => {
        setState({ ...state, whatsapp: 'connected' });
      }, 5000); // Auto connect after 5 seconds to simulate user scanning
      return () => clearTimeout(timer);
    }
  }, [state.whatsapp, setState, state]);

  const handleDisconnect = (type: 'whatsapp' | 'telegram') => {
    setState({ ...state, [type]: 'disconnected' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* WhatsApp Section */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Smartphone size={120} />
        </div>
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
            <MessageSquare size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">WhatsApp</h2>
            <p className="text-slate-400 text-sm">Conecte seu celular para disparos.</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
          {state.whatsapp === 'disconnected' && (
            <div className="text-center">
              <Smartphone size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400 mb-6">Nenhum dispositivo conectado.</p>
              <button 
                onClick={handleGenerateQR}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <QrCode size={18} /> Gerar QR Code
              </button>
            </div>
          )}

          {state.whatsapp === 'connecting' && (
            <div className="text-center">
              <Loader2 size={48} className="mx-auto text-green-500 animate-spin mb-4" />
              <p className="text-slate-300">Iniciando sessão...</p>
            </div>
          )}

          {state.whatsapp === 'qr_ready' && (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="bg-white p-2 rounded-lg mb-4 inline-block">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
              </div>
              <p className="text-white font-semibold mb-1">Escaneie com o seu WhatsApp</p>
              <p className="text-slate-400 text-xs">Aguardando leitura...</p>
            </div>
          )}

          {state.whatsapp === 'connected' && (
            <div className="text-center w-full">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Conectado!</h3>
              <p className="text-slate-400 mb-6">Pronto para enviar mensagens em massa.</p>
              
              <div className="bg-slate-800 p-4 rounded-lg text-left mb-6 border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm text-slate-400">Status</span>
                   <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">ONLINE</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-sm text-slate-400">Sessão</span>
                   <span className="text-xs text-white font-mono">Simulated-Session-ID-X92</span>
                </div>
              </div>

              <button 
                onClick={() => handleDisconnect('whatsapp')}
                className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center justify-center gap-2 mx-auto"
              >
                <XCircle size={16} /> Desconectar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Telegram Section */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Send size={120} />
        </div>

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Telegram Bot</h2>
            <p className="text-slate-400 text-sm">Integração para canais e grupos.</p>
          </div>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Bot Token (BotFather)</label>
                <input 
                    type="password"
                    value={state.telegramBotToken}
                    onChange={(e) => setState({...state, telegramBotToken: e.target.value})}
                    placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">ID do Canal / Grupo</label>
                <input 
                    type="text"
                    value={state.telegramChatId}
                    onChange={(e) => setState({...state, telegramChatId: e.target.value})}
                    placeholder="@meucanaldeofertas"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                />
            </div>

            <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-4">
                <h4 className="text-blue-400 text-sm font-bold mb-2 flex items-center gap-2">
                    <Bot size={14} /> Como configurar?
                </h4>
                <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside">
                    <li>Crie um bot no <strong>@BotFather</strong>.</li>
                    <li>Copie o token e cole acima.</li>
                    <li>Adicione o bot como <strong>Administrador</strong> no seu canal.</li>
                    <li>Coloque o @usuario do canal no campo ID.</li>
                </ol>
            </div>

            <button 
                onClick={() => setState({...state, telegram: 'connected'})}
                disabled={!state.telegramBotToken || !state.telegramChatId}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                    state.telegram === 'connected' 
                    ? 'bg-green-600 hover:bg-green-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
            >
                {state.telegram === 'connected' ? (
                    <> <CheckCircle2 size={18} /> Bot Integrado </>
                ) : (
                    <> <Zap size={18} /> Salvar Integração </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

// Helper icon
const Zap = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
