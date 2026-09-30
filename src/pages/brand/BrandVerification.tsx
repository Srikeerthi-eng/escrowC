import { useState } from 'react';
import { useAppStore, genId, type Deliverable } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import ToastContainer, { useToastState } from '@/components/Toast';
import { ShieldCheck, CheckCircle2, XCircle, Clock, Eye, AlertTriangle } from 'lucide-react';

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

const statusFilters = ['All', 'Pending Verification', 'Verified', 'Rejected'] as const;

function BrandVerification() {
  const store = useAppStore();
  const { toasts, show, dismiss } = useToastState();
  const [filter, setFilter] = useState<typeof statusFilters[number]>('All');
  const [selected, setSelected] = useState<Deliverable | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectModal, setRejectModal] = useState(false);

  const submitted = store.deliverables.filter((d) => d.status === 'Submitted' || d.verificationStatus === 'Pending Verification' || d.verificationStatus === 'Verified' || d.verificationStatus === 'Rejected');
  const filtered = submitted.filter((d) => filter === 'All' || d.verificationStatus === filter);

  const getCreator = (id: string) => store.creators.find((c) => c.id === id);
  const getCampaign = (id: string) => store.campaigns.find((c) => c.id === id);
  const getMilestone = (campaignId: string, milestoneId: string) => getCampaign(campaignId)?.milestones.find((m) => m.id === milestoneId);

  const handleApprove = (d: Deliverable) => {
    useAppStore.setState((prev) => {
      const campaigns = prev.campaigns.map((c) => {
        if (c.id !== d.campaignId) return c;
        const milestones = c.milestones.map((m) =>
          m.id === d.milestoneId ? { ...m, status: 'ELIGIBLE' as const } : m
        );
        return { ...c, milestones, verifiedCount: c.verifiedCount + 1 };
      });

      const deliverables = prev.deliverables.map((dl) =>
        dl.id === d.id
          ? {
              ...dl,
              status: 'Verified' as const,
              verificationStatus: 'Verified' as const,
              checks: dl.checks.map((chk) => ({ ...chk, passed: true })),
            }
          : dl
      );

      const payouts = prev.payouts.map((p) =>
        p.milestoneId === d.milestoneId
          ? { ...p, verificationStatus: 'Verified' as const, status: 'Eligible' as const }
          : p
      );

      const lastHash = prev.auditLogs[prev.auditLogs.length - 1]?.hash || '00000000';
      const auditLogs = [...prev.auditLogs, {
        id: genId('a'),
        timestamp: new Date().toLocaleString('en-IN'),
        actor: 'Nike', role: 'BRAND' as const,
        action: 'Deliverable Verified',
        campaign: getCampaign(d.campaignId)?.name || '—',
        entity: 'Deliverable',
        prevState: 'Submitted',
        newState: 'Verified',
        refId: d.id,
        hash: genId('h'),
        prevHash: lastHash,
      }];

      return { ...prev, campaigns, deliverables, payouts, auditLogs };
    });
    show('Verification complete. Deliverable verified and milestone marked eligible.', 'success');
    setSelected(null);
  };

  const handleReject = () => {
    if (!selected || !rejectReason.trim()) return;
    const d = selected;
    useAppStore.setState((prev) => {
      const deliverables = prev.deliverables.map((dl) =>
        dl.id === d.id
          ? { ...dl, status: 'Rejected' as const, verificationStatus: 'Rejected' as const, rejectionReason: rejectReason }
          : dl
      );

      const lastHash = prev.auditLogs[prev.auditLogs.length - 1]?.hash || '00000000';
      const auditLogs = [...prev.auditLogs, {
        id: genId('a'),
        timestamp: new Date().toLocaleString('en-IN'),
        actor: 'Nike', role: 'BRAND' as const,
        action: 'Verification Failed',
        campaign: getCampaign(d.campaignId)?.name || '—',
        entity: 'Deliverable',
        prevState: 'Submitted',
        newState: 'Rejected',
        refId: d.id,
        hash: genId('h'),
        prevHash: lastHash,
      }];

      return { ...prev, deliverables, auditLogs };
    });
    show('Verification failed. Deliverable rejected.', 'error');
    setRejectModal(false);
    setRejectReason('');
    setSelected(null);
  };

  return (
    <div>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Verification</h1>
        <p className="text-neutral-500 mt-1">Review submitted deliverables and run verification checks.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto mb-6">
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

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200">
          <EmptyState icon={<ShieldCheck size={28} />} title="No deliverables to verify" description="Submitted deliverables will appear here for verification." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((d) => {
            const campaign = getCampaign(d.campaignId);
            const creator = getCreator(d.creatorId);
            const milestone = getMilestone(d.campaignId, d.milestoneId);
            return (
              <div key={d.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-neutral-900">{d.name}</h3>
                    <p className="text-sm text-neutral-500 mt-0.5">{campaign?.name} · {creator?.name}</p>
                  </div>
                  <StatusBadge status={d.verificationStatus} variant="small" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <div className="text-xs text-neutral-400">Submitted</div>
                    <div className="font-medium text-neutral-900">{d.submissionDate || '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Milestone</div>
                    <div className="font-medium text-neutral-900">{milestone?.title || '—'}</div>
                  </div>
                </div>
                {/* Mini checks preview */}
                <div className="space-y-1.5 mb-4">
                  {d.checks.slice(0, 3).map((chk) => (
                    <div key={chk.id} className="flex items-center gap-2 text-xs">
                      {chk.passed === true ? <CheckCircle2 size={14} className="text-success-600" /> :
                       chk.passed === false ? <XCircle size={14} className="text-error-600" /> :
                       <Clock size={14} className="text-neutral-400" />}
                      <span className="text-neutral-600">{chk.label}</span>
                    </div>
                  ))}
                  {d.checks.length > 3 && <div className="text-xs text-neutral-400 pl-5">+{d.checks.length - 3} more checks</div>}
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setSelected(d)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50">
                    <Eye size={14} /> View Details
                  </button>
                  {d.verificationStatus === 'Pending Verification' && (
                    <>
                      <button onClick={() => { setSelected(d); setRejectModal(true); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-error-700 border border-error-200 hover:bg-error-50">
                        <XCircle size={14} /> Reject
                      </button>
                      <button onClick={() => handleApprove(d)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-success-600 hover:bg-success-700">
                        <CheckCircle2 size={14} /> Approve & Verify
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Verification Details Modal */}
      {selected && !rejectModal && (
        <Modal open onClose={() => setSelected(null)} title="Verification Details" size="lg">
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <InfoBox label="Deliverable" value={selected.name} />
              <InfoBox label="Campaign" value={getCampaign(selected.campaignId)?.name || '—'} />
              <InfoBox label="Creator" value={getCreator(selected.creatorId)?.name || '—'} />
              <InfoBox label="Submitted" value={selected.submissionDate || '—'} />
              <InfoBox label="Platform" value={selected.platform} />
              <InfoBox label="Milestone Amount" value={formatINR(getMilestone(selected.campaignId, selected.milestoneId)?.amount || 0)} />
            </div>

            <div className="flex gap-2">
              <StatusBadge status={selected.status} />
              <StatusBadge status={selected.verificationStatus} />
            </div>

            {selected.caption && (
              <div className="p-3 rounded-lg border border-neutral-200">
                <div className="text-xs text-neutral-400 mb-1">Caption</div>
                <div className="text-sm text-neutral-700">{selected.caption}</div>
              </div>
            )}

            {selected.postUrl && (
              <div className="p-3 rounded-lg border border-neutral-200">
                <div className="text-xs text-neutral-400 mb-1">Post URL</div>
                <a href={selected.postUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline">{selected.postUrl}</a>
              </div>
            )}

            {selected.rejectionReason && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-error-50 border border-error-200 text-sm text-error-700">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <div><strong>Rejection Reason:</strong> {selected.rejectionReason}</div>
              </div>
            )}

            {/* Verification checks */}
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-3">Verification Checks</h4>
              <div className="space-y-2">
                {selected.checks.map((chk) => (
                  <div key={chk.id} className="flex items-center justify-between p-3 rounded-lg border border-neutral-200">
                    <span className="text-sm text-neutral-700">{chk.label}</span>
                    {chk.passed === true ? (
                      <span className="flex items-center gap-1.5 text-sm text-success-600 font-medium"><CheckCircle2 size={18} /> PASS</span>
                    ) : chk.passed === false ? (
                      <span className="flex items-center gap-1.5 text-sm text-error-600 font-medium"><XCircle size={18} /> FAIL</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm text-neutral-400 font-medium"><Clock size={18} /> PENDING</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-neutral-400 italic">
              Note: Verification results are simulated for demo purposes. No real AI or social media API verification is performed.
            </div>

            {selected.verificationStatus === 'Pending Verification' && (
              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-200">
                <button onClick={() => setRejectModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-error-700 border border-error-200 hover:bg-error-50">
                  <XCircle size={16} /> Reject
                </button>
                <button onClick={() => handleApprove(selected)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-success-600 hover:bg-success-700">
                  <CheckCircle2 size={16} /> Approve & Verify
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Reject Modal */}
      <Modal
        open={rejectModal}
        onClose={() => { setRejectModal(false); setRejectReason(''); }}
        title="Reject Verification"
        size="sm"
        footer={
          <>
            <button onClick={() => { setRejectModal(false); setRejectReason(''); }} className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50">Cancel</button>
            <button onClick={handleReject} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-error-600 hover:bg-error-700">Confirm Rejection</button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-sm text-neutral-600">Provide a reason for rejecting <strong>{selected?.name}</strong>.</p>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={3}
            placeholder="e.g. Required hashtag #NikePartner was not detected in the caption..."
            className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-error-500"
          />
        </div>
      </Modal>
    </div>
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

export default BrandVerification;
