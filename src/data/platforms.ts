import type { LucideIcon } from 'lucide-react';

export interface Capability {
  icon: string;
  label: string;
}

export interface Platform {
  id: string;
  number: string;
  name: string;
  tagline: string;
  overview: string;
  integrationCredit: string;
  capabilities: Capability[];
  url: string;
  contentSide: 'left' | 'right';
  colors: {
    bg: string;
    bgGradient: string;
    accent: string;
    accentHover: string;
    eyebrow: string;
    badge: string;
    badgeBg: string;
    navPill: string;
    glow: string;
  };
  visual: string;
}

export const platforms: Platform[] = [
  {
    id: 'platform-1',
    number: '01',
    name: 'USLTDP 2.0 O&M Digital Twin',
    tagline: 'Real-time Operations & Maintenance for Offshore Assets',
    overview:
      'A real-time Operations & Maintenance (O&M) Digital Twin platform designed for offshore and industrial asset management. Provides an immersive digital environment enabling users to visualize live assets, monitor operational performance, track KPIs, and support informed decision-making through a unified digital representation of physical facilities.',
    integrationCredit: 'McDermott × Tech Mahindra × ADNOC',
    capabilities: [
      { icon: 'Waves', label: 'Remote Well Testing' },
      { icon: 'Activity', label: 'Real-time Flow Assurance' },
      { icon: 'Leaf', label: 'O&M DT Sustainability' },
      { icon: 'Cpu', label: 'O&M Digital Twin' },
      { icon: 'Glasses', label: 'Virtual Reality (VR)' },
      { icon: 'ScanLine', label: 'Augmented Reality (AR)' },
    ],
    url: '#',
    contentSide: 'left',
    colors: {
      bg: '#050d1f',
      bgGradient: 'radial-gradient(ellipse 80% 60% at 60% 30%, #0a1e4a 0%, #050d1f 70%)',
      accent: '#38bdf8',
      accentHover: '#7dd3fc',
      eyebrow: '#38bdf8',
      badge: '#38bdf8',
      badgeBg: 'rgba(56,189,248,0.08)',
      navPill: '#38bdf8',
      glow: 'rgba(56,189,248,0.25)',
    },
    visual: 'DigitalTwinVisual',
  },
  {
    id: 'platform-2',
    number: '02',
    name: 'iSustain O&G Platform',
    tagline: 'AI-Powered Sustainability Intelligence for Oil & Gas',
    overview:
      'An enterprise-grade sustainability management platform tailored for the Oil & Gas sector. Integrates AI-driven analytics, real-time emissions monitoring, and ESG reporting tools to help operators track carbon footprint, optimize energy consumption, and achieve net-zero targets while complying with global environmental regulations.',
    integrationCredit: 'McDermott × ADNOC × Siemens Energy',
    capabilities: [
      { icon: 'BarChart3', label: 'ESG Reporting & Compliance' },
      { icon: 'Zap', label: 'Energy Optimization' },
      { icon: 'Wind', label: 'Emissions Monitoring' },
      { icon: 'TrendingDown', label: 'Carbon Footprint Tracking' },
      { icon: 'Brain', label: 'AI-driven Analytics' },
      { icon: 'Globe', label: 'Net-Zero Planning' },
    ],
    url: '#',
    contentSide: 'right',
    colors: {
      bg: '#021a0e',
      bgGradient: 'radial-gradient(ellipse 80% 60% at 40% 30%, #063d1e 0%, #021a0e 70%)',
      accent: '#34d399',
      accentHover: '#6ee7b7',
      eyebrow: '#34d399',
      badge: '#34d399',
      badgeBg: 'rgba(52,211,153,0.08)',
      navPill: '#34d399',
      glow: 'rgba(52,211,153,0.25)',
    },
    visual: 'SustainabilityVisual',
  },
  {
    id: 'platform-3',
    number: '03',
    name: 'SmartInspect AR Platform',
    tagline: 'Augmented Reality-Driven Asset Inspection & Maintenance',
    overview:
      'A cutting-edge AR platform enabling field engineers to overlay real-time sensor data, 3D schematics, and maintenance procedures onto physical assets using wearable devices. Reduces inspection downtime by 40%, improves first-time fix rates, and creates a seamless bridge between digital documentation and physical field operations.',
    integrationCredit: 'McDermott × PTC Vuforia × Microsoft HoloLens',
    capabilities: [
      { icon: 'ScanLine', label: 'AR Overlay Inspection' },
      { icon: 'Wrench', label: 'Guided Maintenance' },
      { icon: 'CircuitBoard', label: 'Live Sensor Overlay' },
      { icon: 'FileCheck', label: 'Digital Work Permits' },
      { icon: 'Users', label: 'Remote Expert Assist' },
      { icon: 'Shield', label: 'HSE Compliance' },
    ],
    url: '#',
    contentSide: 'left',
    colors: {
      bg: '#130820',
      bgGradient: 'radial-gradient(ellipse 80% 60% at 60% 30%, #2d1455 0%, #130820 70%)',
      accent: '#a78bfa',
      accentHover: '#c4b5fd',
      eyebrow: '#a78bfa',
      badge: '#a78bfa',
      badgeBg: 'rgba(167,139,250,0.08)',
      navPill: '#a78bfa',
      glow: 'rgba(167,139,250,0.25)',
    },
    visual: 'ARVisual',
  },
  {
    id: 'platform-4',
    number: '04',
    name: 'ConnectIQ Industrial IoT Hub',
    tagline: 'Unified Edge-to-Cloud Industrial IoT Intelligence',
    overview:
      'A robust Industrial IoT platform connecting thousands of edge devices, sensors, and PLCs across offshore and onshore facilities to a centralized cloud intelligence layer. Enables predictive maintenance, real-time process optimization, and anomaly detection through advanced edge computing and ML-powered data pipelines.',
    integrationCredit: 'McDermott × AWS IoT × Honeywell Connected Plant',
    capabilities: [
      { icon: 'Radio', label: 'Edge Device Management' },
      { icon: 'GitBranch', label: 'Data Pipeline Orchestration' },
      { icon: 'AlertTriangle', label: 'Anomaly Detection' },
      { icon: 'Gauge', label: 'Predictive Maintenance' },
      { icon: 'Cloud', label: 'Edge-to-Cloud Sync' },
      { icon: 'Lock', label: 'Industrial Cybersecurity' },
    ],
    url: '#',
    contentSide: 'right',
    colors: {
      bg: '#0d1a0a',
      bgGradient: 'radial-gradient(ellipse 80% 60% at 40% 30%, #1a3a0d 0%, #0d1a0a 70%)',
      accent: '#86efac',
      accentHover: '#bbf7d0',
      eyebrow: '#4ade80',
      badge: '#4ade80',
      badgeBg: 'rgba(74,222,128,0.08)',
      navPill: '#4ade80',
      glow: 'rgba(74,222,128,0.25)',
    },
    visual: 'IoTVisual',
  },
  {
    id: 'platform-5',
    number: '05',
    name: 'Nexus AI Decision Engine',
    tagline: 'Autonomous AI for Complex Engineering & Operations Decisions',
    overview:
      'An enterprise AI decision-support engine purpose-built for complex engineering and operational scenarios in energy infrastructure. Combines large language model reasoning with domain-specific engineering knowledge graphs to automate root-cause analysis, recommend optimal intervention strategies, and predict operational risks weeks in advance.',
    integrationCredit: 'McDermott × Google DeepMind × ADNOC Digital',
    capabilities: [
      { icon: 'Brain', label: 'LLM Reasoning Engine' },
      { icon: 'Network', label: 'Knowledge Graph' },
      { icon: 'Search', label: 'Root Cause Analysis' },
      { icon: 'TrendingUp', label: 'Risk Forecasting' },
      { icon: 'Bot', label: 'Agentic Workflows' },
      { icon: 'BookOpen', label: 'Engineering KB' },
    ],
    url: '#',
    contentSide: 'left',
    colors: {
      bg: '#0f0a00',
      bgGradient: 'radial-gradient(ellipse 80% 60% at 60% 30%, #2a1800 0%, #0f0a00 70%)',
      accent: '#fbbf24',
      accentHover: '#fde68a',
      eyebrow: '#fbbf24',
      badge: '#fbbf24',
      badgeBg: 'rgba(251,191,36,0.08)',
      navPill: '#fbbf24',
      glow: 'rgba(251,191,36,0.25)',
    },
    visual: 'AIVisual',
  },
  {
    id: 'platform-6',
    number: '06',
    name: 'FieldOps Command Center',
    tagline: 'Real-time Field Operations Command & Control',
    overview:
      'A centralized command and control platform for managing field operations across geographically distributed offshore and onshore sites. Provides operations managers with a single pane of glass for workforce tracking, permit-to-work management, emergency response coordination, and real-time situational awareness with integrated communications.',
    integrationCredit: 'McDermott × Aveva × SAP S/4HANA',
    capabilities: [
      { icon: 'MapPin', label: 'Workforce Tracking' },
      { icon: 'ClipboardCheck', label: 'Permit-to-Work' },
      { icon: 'Siren', label: 'Emergency Response' },
      { icon: 'Map', label: 'Situational Awareness' },
      { icon: 'MessageSquare', label: 'Integrated Comms' },
      { icon: 'BarChart2', label: 'Ops Analytics' },
    ],
    url: '#',
    contentSide: 'right',
    colors: {
      bg: '#0a0f18',
      bgGradient: 'radial-gradient(ellipse 80% 60% at 40% 30%, #0e2040 0%, #0a0f18 70%)',
      accent: '#60a5fa',
      accentHover: '#93c5fd',
      eyebrow: '#60a5fa',
      badge: '#60a5fa',
      badgeBg: 'rgba(96,165,250,0.08)',
      navPill: '#60a5fa',
      glow: 'rgba(96,165,250,0.25)',
    },
    visual: 'CommandVisual',
  },
];
