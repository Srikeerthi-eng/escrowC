import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  Megaphone,
  Users,
  Lock,
  FileCheck,
  ShieldCheck,
  Wallet,
  Gavel,
  ScrollText,
  BarChart3,
  UserCircle,
  Settings,
  Briefcase,
  Compass,
  Mail,
  Bell,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import type { UserRole } from '@/types';

type SidebarProps = {
  role: UserRole;
  userName: string;
};

const brandNav: { label: string; path: string; icon: React.ReactNode }[] = [
  { label: 'Dashboard', path: '/brand/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Campaigns', path: '/brand/campaigns', icon: <Megaphone size={20} /> },
  { label: 'Find Creators', path: '/brand/creators', icon: <Users size={20} /> },
  { label: 'Escrow', path: '/brand/escrow', icon: <Lock size={20} /> },
  { label: 'Deliverables', path: '/brand/deliverables', icon: <FileCheck size={20} /> },
  { label: 'Verification', path: '/brand/verification', icon: <ShieldCheck size={20} /> },
  { label: 'Payouts', path: '/brand/payouts', icon: <Wallet size={20} /> },
  { label: 'Disputes', path: '/brand/disputes', icon: <Gavel size={20} /> },
  { label: 'Audit Logs', path: '/brand/audit-logs', icon: <ScrollText size={20} /> },
  { label: 'Analytics', path: '/brand/analytics', icon: <BarChart3 size={20} /> },
  { label: 'Profile', path: '/brand/profile', icon: <UserCircle size={20} /> },
  { label: 'Settings', path: '/brand/settings', icon: <Settings size={20} /> },
];

const creatorNav: { label: string; path: string; icon: React.ReactNode }[] = [
  { label: 'Dashboard', path: '/creator/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'My Profile', path: '/creator/profile', icon: <UserCircle size={20} /> },
  { label: 'Discover Campaigns', path: '/creator/campaigns/discover', icon: <Compass size={20} /> },
  { label: 'Campaign Invitations', path: '/creator/invitations', icon: <Mail size={20} /> },
  { label: 'My Campaigns', path: '/creator/campaigns', icon: <Briefcase size={20} /> },
  { label: 'Deliverables', path: '/creator/deliverables', icon: <FileCheck size={20} /> },
  { label: 'Verification', path: '/creator/verification', icon: <ShieldCheck size={20} /> },
  { label: 'Payouts', path: '/creator/payouts', icon: <Wallet size={20} /> },
  { label: 'Disputes', path: '/creator/disputes', icon: <Gavel size={20} /> },
  { label: 'Notifications', path: '/creator/notifications', icon: <Bell size={20} /> },
  { label: 'Analytics', path: '/creator/analytics', icon: <BarChart3 size={20} /> },
  { label: 'Settings', path: '/creator/settings', icon: <Settings size={20} /> },
];

function Sidebar({ role, userName }: SidebarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = role === 'BRAND' ? brandNav : creatorNav;
  const dashboardPath = role === 'BRAND' ? '/brand/dashboard' : '/creator/dashboard';

  const isActive = (path: string) => {
    if (path === dashboardPath) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const roleLabel = role === 'BRAND' ? 'Brand Portal' : 'Creator Portal';
  const roleColor = role === 'BRAND' ? 'bg-primary-600' : 'bg-accent-600';

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-lg shadow-md p-2 border border-neutral-200"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-neutral-900 text-white z-40
          flex flex-col sidebar-transition
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-neutral-800">
          <div className={`w-10 h-10 rounded-lg ${roleColor} flex items-center justify-center font-bold text-lg`}>
            E
          </div>
          <div>
            <div className="font-semibold text-base leading-tight">EscrowCreator</div>
            <div className="text-xs text-neutral-400">{roleLabel}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors
                ${isActive(item.path)
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-neutral-800 px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{userName}</div>
              <div className="text-xs text-neutral-400">{role}</div>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Switch Role
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
