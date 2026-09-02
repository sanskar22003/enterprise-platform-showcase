import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Settings, ShieldAlert, Activity, Users, Zap } from 'lucide-react';
import { platformConfig } from '../config/platforms';
import { DotPattern } from '../components/ui/DotPattern';
import { cn } from '../lib/utils';
import type { Theme } from '../App';

interface Props { theme: Theme; }

export default function PlatformPage({ theme }: Props) {
  const { id } = useParams();
  const isDark = theme === 'dark';
  const platform = platformConfig.find(p => p.path === `/platform/${id}`);

  const modules = [
    { name: 'System Analytics', icon: BarChart3, desc: 'Real-time throughput & performance metrics.' },
    { name: 'Live Monitoring', icon: Activity, desc: 'Continuous asset health & tracking.' },
    { name: 'Predictive Alerts', icon: ShieldAlert, desc: 'AI-driven anomaly detection & warnings.' },
    { name: 'Resource Allocation', icon: Users, desc: 'Workforce deployment & optimization.' },
    { name: 'Power Metrics', icon: Zap, desc: 'Energy consumption & efficiency tracking.' },
    { name: 'Configuration', icon: Settings, desc: 'Global settings & access control.' },
  ];

  return (
    <div className={cn(
      'min-h-screen flex flex-col items-center py-16 px-6 relative transition-colors duration-700 overflow-y-auto',
      isDark ? 'bg-[#07101e] text-white' : 'bg-[#f8fafc] text-black'
    )}>
      <DotPattern
        width={24} height={24} cx={1} cy={1} cr={1}
        className={cn('transition-colors duration-700 fixed inset-0 pointer-events-none', isDark ? 'fill-white/[0.03]' : 'fill-black/[0.04]')}
      />
      
      <div className='relative z-10 w-full max-w-6xl flex flex-col gap-10'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8' style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <div className='flex flex-col gap-2'>
            <span className={cn('text-xs font-mono tracking-widest uppercase', isDark ? 'text-sky-400' : 'text-sky-600')}>
              Platform Module {platform?.number}
            </span>
            <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight'>{platform?.name || 'Unknown Platform'}</h1>
            <p className={cn('max-w-xl text-lg mt-2', isDark ? 'text-white/60' : 'text-black/60')}>
              Detailed dashboard overview and active system metrics for {platform?.name || 'this module'}.
            </p>
          </div>
          <Link
            to='/'
            className={cn(
              'flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all border',
              isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-black/5 hover:bg-black/10 border-black/10'
            )}
          >
            <ArrowLeft className='w-4 h-4' /> Back to Command Center
          </Link>
        </div>

        {/* Content Section - Skeleton Modules */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {modules.map((mod, i) => (
            <div 
              key={i} 
              className={cn(
                'p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1',
                isDark ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20' : 'bg-black/[0.02] border-black/10 hover:bg-black/[0.04] hover:border-black/20'
              )}
            >
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-5', isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-500/10 text-sky-600')}>
                <mod.icon className='w-6 h-6' />
              </div>
              <h3 className='text-xl font-bold mb-2'>{mod.name}</h3>
              <p className={cn('text-sm', isDark ? 'text-white/50' : 'text-black/60')}>{mod.desc}</p>
              
              {/* Fake UI Element inside card */}
              <div className='mt-6 w-full h-24 rounded-lg overflow-hidden flex items-end gap-1 opacity-60'>
                {[...Array(12)].map((_, j) => (
                  <div 
                    key={j} 
                    className={cn('flex-1 rounded-t-sm', isDark ? 'bg-white/10' : 'bg-black/10')}
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}