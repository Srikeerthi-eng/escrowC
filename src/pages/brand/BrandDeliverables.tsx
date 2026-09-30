import { useState } from 'react';
import { useAppStore, genId, type Deliverable } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import ToastContainer, { useToastState } from '@/components/Toast';
import { FileCheck, Eye, CheckCircle2, XCircle, Clock, Hash, Link as LinkIcon, Calendar } from 'lucide-react';

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

const statusFilters = ['All', 'Pending', 'Submitted', 'Under Review', 'Verified', 'Rejected'] as const;

function BrandDeliverables() {
  const store = useAppStore();
  const { toasts, show, dismiss } = useToastState();
  const [filter, setFilter] = useState<typeof statusFilters[number]>('All');
  const [selected, setSelected] = useState<Deliverable | null>(null);
  const [rejectDeliverable, setRejectDeliverable] = useState<Deliverable | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filtered = store.deliverables.filter((d) => filter === 'All' || d.status === filter);

  const getCreator = (id: string) => store.creators.find((c) => c.id === id);
  const getCampaign = (id: string) => store.campaigns.find((c) => c.id === id);

  const handleApprove = (d: Deliverable) => {
    useAppStore.setState((prev) => {
      const campaigns = prev.campaigns.map((c) => {
        if (c.id !== d.campaignId) return c;
        const milestones = c.milestones.map((m) =>
          m.id === d.milestoneId ? { ...m, status: 'ELIGIBLE' as const } : m
        );
        return {
          ...c,
          milestones,
          verifiedCount: c.verifiedCount + 1,
        };
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
        prevState: d.status,
        newState: 'Verified',
        refId: d.id,
        hash: genId('h'),
        prevHash: lastHash,
      }];

      return { ...prev, campaigns, deliverables, payouts, auditLogs };
    });
    show('Deliverable verified successfully. Milestone is now eligible for payout.', 'success');
    setSelected(null);
  };

  const handleReject = () => {
    if (!rejectDeliverable || !rejectReason.trim()) return;
    const d = rejectDeliverable;
    useAppStore.setState((prev) => {
      const deliverables = prev.deliverables.map((dl) =>
        dl.id === d.id
          ? {
              ...dl,
              status: 'Rejected' as const,
              verificationStatus: 'Rejected' as const,
              rejectionReason: rejectReason,
            }
          : dl
      );

      const lastHash = prev.auditLogs[prev.auditLogs.length - 1]?.hash || '00000000';
      const auditLogs = [...prev.auditLogs, {
        id: genId('a'),
        timestamp: new Date().toLocaleString('en-IN'),
        actor: 'Nike', role: 'BRAND' as const,
        action: 'Deliverable Rejected',
        campaign: getCampaign(d.campaignId)?.name || '—',
        entity: 'Deliverable',
        prevState: d.status,
        newState: 'Rejected',
        refId: d.id,
        hash: genId('h'),
        prevHash: lastHash,
      }];

      return { ...prev, deliverables, auditLogs };
    });
    show('Deliverable rejected.', 'error');
    setRejectDeliverable(null);
    setRejectReason('');
    setSelected(null);
  };

  return (
    <div>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Deliverables</h1>
        <p className="text-neutral-500 mt-1">Review submitted deliverables and approve or reject them.</p>
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

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200">
          <EmptyState icon={<FileCheck size={28} />} title="No deliverables found" description="Deliverables will appear here once creators submit them." />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 text-neutral-500 text-left">
                  <th className="px-6 py-3 font-medium">Deliverable</th>
                  <th className="px-6 py-3 font-medium">Campaign</th>
                  <th className="px-6 py-3 font-medium">Creator</th>
                  <th className="px-6 py-3 font-medium">Due Date</th>
                  <th className="px-6 py-3 font-medium">Submitted</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Verification</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((d) => {
                  const creator = getCreator(d.creatorId);
                  const campaign = getCampaign(d.campaignId);
                  return (
                    <tr key={d.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 font-medium text-neutral-900">{d.name}</td>
                      <td className="px-6 py-4 text-neutral-600">{campaign?.name || '—'}</td>
                      <td className="px-6 py-4 text-neutral-600">{creator?.name || '—'}</td>
                      <td className="px-6 py-4 text-neutral-500">{d.dueDate}</td>
                      <td className="px-6 py-4 text-neutral-500">{d.submissionDate || '—'}</td>
                      <td className="px-6 py-4"><StatusBadge status={d.status} variant="small" /></td>
                      <td className="px-6 py-4"><StatusBadge status={d.verificationStatus} variant="small" /></td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setSelected(d)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50">
                            <Eye size={14} className="inline mr-1" /> View
                          </button>
                          {d.status === 'Submitted' && (
                            <>
                              <button onClick={() => handleApprove(d)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-success-700 border border-success-200 hover:bg-success-50">
                                <CheckCircle2 size={14} className="inline mr-1" /> Approve
                              </button>
                              <button onClick={() => setRejectDeliverable(d)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-error-700 border border-error-200 hover:bg-error-50">
                                <XCircle size={14} className="inline mr-1" /> Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Deliverable Details Modal */}
      {selected && (
        <Modal open onClose={() => setSelected(null)} title="Deliverable Details" size="lg">
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <InfoBox label="Deliverable" value={selected.name} />
              <InfoBox label="Campaign" value={getCampaign(selected.campaignId)?.name || '—'} />
              <InfoBox label="Creator" value={getCreator(selected.creatorId)?.name || '—'} />
              <InfoBox label="Due Date" value={selected.dueDate} />
              <InfoBox label="Submitted" value={selected.submissionDate || 'Not submitted'} />
              <InfoBox label="Platform" value={selected.platform} />
            </div>

            <div className="flex gap-2">
              <StatusBadge status={selected.status} />
              <StatusBadge status={selected.verificationStatus} />
            </div>

            {selected.postUrl && (
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 mb-2">Submission Details</h4>
                <div className="p-3 rounded-lg border border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <LinkIcon size={14} /> <a href={selected.postUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{selected.postUrl}</a>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-neutral-600">
                    <Hash size={14} className="mt-0.5" /> <span>{selected.caption}</span>
                  </div>
                </div>
              </div>
            )}

            {selected.rejectionReason && (
              <div className="p-3 rounded-lg bg-error-50 border border-error-200 text-sm text-error-700">
                <strong>Rejection Reason:</strong> {selected.rejectionReason}
              </div>
            )}

            {/* Verification checks */}
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-3">Verification Checks</h4>
              <div className="space-y-2">
                {selected.checks.map((chk) => (
                  <div key={chk.id} className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200">
                    <span className="text-sm text-neutral-700">{chk.label}</span>
                    {chk.passed === true ? (
                      <span className="flex items-center gap-1 text-sm text-success-600 font-medium"><CheckCircle2 size={16} /> PASS</span>
                    ) : chk.passed === false ? (
                      <span className="flex items-center gap-1 text-sm text-error-600 font-medium"><XCircle size={16} /> FAIL</span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-neutral-400 font-medium"><Clock size={16} /> PENDING</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            {selected.status === 'Submitted' && (
              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-200">
                <button onClick={() => setRejectDeliverable(selected)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-error-700 border border-error-200 hover:bg-error-50">
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
        open={!!rejectDeliverable}
        onClose={() => setRejectDeliverable(null)}
        title="Reject Deliverable"
        size="sm"
        footer={
          <>
            <button onClick={() => setRejectDeliverable(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50">Cancel</button>
            <button onClick={handleReject} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-error-600 hover:bg-error-700">Confirm Rejection</button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-sm text-neutral-600">Provide a reason for rejecting <strong>{rejectDeliverable?.name}</strong>.</p>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={3}
            placeholder="e.g. Required hashtag #NikePartner was not detected..."
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

export default BrandDeliverables;
