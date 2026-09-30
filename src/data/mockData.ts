import { create } from './store-utils';

// ─── Types ──────────────────────────────────────────────

export type Creator = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  category: string;
  followers: number;
  engagementRate: number;
  location: string;
  avgViews: number;
  rating: number;
  availability: 'Available' | 'Busy' | 'Open to work';
  estimatedCost: number;
  platforms: string[];
  bio: string;
  languages: string[];
  contentTypes: string[];
  completedCampaigns: number;
};

export type Milestone = {
  id: string;
  index: number;
  title: string;
  amount: number;
  status: 'PENDING' | 'ELIGIBLE' | 'RELEASED' | 'LOCKED' | 'DISPUTED';
  deliverableId: string | null;
};

export type Campaign = {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  platform: string;
  budget: number;
  lockedAmount: number;
  releasedAmount: number;
  deliverableCount: number;
  verifiedCount: number;
  deadline: string;
  requiredHashtag: string;
  minLiveDuration: string;
  category: string;
  status: 'Draft' | 'Active' | 'Completed' | 'Disputed';
  escrowStatus: 'LOCKED' | 'PARTIALLY_RELEASED' | 'RELEASED' | 'PENDING';
  escrowTxnId: string | null;
  milestones: Milestone[];
  createdAt: string;
  requirements: string[];
};

export type Deliverable = {
  id: string;
  campaignId: string;
  creatorId: string;
  name: string;
  milestoneId: string;
  dueDate: string;
  submissionDate: string | null;
  postUrl: string | null;
  platform: string;
  caption: string | null;
  status: 'Pending' | 'Submitted' | 'Under Review' | 'Verified' | 'Rejected';
  verificationStatus: 'Pending Verification' | 'Verified' | 'Rejected';
  rejectionReason: string | null;
  checks: {
    id: string;
    label: string;
    passed: boolean | null;
  }[];
};

export type EscrowTransaction = {
  id: string;
  campaignId: string;
  creatorId: string;
  amount: number;
  milestoneId: string | null;
  type: 'LOCK' | 'RELEASE' | 'DISPUTE_HOLD';
  status: 'Pending' | 'Locked' | 'Verification Pending' | 'Released' | 'Disputed';
  createdAt: string;
  updatedAt: string;
  txnId: string;
};

export type Payout = {
  id: string;
  campaignId: string;
  creatorId: string;
  milestoneId: string;
  amount: number;
  verificationStatus: 'Pending Verification' | 'Verified' | 'Rejected';
  status: 'Pending' | 'Eligible' | 'Processing' | 'Released' | 'Failed' | 'Disputed';
  date: string;
  txnId: string | null;
};

export type Dispute = {
  id: string;
  campaignId: string;
  creatorId: string;
  deliverableId: string;
  milestoneId: string;
  amount: number;
  reason: string;
  description: string;
  raisedBy: 'Brand' | 'Creator';
  date: string;
  status: 'Open' | 'Under Review' | 'Resolved';
  timeline: {
    id: string;
    timestamp: string;
    event: string;
    actor: string;
  }[];
};

export type AuditLog = {
  id: string;
  timestamp: string;
  actor: string;
  role: 'BRAND' | 'CREATOR' | 'SYSTEM';
  action: string;
  campaign: string;
  entity: string;
  prevState: string;
  newState: string;
  refId: string;
  hash: string;
  prevHash: string;
};

export type Invitation = {
  id: string;
  campaignId: string;
  creatorId: string;
  proposedAmount: number;
  message: string;
  status: 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
  date: string;
};

// ─── Mock Data ───────────────────────────────────────────

export const creators: Creator[] = [
  {
    id: 'c1',
    name: 'Aisha Rao',
    username: '@aisharao',
    avatar: 'AR',
    category: 'Fashion',
    followers: 125000,
    engagementRate: 4.8,
    location: 'Mumbai, India',
    avgViews: 85000,
    rating: 4.7,
    availability: 'Available',
    estimatedCost: 30000,
    platforms: ['Instagram', 'YouTube'],
    bio: 'Fashion and lifestyle content creator. Creating authentic brand stories through reels and stories.',
    languages: ['English', 'Hindi', 'Marathi'],
    contentTypes: ['Instagram Reels', 'Product Reviews', 'Lifestyle Videos'],
    completedCampaigns: 12,
  },
  {
    id: 'c2',
    name: 'Rahul Mehta',
    username: '@rahulmehta',
    avatar: 'RM',
    category: 'Technology',
    followers: 87000,
    engagementRate: 5.2,
    location: 'Bangalore, India',
    avgViews: 120000,
    rating: 4.9,
    availability: 'Open to work',
    estimatedCost: 25000,
    platforms: ['YouTube', 'Instagram'],
    bio: 'Tech reviewer and gadget enthusiast. Helping people make informed tech purchase decisions.',
    languages: ['English', 'Hindi', 'Kannada'],
    contentTypes: ['Tech Reviews', 'Unboxing Videos', 'Comparison Videos'],
    completedCampaigns: 18,
  },
  {
    id: 'c3',
    name: 'Sneha Kapoor',
    username: '@snehakapoor',
    avatar: 'SK',
    category: 'Lifestyle',
    followers: 210000,
    engagementRate: 3.9,
    location: 'Delhi, India',
    avgViews: 150000,
    rating: 4.5,
    availability: 'Busy',
    estimatedCost: 45000,
    platforms: ['Instagram', 'YouTube', 'TikTok'],
    bio: 'Lifestyle creator sharing daily routines, travel diaries, and wellness tips.',
    languages: ['English', 'Hindi'],
    contentTypes: ['Vlogs', 'Travel Diaries', 'Wellness Tips'],
    completedCampaigns: 25,
  },
  {
    id: 'c4',
    name: 'Arjun Kumar',
    username: '@arjunkumar',
    avatar: 'AK',
    category: 'Fitness',
    followers: 96000,
    engagementRate: 6.1,
    location: 'Hyderabad, India',
    avgViews: 70000,
    rating: 4.8,
    availability: 'Available',
    estimatedCost: 20000,
    platforms: ['Instagram', 'YouTube'],
    bio: 'Fitness coach and content creator. Sharing workout routines, nutrition tips, and transformation stories.',
    languages: ['English', 'Telugu', 'Hindi'],
    contentTypes: ['Workout Videos', 'Nutrition Tips', 'Transformation Stories'],
    completedCampaigns: 15,
  },
  {
    id: 'c5',
    name: 'Priya Sharma',
    username: '@priyasharma',
    avatar: 'PS',
    category: 'Beauty',
    followers: 175000,
    engagementRate: 4.5,
    location: 'Pune, India',
    avgViews: 95000,
    rating: 4.6,
    availability: 'Open to work',
    estimatedCost: 35000,
    platforms: ['Instagram', 'YouTube'],
    bio: 'Beauty and skincare creator. Reviewing products and sharing makeup tutorials.',
    languages: ['English', 'Hindi', 'Marathi'],
    contentTypes: ['Makeup Tutorials', 'Product Reviews', 'Skincare Routines'],
    completedCampaigns: 20,
  },
  {
    id: 'c6',
    name: 'Vikram Singh',
    username: '@vikramsingh',
    avatar: 'VS',
    category: 'Food',
    followers: 140000,
    engagementRate: 5.5,
    location: 'Jaipur, India',
    avgViews: 110000,
    rating: 4.7,
    availability: 'Available',
    estimatedCost: 28000,
    platforms: ['Instagram', 'YouTube'],
    bio: 'Food blogger and recipe creator. Exploring cuisines and sharing easy recipes.',
    languages: ['English', 'Hindi'],
    contentTypes: ['Recipe Videos', 'Restaurant Reviews', 'Food Photography'],
    completedCampaigns: 16,
  },
];

function genId(prefix: string): string {
  return prefix + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Nike Summer Campaign',
    description: 'Summer fitness reel campaign promoting Nike activewear collection.',
    creatorId: 'c1',
    platform: 'Instagram',
    budget: 30000,
    lockedAmount: 20000,
    releasedAmount: 10000,
    deliverableCount: 3,
    verifiedCount: 1,
    deadline: '2026-10-15',
    requiredHashtag: '#NikePartner',
    minLiveDuration: '48 hours',
    category: 'Fashion / Sports',
    status: 'Active',
    escrowStatus: 'PARTIALLY_RELEASED',
    escrowTxnId: 'MOCK-ESCROW-8F32A1',
    createdAt: '2026-09-20',
    requirements: ['Instagram Reel', '#NikePartner hashtag', 'Published before deadline', 'Remain live for 48 hours', 'Original content'],
    milestones: [
      { id: 'm1', index: 1, title: 'Content Draft', amount: 10000, status: 'RELEASED', deliverableId: 'd1' },
      { id: 'm2', index: 2, title: 'Final Content', amount: 10000, status: 'LOCKED', deliverableId: 'd2' },
      { id: 'm3', index: 3, title: 'Campaign Completion', amount: 10000, status: 'PENDING', deliverableId: 'd3' },
    ],
  },
  {
    id: 'camp-002',
    name: 'Adidas Fitness Campaign',
    description: 'Fitness workout reels promoting Adidas training gear.',
    creatorId: 'c4',
    platform: 'Instagram',
    budget: 20000,
    lockedAmount: 20000,
    releasedAmount: 0,
    deliverableCount: 2,
    verifiedCount: 0,
    deadline: '2026-10-20',
    requiredHashtag: '#AdidasFit',
    minLiveDuration: '24 hours',
    category: 'Fitness',
    status: 'Active',
    escrowStatus: 'LOCKED',
    escrowTxnId: 'MOCK-ESCROW-2B91CD',
    createdAt: '2026-09-25',
    requirements: ['Instagram Reel', '#AdidasFit hashtag', 'Workout demonstration', 'Remain live for 24 hours'],
    milestones: [
      { id: 'm4', index: 1, title: 'Workout Reel 1', amount: 10000, status: 'LOCKED', deliverableId: 'd4' },
      { id: 'm5', index: 2, title: 'Workout Reel 2', amount: 10000, status: 'PENDING', deliverableId: 'd5' },
    ],
  },
  {
    id: 'camp-003',
    name: 'Tech Product Launch',
    description: 'Product review and unboxing campaign for Samsung Galaxy launch.',
    creatorId: 'c2',
    platform: 'YouTube',
    budget: 40000,
    lockedAmount: 0,
    releasedAmount: 40000,
    deliverableCount: 4,
    verifiedCount: 4,
    deadline: '2026-10-01',
    requiredHashtag: '#SamsungCreator',
    minLiveDuration: '72 hours',
    category: 'Technology',
    status: 'Completed',
    escrowStatus: 'RELEASED',
    escrowTxnId: 'MOCK-ESCROW-5E7FG2',
    createdAt: '2026-08-15',
    requirements: ['YouTube Video', '#SamsungCreator hashtag', 'Minimum 5 min duration', 'Product unboxing', 'Detailed review'],
    milestones: [
      { id: 'm6', index: 1, title: 'Unboxing Video', amount: 10000, status: 'RELEASED', deliverableId: 'd6' },
      { id: 'm7', index: 2, title: 'Review Video', amount: 10000, status: 'RELEASED', deliverableId: 'd7' },
      { id: 'm8', index: 3, title: 'Comparison Video', amount: 10000, status: 'RELEASED', deliverableId: 'd8' },
      { id: 'm9', index: 4, title: 'Final Verdict', amount: 10000, status: 'RELEASED', deliverableId: 'd9' },
    ],
  },
];

export const initialDeliverables: Deliverable[] = [
  {
    id: 'd1',
    campaignId: 'camp-001',
    creatorId: 'c1',
    name: 'Reel #1 — Summer Activewear',
    milestoneId: 'm1',
    dueDate: '2026-10-05',
    submissionDate: '2026-10-03',
    postUrl: 'https://instagram.com/reel/demo123',
    platform: 'Instagram',
    caption: 'Summer campaign with Nike #NikePartner',
    status: 'Verified',
    verificationStatus: 'Verified',
    rejectionReason: null,
    checks: [
      { id: 'chk1', label: 'Required deliverable submitted', passed: true },
      { id: 'chk2', label: 'Submission within deadline', passed: true },
      { id: 'chk3', label: 'Required content present (#NikePartner)', passed: true },
      { id: 'chk4', label: 'Content format valid (Instagram Reel)', passed: true },
      { id: 'chk5', label: 'Milestone requirements satisfied', passed: true },
    ],
  },
  {
    id: 'd2',
    campaignId: 'camp-001',
    creatorId: 'c1',
    name: 'Reel #2 — Product Showcase',
    milestoneId: 'm2',
    dueDate: '2026-10-10',
    submissionDate: '2026-10-08',
    postUrl: 'https://instagram.com/reel/demo456',
    platform: 'Instagram',
    caption: 'Summer campaign',
    status: 'Rejected',
    verificationStatus: 'Rejected',
    rejectionReason: 'Required hashtag #NikePartner was not detected in the caption.',
    checks: [
      { id: 'chk6', label: 'Required deliverable submitted', passed: true },
      { id: 'chk7', label: 'Submission within deadline', passed: true },
      { id: 'chk8', label: 'Required content present (#NikePartner)', passed: false },
      { id: 'chk9', label: 'Content format valid (Instagram Reel)', passed: true },
      { id: 'chk10', label: 'Milestone requirements satisfied', passed: false },
    ],
  },
  {
    id: 'd3',
    campaignId: 'camp-001',
    creatorId: 'c1',
    name: 'Reel #3 — Campaign Wrap',
    milestoneId: 'm3',
    dueDate: '2026-10-15',
    submissionDate: null,
    postUrl: null,
    platform: 'Instagram',
    caption: null,
    status: 'Pending',
    verificationStatus: 'Pending Verification',
    rejectionReason: null,
    checks: [
      { id: 'chk11', label: 'Required deliverable submitted', passed: null },
      { id: 'chk12', label: 'Submission within deadline', passed: null },
      { id: 'chk13', label: 'Required content present (#NikePartner)', passed: null },
      { id: 'chk14', label: 'Content format valid (Instagram Reel)', passed: null },
      { id: 'chk15', label: 'Milestone requirements satisfied', passed: null },
    ],
  },
  {
    id: 'd4',
    campaignId: 'camp-002',
    creatorId: 'c4',
    name: 'Workout Reel #1',
    milestoneId: 'm4',
    dueDate: '2026-10-12',
    submissionDate: '2026-10-09',
    postUrl: 'https://instagram.com/reel/fitness1',
    platform: 'Instagram',
    caption: 'Push day with Adidas #AdidasFit',
    status: 'Submitted',
    verificationStatus: 'Pending Verification',
    rejectionReason: null,
    checks: [
      { id: 'chk16', label: 'Required deliverable submitted', passed: null },
      { id: 'chk17', label: 'Submission within deadline', passed: null },
      { id: 'chk18', label: 'Required content present (#AdidasFit)', passed: null },
      { id: 'chk19', label: 'Content format valid (Instagram Reel)', passed: null },
      { id: 'chk20', label: 'Milestone requirements satisfied', passed: null },
    ],
  },
  {
    id: 'd5',
    campaignId: 'camp-002',
    creatorId: 'c4',
    name: 'Workout Reel #2',
    milestoneId: 'm5',
    dueDate: '2026-10-18',
    submissionDate: null,
    postUrl: null,
    platform: 'Instagram',
    caption: null,
    status: 'Pending',
    verificationStatus: 'Pending Verification',
    rejectionReason: null,
    checks: [
      { id: 'chk21', label: 'Required deliverable submitted', passed: null },
      { id: 'chk22', label: 'Submission within deadline', passed: null },
      { id: 'chk23', label: 'Required content present (#AdidasFit)', passed: null },
      { id: 'chk24', label: 'Content format valid (Instagram Reel)', passed: null },
      { id: 'chk25', label: 'Milestone requirements satisfied', passed: null },
    ],
  },
  {
    id: 'd6', campaignId: 'camp-003', creatorId: 'c2', name: 'Unboxing Video', milestoneId: 'm6',
    dueDate: '2026-09-20', submissionDate: '2026-09-18', postUrl: 'https://youtube.com/watch?v=unbox',
    platform: 'YouTube', caption: 'Samsung Galaxy unboxing #SamsungCreator',
    status: 'Verified', verificationStatus: 'Verified', rejectionReason: null,
    checks: [
      { id: 'chk26', label: 'Required deliverable submitted', passed: true },
      { id: 'chk27', label: 'Submission within deadline', passed: true },
      { id: 'chk28', label: 'Required content present (#SamsungCreator)', passed: true },
      { id: 'chk29', label: 'Content format valid (YouTube Video)', passed: true },
      { id: 'chk30', label: 'Milestone requirements satisfied', passed: true },
    ],
  },
  {
    id: 'd7', campaignId: 'camp-003', creatorId: 'c2', name: 'Review Video', milestoneId: 'm7',
    dueDate: '2026-09-25', submissionDate: '2026-09-22', postUrl: 'https://youtube.com/watch?v=review',
    platform: 'YouTube', caption: 'Full review #SamsungCreator',
    status: 'Verified', verificationStatus: 'Verified', rejectionReason: null,
    checks: [
      { id: 'chk31', label: 'Required deliverable submitted', passed: true },
      { id: 'chk32', label: 'Submission within deadline', passed: true },
      { id: 'chk33', label: 'Required content present (#SamsungCreator)', passed: true },
      { id: 'chk34', label: 'Content format valid (YouTube Video)', passed: true },
      { id: 'chk35', label: 'Milestone requirements satisfied', passed: true },
    ],
  },
  {
    id: 'd8', campaignId: 'camp-003', creatorId: 'c2', name: 'Comparison Video', milestoneId: 'm8',
    dueDate: '2026-09-28', submissionDate: '2026-09-26', postUrl: 'https://youtube.com/watch?v=compare',
    platform: 'YouTube', caption: 'Phone comparison #SamsungCreator',
    status: 'Verified', verificationStatus: 'Verified', rejectionReason: null,
    checks: [
      { id: 'chk36', label: 'Required deliverable submitted', passed: true },
      { id: 'chk37', label: 'Submission within deadline', passed: true },
      { id: 'chk38', label: 'Required content present (#SamsungCreator)', passed: true },
      { id: 'chk39', label: 'Content format valid (YouTube Video)', passed: true },
      { id: 'chk40', label: 'Milestone requirements satisfied', passed: true },
    ],
  },
  {
    id: 'd9', campaignId: 'camp-003', creatorId: 'c2', name: 'Final Verdict Video', milestoneId: 'm9',
    dueDate: '2026-10-01', submissionDate: '2026-09-29', postUrl: 'https://youtube.com/watch?v=verdict',
    platform: 'YouTube', caption: 'Final verdict #SamsungCreator',
    status: 'Verified', verificationStatus: 'Verified', rejectionReason: null,
    checks: [
      { id: 'chk41', label: 'Required deliverable submitted', passed: true },
      { id: 'chk42', label: 'Submission within deadline', passed: true },
      { id: 'chk43', label: 'Required content present (#SamsungCreator)', passed: true },
      { id: 'chk44', label: 'Content format valid (YouTube Video)', passed: true },
      { id: 'chk45', label: 'Milestone requirements satisfied', passed: true },
    ],
  },
];

export const initialEscrowTxns: EscrowTransaction[] = [
  {
    id: 'e1', campaignId: 'camp-001', creatorId: 'c1', amount: 30000, milestoneId: null,
    type: 'LOCK', status: 'Locked', createdAt: '2026-09-20', updatedAt: '2026-09-20',
    txnId: 'MOCK-ESCROW-8F32A1',
  },
  {
    id: 'e2', campaignId: 'camp-001', creatorId: 'c1', amount: 10000, milestoneId: 'm1',
    type: 'RELEASE', status: 'Released', createdAt: '2026-10-03', updatedAt: '2026-10-03',
    txnId: 'MOCK-PAYOUT-001',
  },
  {
    id: 'e3', campaignId: 'camp-002', creatorId: 'c4', amount: 20000, milestoneId: null,
    type: 'LOCK', status: 'Locked', createdAt: '2026-09-25', updatedAt: '2026-09-25',
    txnId: 'MOCK-ESCROW-2B91CD',
  },
  {
    id: 'e4', campaignId: 'camp-003', creatorId: 'c2', amount: 40000, milestoneId: null,
    type: 'LOCK', status: 'Released', createdAt: '2026-08-15', updatedAt: '2026-10-01',
    txnId: 'MOCK-ESCROW-5E7FG2',
  },
  {
    id: 'e5', campaignId: 'camp-003', creatorId: 'c2', amount: 10000, milestoneId: 'm6',
    type: 'RELEASE', status: 'Released', createdAt: '2026-09-18', updatedAt: '2026-09-18',
    txnId: 'MOCK-PAYOUT-002',
  },
  {
    id: 'e6', campaignId: 'camp-003', creatorId: 'c2', amount: 10000, milestoneId: 'm7',
    type: 'RELEASE', status: 'Released', createdAt: '2026-09-22', updatedAt: '2026-09-22',
    txnId: 'MOCK-PAYOUT-003',
  },
  {
    id: 'e7', campaignId: 'camp-003', creatorId: 'c2', amount: 10000, milestoneId: 'm8',
    type: 'RELEASE', status: 'Released', createdAt: '2026-09-26', updatedAt: '2026-09-26',
    txnId: 'MOCK-PAYOUT-004',
  },
  {
    id: 'e8', campaignId: 'camp-003', creatorId: 'c2', amount: 10000, milestoneId: 'm9',
    type: 'RELEASE', status: 'Released', createdAt: '2026-09-29', updatedAt: '2026-09-29',
    txnId: 'MOCK-PAYOUT-005',
  },
];

export const initialPayouts: Payout[] = [
  {
    id: 'p1', campaignId: 'camp-001', creatorId: 'c1', milestoneId: 'm1', amount: 10000,
    verificationStatus: 'Verified', status: 'Released', date: '2026-10-03', txnId: 'MOCK-PAYOUT-001',
  },
  {
    id: 'p2', campaignId: 'camp-001', creatorId: 'c1', milestoneId: 'm2', amount: 10000,
    verificationStatus: 'Rejected', status: 'Disputed', date: '2026-10-08', txnId: null,
  },
  {
    id: 'p3', campaignId: 'camp-001', creatorId: 'c1', milestoneId: 'm3', amount: 10000,
    verificationStatus: 'Pending Verification', status: 'Pending', date: '-', txnId: null,
  },
  {
    id: 'p4', campaignId: 'camp-002', creatorId: 'c4', milestoneId: 'm4', amount: 10000,
    verificationStatus: 'Pending Verification', status: 'Pending', date: '-', txnId: null,
  },
  {
    id: 'p5', campaignId: 'camp-002', creatorId: 'c4', milestoneId: 'm5', amount: 10000,
    verificationStatus: 'Pending Verification', status: 'Pending', date: '-', txnId: null,
  },
  {
    id: 'p6', campaignId: 'camp-003', creatorId: 'c2', milestoneId: 'm6', amount: 10000,
    verificationStatus: 'Verified', status: 'Released', date: '2026-09-18', txnId: 'MOCK-PAYOUT-002',
  },
  {
    id: 'p7', campaignId: 'camp-003', creatorId: 'c2', milestoneId: 'm7', amount: 10000,
    verificationStatus: 'Verified', status: 'Released', date: '2026-09-22', txnId: 'MOCK-PAYOUT-003',
  },
  {
    id: 'p8', campaignId: 'camp-003', creatorId: 'c2', milestoneId: 'm8', amount: 10000,
    verificationStatus: 'Verified', status: 'Released', date: '2026-09-26', txnId: 'MOCK-PAYOUT-004',
  },
  {
    id: 'p9', campaignId: 'camp-003', creatorId: 'c2', milestoneId: 'm9', amount: 10000,
    verificationStatus: 'Verified', status: 'Released', date: '2026-09-29', txnId: 'MOCK-PAYOUT-005',
  },
];

export const initialDisputes: Dispute[] = [
  {
    id: 'dis1', campaignId: 'camp-001', creatorId: 'c1', deliverableId: 'd2', milestoneId: 'm2',
    amount: 10000, reason: 'Verification Error',
    description: 'The hashtag #NikePartner was included in the original post but the verification engine marked it as missing. Requesting manual review.',
    raisedBy: 'Creator', date: '2026-10-09', status: 'Open',
    timeline: [
      { id: 't1', timestamp: '2026-10-09 14:30', event: 'Dispute raised by creator', actor: '@aisharao' },
    ],
  },
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'a1', timestamp: '2026-09-20 10:00', actor: 'Nike', role: 'BRAND',
    action: 'Campaign Created', campaign: 'Nike Summer Campaign', entity: 'Campaign',
    prevState: '—', newState: 'Draft', refId: 'CTR-0001',
    hash: 'a83f91c2', prevHash: '00000000',
  },
  {
    id: 'a2', timestamp: '2026-09-20 10:05', actor: 'Nike', role: 'BRAND',
    action: 'Escrow Locked', campaign: 'Nike Summer Campaign', entity: 'Escrow',
    prevState: '—', newState: 'LOCKED', refId: 'MOCK-ESCROW-8F32A1',
    hash: '91ab72d4', prevHash: 'a83f91c2',
  },
  {
    id: 'a3', timestamp: '2026-09-21 09:00', actor: 'Nike', role: 'BRAND',
    action: 'Campaign Published', campaign: 'Nike Summer Campaign', entity: 'Campaign',
    prevState: 'Draft', newState: 'Active', refId: 'CTR-0001',
    hash: '7f3e21a8', prevHash: '91ab72d4',
  },
  {
    id: 'a4', timestamp: '2026-09-22 11:30', actor: '@aisharao', role: 'CREATOR',
    action: 'Campaign Accepted', campaign: 'Nike Summer Campaign', entity: 'Campaign',
    prevState: 'Pending', newState: 'Active', refId: 'CTR-0001',
    hash: '3b8d4c91', prevHash: '7f3e21a8',
  },
  {
    id: 'a5', timestamp: '2026-10-03 10:30', actor: '@aisharao', role: 'CREATOR',
    action: 'Deliverable Submitted', campaign: 'Nike Summer Campaign', entity: 'Deliverable',
    prevState: '—', newState: 'Submitted', refId: 'd1',
    hash: 'e5f1a2b3', prevHash: '3b8d4c91',
  },
  {
    id: 'a6', timestamp: '2026-10-03 11:00', actor: 'Nike', role: 'BRAND',
    action: 'Deliverable Verified', campaign: 'Nike Summer Campaign', entity: 'Deliverable',
    prevState: 'Submitted', newState: 'Verified', refId: 'd1',
    hash: 'c2a9f7e1', prevHash: 'e5f1a2b3',
  },
  {
    id: 'a7', timestamp: '2026-10-03 11:05', actor: 'Nike', role: 'BRAND',
    action: 'Milestone Approved', campaign: 'Nike Summer Campaign', entity: 'Milestone',
    prevState: 'LOCKED', newState: 'ELIGIBLE', refId: 'm1',
    hash: '8d4b6c3a', prevHash: 'c2a9f7e1',
  },
  {
    id: 'a8', timestamp: '2026-10-03 11:10', actor: 'Nike', role: 'BRAND',
    action: 'Payout Released', campaign: 'Nike Summer Campaign', entity: 'Payout',
    prevState: 'ELIGIBLE', newState: 'RELEASED', refId: 'MOCK-PAYOUT-001',
    hash: '5e2f8a1d', prevHash: '8d4b6c3a',
  },
  {
    id: 'a9', timestamp: '2026-10-08 15:00', actor: '@aisharao', role: 'CREATOR',
    action: 'Deliverable Submitted', campaign: 'Nike Summer Campaign', entity: 'Deliverable',
    prevState: '—', newState: 'Submitted', refId: 'd2',
    hash: 'f1a3e7c9', prevHash: '5e2f8a1d',
  },
  {
    id: 'a10', timestamp: '2026-10-08 15:30', actor: 'Nike', role: 'BRAND',
    action: 'Verification Failed', campaign: 'Nike Summer Campaign', entity: 'Deliverable',
    prevState: 'Submitted', newState: 'Rejected', refId: 'd2',
    hash: 'b7d2e4f8', prevHash: 'f1a3e7c9',
  },
  {
    id: 'a11', timestamp: '2026-10-09 14:30', actor: '@aisharao', role: 'CREATOR',
    action: 'Dispute Raised', campaign: 'Nike Summer Campaign', entity: 'Dispute',
    prevState: '—', newState: 'OPEN', refId: 'dis1',
    hash: '9c4a1e6b', prevHash: 'b7d2e4f8',
  },
];

export const initialInvitations: Invitation[] = [];

// ─── Store ───────────────────────────────────────────────

type AppState = {
  campaigns: Campaign[];
  creators: Creator[];
  deliverables: Deliverable[];
  escrowTxns: EscrowTransaction[];
  payouts: Payout[];
  disputes: Dispute[];
  auditLogs: AuditLog[];
  invitations: Invitation[];
};

export const useAppStore = create<AppState>(() => ({
  campaigns: initialCampaigns,
  creators,
  deliverables: initialDeliverables,
  escrowTxns: initialEscrowTxns,
  payouts: initialPayouts,
  disputes: initialDisputes,
  auditLogs: initialAuditLogs,
  invitations: initialInvitations,
}));

export { genId };
