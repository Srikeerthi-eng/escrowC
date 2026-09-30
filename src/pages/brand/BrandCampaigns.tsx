import { useState } from 'react';
import { useAppStore, genId, type Campaign } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import ProgressBar from '@/components/ProgressBar';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import { useToastState } from '@/components/Toast';
import { Megaphone, Plus, Search, Eye, Pencil, Calendar, User, Hash, Clock, Lock, Wallet, FileCheck, ShieldCheck, TrendingUp } from 'lucide-react';

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

const statusFilters = ['All', 'Draft', 'Active', 'Completed', 'Disputed'] as const;

function BrandCampaigns() {
  const store = useAppStore();
  const { toasts, show, dismiss } = useToastState();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<typeof statusFilters[number]>('All');
  const [createOpen, setCreateOpen] = useState(false);
  const [detailsCampaign, setDetailsCampaign] = useState<Campaign | null>(null);

  const filtered = store.campaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      store.creators.find((cr) => cr.id === c.creatorId)?.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getCreator = (id: string) => store.creators.find((c) => c.id === id);

  return (
    <div>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Campaigns</h1>
          <p className="text-neutral-500 mt-1">Create and manage creator campaigns.</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === s ? 'bg-primary-600 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200">
          <EmptyState
            icon={<Megaphone size={28} />}
            title="No campaigns found"
            description="Try adjusting your filters or create a new campaign."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => {
            const creator = getCreator(c.creatorId);
            const progress = c.deliverableCount > 0 ? Math.round((c.verifiedCount / c.deliverableCount) * 100) : 0;
            return (
              <div key={c.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-neutral-900">{c.name}</h3>
                    <p className="text-sm text-neutral-500 mt-0.5">{creator?.name} · {c.platform}</p>
                  </div>
                  <StatusBadge status={c.status} variant="small" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <div className="text-neutral-400 text-xs">Budget</div>
                    <div className="font-medium text-neutral-900">{formatINR(c.budget)}</div>
                  </div>
                  <div>
                    <div className="text-neutral-400 text-xs">Locked</div>
                    <div className="font-medium text-warning-600">{formatINR(c.lockedAmount)}</div>
                  </div>
                  <div>
                    <div className="text-neutral-400 text-xs">Deliverables</div>
                    <div className="font-medium text-neutral-900">{c.verifiedCount}/{c.deliverableCount} verified</div>
                  </div>
                  <div>
                    <div className="text-neutral-400 text-xs">Deadline</div>
                    <div className="font-medium text-neutral-900">{c.deadline}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-neutral-400">Progress</span>
                    <span className="font-medium text-neutral-600">{progress}%</span>
                  </div>
                  <ProgressBar value={progress} color={progress === 100 ? 'bg-success-500' : 'bg-primary-600'} />
                </div>
                <div className="flex items-center justify-between">
                  <StatusBadge status={c.escrowStatus} variant="small" />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDetailsCampaign(c)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      onClick={() => setDetailsCampaign(c)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 border border-primary-200 hover:bg-primary-50"
                    >
                      <Pencil size={14} /> Manage
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Campaign Modal */}
      <CreateCampaignModal open={createOpen} onClose={() => setCreateOpen(false)} onCreated={() => show('Campaign created successfully.', 'success')} />

      {/* Campaign Details Modal */}
      {detailsCampaign && (
        <CampaignDetailsModal
          campaign={detailsCampaign}
          onClose={() => setDetailsCampaign(null)}
        />
      )}
    </div>
  );
}

// ─── Create Campaign Modal ──────────────────────────────

function CreateCampaignModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const store = useAppStore();
  const [form, setForm] = useState({
    name: '',
    description: '',
    creatorId: '',
    budget: '',
    deliverableCount: '',
    deadline: '',
    requiredHashtag: '',
    minLiveDuration: '48 hours',
    category: '',
    requirements: '',
  });

  const handleSubmit = () => {
    if (!form.name || !form.creatorId || !form.budget) return;
    const budget = parseInt(form.budget);
    const count = parseInt(form.deliverableCount) || 3;
    const milestoneAmount = Math.round(budget / count);
    const campaignId = genId('camp');
    const milestones = Array.from({ length: count }, (_, i) => ({
      id: genId('m'),
      index: i + 1,
      title: `Milestone ${i + 1}`,
      amount: milestoneAmount,
      status: 'PENDING' as const,
      deliverableId: null,
    }));

    const newCampaign: Campaign = {
      id: campaignId,
      name: form.name,
      description: form.description,
      creatorId: form.creatorId,
      platform: 'Instagram',
      budget,
      lockedAmount: 0,
      releasedAmount: 0,
      deliverableCount: count,
      verifiedCount: 0,
      deadline: form.deadline || '2026-12-31',
      requiredHashtag: form.requiredHashtag || '#BrandPartner',
      minLiveDuration: form.minLiveDuration,
      category: form.category || 'General',
      status: 'Draft',
      escrowStatus: 'PENDING',
      escrowTxnId: null,
      milestones,
      createdAt: new Date().toISOString().split('T')[0],
      requirements: form.requirements ? form.requirements.split('\n').filter(Boolean) : ['Instagram Reel', form.requiredHashtag + ' hashtag', 'Published before deadline'],
    };

    useAppStore.setState((prev) => ({
      ...prev,
      campaigns: [...prev.campaigns, newCampaign],
      auditLogs: [...prev.auditLogs, {
        id: genId('a'),
        timestamp: new Date().toLocaleString('en-IN'),
        actor: 'Nike', role: 'BRAND',
        action: 'Campaign Created',
        campaign: form.name,
        entity: 'Campaign',
        prevState: '—', newState: 'Draft',
        refId: 'CTR-' + String(prev.campaigns.length + 1).padStart(4, '0'),
        hash: genId('h'), prevHash: prev.auditLogs[prev.auditLogs.length - 1]?.hash || '00000000',
      }],
    }));

    setForm({ name: '', description: '', creatorId: '', budget: '', deliverableCount: '', deadline: '', requiredHashtag: '', minLiveDuration: '48 hours', category: '', requirements: '' });
    onCreated();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Campaign"
      size="lg"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">Create Campaign</button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Campaign Name">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" placeholder="Nike Summer Campaign" />
        </Field>
        <Field label="Description">
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="form-input" rows={2} placeholder="Campaign description..." />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Select Creator">
            <select value={form.creatorId} onChange={(e) => setForm({ ...form, creatorId: e.target.value })} className="form-input">
              <option value="">Select a creator...</option>
              {store.creators.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.category})</option>
              ))}
            </select>
          </Field>
          <Field label="Total Budget (₹)">
            <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="form-input" placeholder="30000" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Number of Milestones">
            <input type="number" value={form.deliverableCount} onChange={(e) => setForm({ ...form, deliverableCount: e.target.value })} className="form-input" placeholder="3" />
          </Field>
          <Field label="Deadline">
            <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="form-input" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Required Hashtag">
            <input value={form.requiredHashtag} onChange={(e) => setForm({ ...form, requiredHashtag: e.target.value })} className="form-input" placeholder="#NikePartner" />
          </Field>
          <Field label="Category">
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="form-input" placeholder="Fashion / Sports" />
          </Field>
        </div>
        <Field label="Deliverable Requirements (one per line)">
          <textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className="form-input" rows={3} placeholder={'Instagram Reel\n#NikePartner hashtag\nPublished before deadline'} />
        </Field>
      </div>
    </Modal>
  );
}

// ─── Campaign Details Modal ──────────────────────────────

function CampaignDetailsModal({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) {
  const store = useAppStore();
  const creator = store.creators.find((c) => c.id === campaign.creatorId);
  const deliverables = store.deliverables.filter((d) => d.campaignId === campaign.id);
  const escrowTxns = store.escrowTxns.filter((e) => e.campaignId === campaign.id);
  const payouts = store.payouts.filter((p) => p.campaignId === campaign.id);
  const disputes = store.disputes.filter((d) => d.campaignId === campaign.id);
  const auditLogs = store.auditLogs.filter((a) => a.campaign === campaign.name);
  const progress = campaign.deliverableCount > 0 ? Math.round((campaign.verifiedCount / campaign.deliverableCount) * 100) : 0;

  return (
    <Modal open onClose={onClose} title="Campaign Details" size="xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">{campaign.name}</h2>
            <p className="text-sm text-neutral-500 mt-1">{campaign.description}</p>
          </div>
          <div className="flex gap-2">
            <StatusBadge status={campaign.status} variant="small" />
            <StatusBadge status={campaign.escrowStatus} variant="small" />
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoItem icon={<User size={16} />} label="Creator" value={creator?.name || '—'} />
          <InfoItem icon={<Hash size={16} />} label="Hashtag" value={campaign.requiredHashtag} />
          <InfoItem icon={<Calendar size={16} />} label="Deadline" value={campaign.deadline} />
          <InfoItem icon={<Clock size={16} />} label="Min Live" value={campaign.minLiveDuration} />
          <InfoItem icon={<Wallet size={16} />} label="Budget" value={formatINR(campaign.budget)} />
          <InfoItem icon={<Lock size={16} />} label="Locked" value={formatINR(campaign.lockedAmount)} />
          <InfoItem icon={<TrendingUp size={16} />} label="Released" value={formatINR(campaign.releasedAmount)} />
          <InfoItem icon={<FileCheck size={16} />} label="Verified" value={`${campaign.verifiedCount}/${campaign.deliverableCount}`} />
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-neutral-700">Campaign Progress</span>
            <span className="font-medium text-neutral-600">{progress}%</span>
          </div>
          <ProgressBar value={progress} color={progress === 100 ? 'bg-success-500' : 'bg-primary-600'} />
        </div>

        {/* Milestones */}
        <div>
          <h4 className="font-semibold text-neutral-900 mb-3">Milestones</h4>
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

        {/* Deliverables */}
        <div>
          <h4 className="font-semibold text-neutral-900 mb-3">Deliverables</h4>
          <div className="space-y-2">
            {deliverables.length === 0 ? (
              <p className="text-sm text-neutral-500">No deliverables yet.</p>
            ) : deliverables.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-lg border border-neutral-200">
                <div>
                  <div className="text-sm font-medium text-neutral-900">{d.name}</div>
                  <div className="text-xs text-neutral-500">Due: {d.dueDate} · Submitted: {d.submissionDate || '—'}</div>
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={d.verificationStatus} variant="small" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Escrow + Payouts */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Escrow Transactions</h4>
            <div className="space-y-2">
              {escrowTxns.map((e) => (
                <div key={e.id} className="p-3 rounded-lg border border-neutral-200 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-neutral-900">{formatINR(e.amount)}</span>
                    <StatusBadge status={e.status} variant="small" />
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">{e.txnId} · {e.createdAt}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Payouts</h4>
            <div className="space-y-2">
              {payouts.length === 0 ? <p className="text-sm text-neutral-500">No payouts yet.</p> : payouts.map((p) => (
                <div key={p.id} className="p-3 rounded-lg border border-neutral-200 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-neutral-900">{formatINR(p.amount)}</span>
                    <StatusBadge status={p.status} variant="small" />
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">{p.txnId || 'Pending'} · {p.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disputes */}
        {disputes.length > 0 && (
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Disputes</h4>
            <div className="space-y-2">
              {disputes.map((d) => (
                <div key={d.id} className="p-3 rounded-lg border border-error-200 bg-error-50 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-neutral-900">{d.reason}</span>
                    <StatusBadge status={d.status} variant="small" />
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">{d.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity timeline */}
        <div>
          <h4 className="font-semibold text-neutral-900 mb-3">Activity Timeline</h4>
          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-medium text-neutral-900">{log.action}</span>
                  <span className="text-neutral-500"> — {log.prevState} → {log.newState}</span>
                  <div className="text-xs text-neutral-400">{log.timestamp} · {log.actor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-neutral-200">
      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
        {icon} {label}
      </div>
      <div className="text-sm font-medium text-neutral-900">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

import ToastContainer from '@/components/Toast';

export default BrandCampaigns;
