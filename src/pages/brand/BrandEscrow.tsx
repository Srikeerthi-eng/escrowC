import { useState } from 'react';
import { useAppStore, type EscrowTransaction } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import SummaryCard from '@/components/SummaryCard';
import Modal from '@/components/Modal';
import MockEnvBanner from '@/components/MockEnvBanner';
import { Lock, Wallet, Clock, Gavel, Eye, ArrowRight } from 'lucide-react';

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

function BrandEscrow() {
  const store = useAppStore();
  const [selected, setSelected] = useState<EscrowTransaction | null>(null);

  const totalLocked = store.escrowTxns.filter((e) => e.status === 'Locked').reduce((s, e) => s + e.amount, 0);
  const totalReleased = store.escrowTxns.filter((e) => e.status === 'Released').reduce((s, e) => s + e.amount, 0);
  const totalPending = store.escrowTxns.filter((e) => e.status === 'Verification Pending' || e.status === 'Pending').reduce((s, e) => s + e.amount, 0);
  const totalDisputed = store.escrowTxns.filter((e) => e.status === 'Disputed').reduce((s, e) => s + e.amount, 0);

  const getCreator = (id: string) => store.creators.find((c) => c.id === id);
  const getCampaign = (id: string) => store.campaigns.find((c) => c.id === id);

  return (
    <div>
      <div className="mb-4">
        <MockEnvBanner />
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Escrow Management</h1>
        <p className="text-neutral-500 mt-1">Simulated escrow ledger for all campaign transactions. No real funds are held or transferred.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Total Locked" value={formatINR(totalLocked)} icon="locked" tone="warning" />
        <SummaryCard label="Released" value={formatINR(totalReleased)} icon="released" tone="success" />
        <SummaryCard label="Pending Release" value={formatINR(totalPending)} icon="pending" tone="neutral" />
        <SummaryCard label="Disputed" value={formatINR(totalDisputed)} icon="disputes" tone="error" />
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="font-semibold text-neutral-900">Escrow Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 text-neutral-500 text-left">
                <th className="px-6 py-3 font-medium">Campaign</th>
                <th className="px-6 py-3 font-medium">Creator</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Milestone</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Created</th>
                <th className="px-6 py-3 font-medium">Updated</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {store.escrowTxns.map((txn) => {
                const campaign = getCampaign(txn.campaignId);
                const creator = getCreator(txn.creatorId);
                const milestone = campaign?.milestones.find((m) => m.id === txn.milestoneId);
                return (
                  <tr key={txn.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 font-medium text-neutral-900">{campaign?.name || '—'}</td>
                    <td className="px-6 py-4 text-neutral-600">{creator?.name || '—'}</td>
                    <td className="px-6 py-4 text-neutral-900 font-medium">{formatINR(txn.amount)}</td>
                    <td className="px-6 py-4 text-neutral-600">{milestone?.title || 'Initial Lock'}</td>
                    <td className="px-6 py-4"><StatusBadge status={txn.status} variant="small" /></td>
                    <td className="px-6 py-4 text-neutral-500">{txn.createdAt}</td>
                    <td className="px-6 py-4 text-neutral-500">{txn.updatedAt}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelected(txn)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 border border-primary-200 hover:bg-primary-50"
                      >
                        <Eye size={14} /> View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escrow Details Modal */}
      {selected && (
        <EscrowDetailsModal txn={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

// ─── Escrow Details Modal ────────────────────────────────

function EscrowDetailsModal({ txn, onClose }: { txn: EscrowTransaction; onClose: () => void }) {
  const store = useAppStore();
  const campaign = store.campaigns.find((c) => c.id === txn.campaignId);
  const creator = store.creators.find((c) => c.id === txn.creatorId);
  const milestone = campaign?.milestones.find((m) => m.id === txn.milestoneId);
  const campaignTxns = store.escrowTxns.filter((e) => e.campaignId === txn.campaignId);
  const campaignPayouts = store.payouts.filter((p) => p.campaignId === txn.campaignId);

  if (!campaign) return null;

  return (
    <Modal open onClose={onClose} title="Escrow Details" size="lg">
      <div className="space-y-5">
        <div className="p-4 rounded-lg bg-warning-50 border border-warning-200 text-sm text-warning-800">
          DEMO / MOCK ENVIRONMENT — No real money is transferred. This is a simulated escrow ledger entry.
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InfoBox label="Campaign" value={campaign.name} />
          <InfoBox label="Creator" value={creator?.name || '—'} />
          <InfoBox label="Total Amount" value={formatINR(campaign.budget)} />
          <InfoBox label="Txn ID" value={txn.txnId} />
          <InfoBox label="Amount Locked" value={formatINR(campaign.lockedAmount)} />
          <InfoBox label="Amount Released" value={formatINR(campaign.releasedAmount)} />
          <InfoBox label="Remaining" value={formatINR(campaign.lockedAmount)} />
          <InfoBox label="Status" value={campaign.escrowStatus} />
        </div>

        {/* Milestone breakdown */}
        <div>
          <h4 className="font-semibold text-neutral-900 mb-3">Milestone Breakdown</h4>
          <div className="space-y-2">
            {campaign.milestones.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-3 rounded-lg border border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-sm font-medium text-neutral-600">
                    {m.index}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-900">{m.title}</div>
                    <div className="text-xs text-neutral-500">{formatINR(m.amount)}</div>
                  </div>
                </div>
                <StatusBadge status={m.status} variant="small" />
              </div>
            ))}
          </div>
        </div>

        {/* Transaction timeline */}
        <div>
          <h4 className="font-semibold text-neutral-900 mb-3">Transaction Timeline</h4>
          <div className="space-y-3">
            {campaignTxns.map((t) => {
              const m = campaign.milestones.find((m) => m.id === t.milestoneId);
              return (
                <div key={t.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    t.type === 'LOCK' ? 'bg-warning-100 text-warning-600' :
                    t.type === 'RELEASE' ? 'bg-success-100 text-success-600' :
                    'bg-error-100 text-error-600'
                  }`}>
                    {t.type === 'LOCK' ? <Lock size={16} /> : t.type === 'RELEASE' ? <Wallet size={16} /> : <Gavel size={16} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-900">
                        {t.type === 'LOCK' ? 'Escrow Locked' : t.type === 'RELEASE' ? 'Payout Released' : 'Dispute Hold'}
                      </span>
                      <span className="text-sm font-medium text-neutral-900">{formatINR(t.amount)}</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {t.txnId} · {m?.title || 'Initial Lock'} · {t.createdAt}
                    </div>
                    <div className="mt-1"><StatusBadge status={t.status} variant="small" /></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-neutral-200">
      <div className="text-xs text-neutral-400">{label}</div>
      <div className="text-sm font-medium text-neutral-900 mt-0.5">{value}</div>
    </div>
  );
}

export default BrandEscrow;
