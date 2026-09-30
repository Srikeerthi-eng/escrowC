import {
  Megaphone,
  Lock,
  Wallet,
  ShieldCheck,
  Gavel,
  FileCheck,
  Briefcase,
  Bell,
  TrendingUp,
  Clock,
  type LucideIcon,
} from 'lucide-react';

type SummaryCardProps = {
  label: string;
  value: string;
  icon: string;
  tone: 'primary' | 'success' | 'warning' | 'error' | 'accent' | 'neutral';
};

const iconMap: Record<string, LucideIcon> = {
  campaigns: Megaphone,
  active: Briefcase,
  locked: Lock,
  released: Wallet,
  pending: Clock,
  disputes: Gavel,
  deliverables: FileCheck,
  verified: ShieldCheck,
  earnings: TrendingUp,
  notifications: Bell,
  payouts: Wallet,
};

const toneMap: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: 'bg-primary-50', text: 'text-primary-600', border: 'border-primary-100' },
  success: { bg: 'bg-success-50', text: 'text-success-600', border: 'border-success-100' },
  warning: { bg: 'bg-warning-50', text: 'text-warning-600', border: 'border-warning-100' },
  error: { bg: 'bg-error-50', text: 'text-error-600', border: 'border-error-100' },
  accent: { bg: 'bg-accent-50', text: 'text-accent-600', border: 'border-accent-100' },
  neutral: { bg: 'bg-neutral-50', text: 'text-neutral-600', border: 'border-neutral-100' },
};

function SummaryCard({ label, value, icon, tone }: SummaryCardProps) {
  const Icon = iconMap[icon] || Megaphone;
  const colors = toneMap[tone] || toneMap.neutral;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-neutral-500 font-medium">{label}</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1">{value}</div>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg} ${colors.text} border ${colors.border}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
