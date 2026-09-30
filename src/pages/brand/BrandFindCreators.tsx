import { useState } from 'react';
import { useAppStore, genId, type Creator } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import ToastContainer, { useToastState } from '@/components/Toast';
import { Search, Star, Eye, Send, MapPin, Users, Eye as EyeIcon, TrendingUp, CheckCircle2 } from 'lucide-react';

function formatFollowers(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return Math.round(n / 1000) + 'K';
  return String(n);
}

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

const categories = ['All', 'Fashion', 'Technology', 'Lifestyle', 'Fitness', 'Beauty', 'Food'];
const followerRanges = ['All', '50K+', '100K+', '200K+'];
const engagementRanges = ['All', '4%+', '5%+', '6%+'];

function BrandFindCreators() {
  const store = useAppStore();
  const { toasts, show, dismiss } = useToastState();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [followerFilter, setFollowerFilter] = useState('All');
  const [engagementFilter, setEngagementFilter] = useState('All');
  const [profileCreator, setProfileCreator] = useState<Creator | null>(null);
  const [inviteCreator, setInviteCreator] = useState<Creator | null>(null);

  const filtered = store.creators.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.username.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === 'All' || c.category === catFilter;
    const matchesFollowers = followerFilter === 'All' ||
      (followerFilter === '50K+' && c.followers >= 50000) ||
      (followerFilter === '100K+' && c.followers >= 100000) ||
      (followerFilter === '200K+' && c.followers >= 200000);
    const matchesEng = engagementFilter === 'All' ||
      (engagementFilter === '4%+' && c.engagementRate >= 4) ||
      (engagementFilter === '5%+' && c.engagementRate >= 5) ||
      (engagementFilter === '6%+' && c.engagementRate >= 6);
    return matchesSearch && matchesCat && matchesFollowers && matchesEng;
  });

  return (
    <div>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Find Creators</h1>
        <p className="text-neutral-500 mt-1">Discover and invite creators to your campaigns.</p>
      </div>

      {/* Search + Filters */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterDropdown label="Category" value={catFilter} options={categories} onChange={setCatFilter} />
          <FilterDropdown label="Followers" value={followerFilter} options={followerRanges} onChange={setFollowerFilter} />
          <FilterDropdown label="Engagement" value={engagementFilter} options={engagementRanges} onChange={setEngagementFilter} />
        </div>
      </div>

      {/* Creator cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200">
          <EmptyState icon={<Users size={28} />} title="No creators found" description="Try adjusting your search or filters." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-lg shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900 truncate">{c.name}</h3>
                  <p className="text-sm text-neutral-500">{c.username}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={12} className="text-warning-500 fill-warning-500" />
                    <span className="text-xs font-medium text-neutral-600">{c.rating}</span>
                    <span className="text-xs text-neutral-400">· {c.category}</span>
                  </div>
                </div>
                <StatusBadge status={c.availability} variant="small" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                <div>
                  <div className="text-xs text-neutral-400">Followers</div>
                  <div className="font-medium text-neutral-900">{formatFollowers(c.followers)}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Engagement</div>
                  <div className="font-medium text-neutral-900">{c.engagementRate}%</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Avg Views</div>
                  <div className="font-medium text-neutral-900">{formatFollowers(c.avgViews)}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-500 mb-4">
                <MapPin size={12} /> {c.location}
                <span className="mx-1">·</span>
                <TrendingUp size={12} /> {c.completedCampaigns} campaigns
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-neutral-400">Est. Cost</div>
                <div className="text-sm font-semibold text-neutral-900">{formatINR(c.estimatedCost)}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setProfileCreator(c)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
                >
                  <Eye size={14} /> View Profile
                </button>
                <button
                  onClick={() => setInviteCreator(c)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  <Send size={14} /> Invite
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Modal */}
      {profileCreator && (
        <CreatorProfileModal creator={profileCreator} onClose={() => setProfileCreator(null)} onInvite={() => { setInviteCreator(profileCreator); setProfileCreator(null); }} />
      )}

      {/* Invite Modal */}
      {inviteCreator && (
        <InviteModal creator={inviteCreator} onClose={() => setInviteCreator(null)} onSent={() => show(`Invitation sent to ${inviteCreator.name}.`, 'success')} />
      )}
    </div>
  );
}

// ─── Filter Dropdown ─────────────────────────────────────

function FilterDropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-neutral-400">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Creator Profile Modal ───────────────────────────────

function CreatorProfileModal({ creator, onClose, onInvite }: { creator: Creator; onClose: () => void; onInvite: () => void }) {
  return (
    <Modal open onClose={onClose} title="Creator Profile" size="lg" footer={
      <button onClick={onInvite} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
        <Send size={16} /> Invite to Campaign
      </button>
    }>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-2xl shrink-0">
            {creator.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-neutral-900">{creator.name}</h2>
            <p className="text-sm text-neutral-500">{creator.username}</p>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={creator.availability} variant="small" />
              <span className="text-xs text-neutral-400">{creator.category}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-600">{creator.bio}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatBox label="Followers" value={formatFollowers(creator.followers)} />
          <StatBox label="Engagement" value={creator.engagementRate + '%'} />
          <StatBox label="Avg Views" value={formatFollowers(creator.avgViews)} />
          <StatBox label="Rating" value={creator.rating + ' / 5'} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-2">Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {creator.platforms.map((p) => (
                <span key={p} className="px-2.5 py-1 rounded-lg bg-neutral-100 text-xs font-medium text-neutral-700">{p}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {creator.languages.map((l) => (
                <span key={l} className="px-2.5 py-1 rounded-lg bg-neutral-100 text-xs font-medium text-neutral-700">{l}</span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-neutral-900 mb-2">Content Types</h4>
          <div className="flex flex-wrap gap-2">
            {creator.contentTypes.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-medium border border-primary-100">{t}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-neutral-200">
          <div>
            <div className="text-xs text-neutral-400">Location</div>
            <div className="text-sm font-medium text-neutral-900">{creator.location}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400">Est. Campaign Cost</div>
            <div className="text-sm font-medium text-neutral-900">{formatINR(creator.estimatedCost)}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400">Completed Campaigns</div>
            <div className="text-sm font-medium text-neutral-900">{creator.completedCampaigns}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-neutral-200 text-center">
      <div className="text-lg font-bold text-neutral-900">{value}</div>
      <div className="text-xs text-neutral-400 mt-0.5">{label}</div>
    </div>
  );
}

// ─── Invite Modal ────────────────────────────────────────

function InviteModal({ creator, onClose, onSent }: { creator: Creator; onClose: () => void; onSent: () => void }) {
  const store = useAppStore();
  const [campaignId, setCampaignId] = useState('');
  const [amount, setAmount] = useState(String(creator.estimatedCost));
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!campaignId) return;
    useAppStore.setState((prev) => ({
      ...prev,
      invitations: [...prev.invitations, {
        id: genId('inv'),
        campaignId,
        creatorId: creator.id,
        proposedAmount: parseInt(amount) || 0,
        message,
        status: 'Sent',
        date: new Date().toISOString().split('T')[0],
      }],
      auditLogs: [...prev.auditLogs, {
        id: genId('a'),
        timestamp: new Date().toLocaleString('en-IN'),
        actor: 'Nike', role: 'BRAND',
        action: 'Creator Invited',
        campaign: store.campaigns.find((c) => c.id === campaignId)?.name || '—',
        entity: 'Invitation',
        prevState: '—', newState: 'Sent',
        refId: 'INV-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
        hash: genId('h'), prevHash: prev.auditLogs[prev.auditLogs.length - 1]?.hash || '00000000',
      }],
    }));
    onSent();
    onClose();
  };

  return (
    <Modal open onClose={onClose} title={`Invite ${creator.name}`} size="md" footer={
      <>
        <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50">Cancel</button>
        <button onClick={handleSend} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
          <Send size={16} /> Send Invitation
        </button>
      </>
    }>
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50">
          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold">
            {creator.avatar}
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-900">{creator.name}</div>
            <div className="text-xs text-neutral-500">{creator.username} · {creator.category}</div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Select Campaign</label>
          <select value={campaignId} onChange={(e) => setCampaignId(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="">Select a campaign...</option>
            {store.campaigns.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Proposed Amount (₹)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="We'd love to collaborate with you on this campaign..." className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
      </div>
    </Modal>
  );
}

export default BrandFindCreators;
