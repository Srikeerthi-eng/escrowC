import SummaryCard from '@/components/SummaryCard';
import StatusBadge from '@/components/StatusBadge';
import { Megaphone, Lock, Wallet, ShieldCheck, Gavel, Briefcase } from 'lucide-react';

const mockCampaigns = [
  {
    name: 'Nike Summer Campaign',
    creator: '@creator123',
    amount: '₹30,000',
    progress: '1/3 Milestones',
    escrow: 'PARTIALLY_RELEASED',
    deadline: '15 Oct 2026',
    status: 'ACTIVE',
  },
  {
    name: 'Adidas Fitness Campaign',
    creator: '@fitnessguru',
    amount: '₹20,000',
    progress: '0/2 Milestones',
    escrow: 'LOCKED',
    deadline: '20 Oct 2026',
    status: 'PENDING',
  },
  {
    name: 'Samsung Creator Campaign',
    creator: '@techreviewer',
    amount: '₹40,000',
    progress: '4/4 Milestones',
    escrow: 'RELEASED',
    deadline: '01 Oct 2026',
    status: 'COMPLETED',
  },
];

function BrandDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Welcome back, Nike</h1>
        <p className="text-neutral-500 mt-1">
          Manage your creator campaigns, escrow, deliverables and payouts.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Total Campaigns" value="3" icon="campaigns" tone="primary" />
        <SummaryCard label="Active Campaigns" value="2" icon="active" tone="accent" />
        <SummaryCard label="Locked Escrow" value="₹20,000" icon="locked" tone="warning" />
        <SummaryCard label="Released Payouts" value="₹10,000" icon="released" tone="success" />
        <SummaryCard label="Pending Verification" value="1" icon="pending" tone="neutral" />
        <SummaryCard label="Open Disputes" value="1" icon="disputes" tone="error" />
      </div>

      {/* Campaign progress highlight */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-neutral-900">Nike Summer Campaign — Progress</h2>
          <StatusBadge status="ACTIVE" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-neutral-500">Deliverables Verified</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">1 / 3</div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Released</div>
            <div className="text-xl font-bold text-success-600 mt-1">₹10,000</div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Locked</div>
            <div className="text-xl font-bold text-warning-600 mt-1">₹20,000</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-neutral-500">Progress</span>
            <span className="font-medium text-neutral-700">33%</span>
          </div>
          <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary-600 rounded-full" style={{ width: '33%' }} />
          </div>
        </div>
      </div>

      {/* Recent campaigns table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="font-semibold text-neutral-900">Recent Campaigns</h2>
          <div className="flex items-center gap-2 text-primary-600">
            <Megaphone size={16} />
            <span className="text-sm font-medium">View All</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 text-neutral-500 text-left">
                <th className="px-6 py-3 font-medium">Campaign</th>
                <th className="px-6 py-3 font-medium">Creator</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Progress</th>
                <th className="px-6 py-3 font-medium">Escrow</th>
                <th className="px-6 py-3 font-medium">Deadline</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {mockCampaigns.map((c) => (
                <tr key={c.name} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-medium text-neutral-900">{c.name}</td>
                  <td className="px-6 py-4 text-neutral-600">{c.creator}</td>
                  <td className="px-6 py-4 text-neutral-900 font-medium">{c.amount}</td>
                  <td className="px-6 py-4 text-neutral-600">{c.progress}</td>
                  <td className="px-6 py-4"><StatusBadge status={c.escrow} variant="small" /></td>
                  <td className="px-6 py-4 text-neutral-600">{c.deadline}</td>
                  <td className="px-6 py-4"><StatusBadge status={c.status} variant="small" /></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50">
                        View
                      </button>
                      <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 border border-primary-200 hover:bg-primary-50">
                        Manage
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BrandDashboard;
