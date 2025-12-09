export enum Platform {
  MERCADO_LIVRE = 'Mercado Livre',
  AMAZON = 'Amazon',
  SHOPEE = 'Shopee',
  OTHER = 'Other'
}

export interface ProductDetails {
  url: string;
  name: string;
  price: string;
  platform: Platform;
}

export interface GeneratedContent {
  title: string;
  description: string;
  hashtags: string[];
  finalUrl: string;
}

export interface AffiliateSettings {
  amazonTag: string;
  shopeeId: string;
  mlId: string;
}

export interface GroupConfig {
  id: string;
  name: string;
  link: string;
  clicks: number;
  maxClicks: number;
  isActive: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: any;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  active: boolean;
}

export interface BrandingConfig {
  appName: string;
  primaryColor: string; // Hex code
  logoUrl?: string;
  domain?: string;
}

export type ConnectionStatus = 'disconnected' | 'qr_ready' | 'connecting' | 'connected';

export interface IntegrationState {
  whatsapp: ConnectionStatus;
  telegram: ConnectionStatus;
  telegramBotToken: string;
  telegramChatId: string;
}