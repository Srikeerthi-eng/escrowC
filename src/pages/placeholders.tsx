import PlaceholderPage from '@/components/PlaceholderPage';
import { Megaphone, Users, Lock, FileCheck, ShieldCheck, Wallet, Gavel, ScrollText, BarChart3, UserCircle, Settings, Compass, Mail, Briefcase, Bell } from 'lucide-react';
import type { ReactNode } from 'react';

type PlaceholderProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

function createPlaceholder({ title, description, icon }: PlaceholderProps) {
  return function Placeholder() {
    return <PlaceholderPage title={title} description={description} icon={icon} />;
  };
}

export const BrandCampaigns = createPlaceholder({
  title: 'Campaigns',
  description: 'View and manage all your brand campaigns. Full campaign creation, filtering, and management coming in Phase 3.',
  icon: <Megaphone size={28} />,
});

export const BrandFindCreators = createPlaceholder({
  title: 'Find Creators',
  description: 'Browse creator profiles and send campaign invitations. Creator directory coming in Phase 3.',
  icon: <Users size={28} />,
});

export const BrandEscrow = createPlaceholder({
  title: 'Escrow Management',
  description: 'View escrow summaries, fund mock escrow, and track release status. Escrow features coming in Phase 4.',
  icon: <Lock size={28} />,
});

export const BrandDeliverables = createPlaceholder({
  title: 'Deliverables',
  description: 'Review submitted deliverables and their verification status. Deliverable tracking coming in Phase 5.',
  icon: <FileCheck size={28} />,
});

export const BrandVerification = createPlaceholder({
  title: 'Verification',
  description: 'View automated verification results for each deliverable. Verification engine coming in Phase 6.',
  icon: <ShieldCheck size={28} />,
});

export const BrandPayouts = createPlaceholder({
  title: 'Payouts',
  description: 'Track milestone payouts and release mock payouts to creators. Payout management coming in Phase 7.',
  icon: <Wallet size={28} />,
});

export const BrandDisputes = createPlaceholder({
  title: 'Disputes',
  description: 'Review and resolve disputes raised by creators. Dispute management coming in Phase 8.',
  icon: <Gavel size={28} />,
});

export const BrandAuditLogs = createPlaceholder({
  title: 'Audit Logs',
  description: 'Tamper-evident SHA-256 audit trail of every platform event. Audit logging coming in Phase 9.',
  icon: <ScrollText size={28} />,
});

export const BrandAnalytics = createPlaceholder({
  title: 'Analytics',
  description: 'Campaign performance, escrow distribution, and payout analytics with charts. Analytics coming in Phase 10.',
  icon: <BarChart3 size={28} />,
});

export const BrandProfile = createPlaceholder({
  title: 'Brand Profile',
  description: 'Manage your brand information, logo, and contact details.',
  icon: <UserCircle size={28} />,
});

export const BrandSettings = createPlaceholder({
  title: 'Settings',
  description: 'Manage account settings, notifications, and preferences.',
  icon: <Settings size={28} />,
});

// Creator placeholders
export const CreatorProfile = createPlaceholder({
  title: 'My Profile',
  description: 'Create and manage your creator profile — bio, platforms, followers, portfolio, and more. Coming in Phase 3.',
  icon: <UserCircle size={28} />,
});

export const CreatorDiscover = createPlaceholder({
  title: 'Discover Campaigns',
  description: 'Browse and apply to brand campaigns. Campaign discovery coming in Phase 3.',
  icon: <Compass size={28} />,
});

export const CreatorInvitations = createPlaceholder({
  title: 'Campaign Invitations',
  description: 'View and respond to campaign invitations from brands. Coming in Phase 3.',
  icon: <Mail size={28} />,
});

export const CreatorCampaigns = createPlaceholder({
  title: 'My Campaigns',
  description: 'Track all your active, pending, and completed campaigns. Coming in Phase 3.',
  icon: <Briefcase size={28} />,
});

export const CreatorDeliverables = createPlaceholder({
  title: 'Deliverables',
  description: 'Submit deliverables for verification and track their status. Deliverable submission coming in Phase 5.',
  icon: <FileCheck size={28} />,
});

export const CreatorVerification = createPlaceholder({
  title: 'Verification',
  description: 'View verification results for your submitted deliverables. Verification engine coming in Phase 6.',
  icon: <ShieldCheck size={28} />,
});

export const CreatorPayouts = createPlaceholder({
  title: 'Payouts',
  description: 'Track your earnings, pending payouts, and transaction history. Payout tracking coming in Phase 7.',
  icon: <Wallet size={28} />,
});

export const CreatorDisputes = createPlaceholder({
  title: 'Disputes',
  description: 'Raise and track disputes for failed verifications. Dispute management coming in Phase 8.',
  icon: <Gavel size={28} />,
});

export const CreatorNotifications = createPlaceholder({
  title: 'Notifications',
  description: 'Stay updated on campaign invitations, verification results, and payout releases.',
  icon: <Bell size={28} />,
});

export const CreatorAnalytics = createPlaceholder({
  title: 'Analytics',
  description: 'View your earnings trends, verification success rate, and campaign performance. Analytics coming in Phase 10.',
  icon: <BarChart3 size={28} />,
});

export const CreatorSettings = createPlaceholder({
  title: 'Settings',
  description: 'Manage account settings, password, notifications, and privacy.',
  icon: <Settings size={28} />,
});
