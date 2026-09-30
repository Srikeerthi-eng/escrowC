import SummaryCard from '@/components/SummaryCard';
import StatusBadge from '@/components/StatusBadge';
import { Briefcase, FileCheck, ShieldCheck, Wallet, TrendingUp, Gavel } from 'lucide-react';

const mockCampaigns = [
  {
    name: 'Nike Summer Campaign',
    brand: 'Nike',
    payment: '₹30,000',
    progress: '1 / 3 Deliverables',
    released: '₹10,000',
    locked: '₹20,000',
    deadline: '15 Oct 2026',
    status: 'ACTIVE',
  },
  {
    name: 'Adidas Fitness Campaign',
    brand: 'Adidas',
    payment: '₹20,000',
    progress: '0 / 2 Deliverables',
    released: '₹0',
    locked: '₹20,000',
    deadline: '20 Oct 2026',
    status: 'PENDING',
  },
];

function CreatorDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Welcome back, @creator123</h1>
        <p className="text-neutral-500 mt-1">
          Track your campaigns, deliverables and earnings.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Active Campaigns" value="2" icon="active" tone="primary" />
        <SummaryCard label="Pending Deliverables" value="1" icon="deliverables" tone="warning" />
        <SummaryCard label="Verified Deliverables" value="5" icon="verified" tone="success" />
        <SummaryCard label="Pending Payouts" value="₹10,000" icon="payouts" tone="neutral" />
        <SummaryCard label="Released Earnings" value="₹45,000" icon="earnings" tone="success" />
        <SummaryCard label="Open Disputes" value="1" icon="disputes" tone="error" />
      </div>

      {/* Active campaigns */}
      <div className="space-y-4">
        <h2 className="font-semibold text-neutral-900 text-lg">Active Campaigns</h2>
        {mockCampaigns.map((c) => (
          <div key={c.name} className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-neutral-900">{c.name}</h3>
                <div className="text-sm text-neutral-500 mt-0.5">Brand: {c.brand}</div>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-neutral-500">Payment</div>
                <div className="font-medium text-neutral-900 mt-0.5">{c.payment}</div>
              </div>
              <div>
                <div className="text-neutral-500">Progress</div>
                <div className="font-medium text-neutral-900 mt-0.5">{c.progress}</div>
              </div>
              <div>
                <div className="text-neutral-500">Released</div>
                <div className="font-medium text-success-600 mt-0.5">{c.released}</div>
              </div>
              <div>
                <div className="text-neutral-500">Locked</div>
                <div className="font-medium text-warning-600 mt-0.5">{c.locked}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-neutral-500">Deadline: {c.deadline}</div>
              <button className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                Open Campaign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatorDashboard;
