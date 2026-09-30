export type UserRole = 'BRAND' | 'CREATOR';

export type EscrowStatus = 'LOCKED' | 'PARTIALLY_RELEASED' | 'RELEASED' | 'DISPUTED' | 'FAILED';

export type CampaignStatus = 'CREATED' | 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'DISPUTED' | 'CANCELLED';

export type DeliverableStatus = 'PENDING' | 'SUBMITTED' | 'VERIFIED' | 'FAILED' | 'APPROVED' | 'DISPUTED';

export type PayoutStatus = 'PENDING' | 'ELIGIBLE' | 'RELEASED' | 'DISPUTED' | 'FAILED';

export type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED';

export type AuditEventType =
  | 'CONTRACT_CREATED'
  | 'ESCROW_FUNDED'
  | 'DELIVERABLE_SUBMITTED'
  | 'VERIFICATION_COMPLETED'
  | 'MILESTONE_APPROVED'
  | 'PAYOUT_RELEASED'
  | 'VERIFICATION_FAILED'
  | 'DISPUTE_RAISED'
  | 'CAMPAIGN_ACCEPTED'
  | 'CAMPAIGN_REJECTED';

export type NavItem = {
  label: string;
  path: string;
  icon: string;
};

export type SummaryCardData = {
  label: string;
  value: string;
  icon: string;
  tone: 'primary' | 'success' | 'warning' | 'error' | 'accent' | 'neutral';
};
