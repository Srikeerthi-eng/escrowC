type StatusBadgeProps = {
  status: string;
  variant?: 'default' | 'small';
};

const colorMap: Record<string, string> = {
  LOCKED: 'bg-warning-100 text-warning-700 border-warning-200',
  RELEASED: 'bg-success-100 text-success-700 border-success-200',
  VERIFIED: 'bg-success-100 text-success-700 border-success-200',
  PENDING: 'bg-primary-100 text-primary-700 border-primary-200',
  FAILED: 'bg-error-100 text-error-700 border-error-200',
  DISPUTED: 'bg-error-100 text-error-700 border-error-200',
  ACTIVE: 'bg-primary-100 text-primary-700 border-primary-200',
  COMPLETED: 'bg-success-100 text-success-700 border-success-200',
  CREATED: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  APPROVED: 'bg-success-100 text-success-700 border-success-200',
  SUBMITTED: 'bg-primary-100 text-primary-700 border-primary-200',
  OPEN: 'bg-error-100 text-error-700 border-error-200',
  UNDER_REVIEW: 'bg-warning-100 text-warning-700 border-warning-200',
  RESOLVED: 'bg-success-100 text-success-700 border-success-200',
  REJECTED: 'bg-error-100 text-error-700 border-error-200',
  ELIGIBLE: 'bg-accent-100 text-accent-700 border-accent-200',
  PARTIALLY_RELEASED: 'bg-warning-100 text-warning-700 border-warning-200',
  CANCELLED: 'bg-neutral-100 text-neutral-500 border-neutral-200',
  EXPIRED: 'bg-neutral-100 text-neutral-500 border-neutral-200',
  ACCEPTED: 'bg-success-100 text-success-700 border-success-200',
  ON_TRACK: 'bg-success-100 text-success-700 border-success-200',
  // New statuses for brand pages
  Draft: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  'Active': 'bg-primary-100 text-primary-700 border-primary-200',
  'Completed': 'bg-success-100 text-success-700 border-success-200',
  'Disputed': 'bg-error-100 text-error-700 border-error-200',
  'Pending': 'bg-primary-100 text-primary-700 border-primary-200',
  'Submitted': 'bg-primary-100 text-primary-700 border-primary-200',
  'Under Review': 'bg-warning-100 text-warning-700 border-warning-200',
  'Verified': 'bg-success-100 text-success-700 border-success-200',
  'Rejected': 'bg-error-100 text-error-700 border-error-200',
  'Pending Verification': 'bg-warning-100 text-warning-700 border-warning-200',
  'Eligible': 'bg-accent-100 text-accent-700 border-accent-200',
  'Processing': 'bg-primary-100 text-primary-700 border-primary-200',
  'Open': 'bg-error-100 text-error-700 border-error-200',
  'Resolved': 'bg-success-100 text-success-700 border-success-200',
  'Sent': 'bg-primary-100 text-primary-700 border-primary-200',
  'Available': 'bg-success-100 text-success-700 border-success-200',
  'Busy': 'bg-warning-100 text-warning-700 border-warning-200',
  'Open to work': 'bg-accent-100 text-accent-700 border-accent-200',
  'Verification Pending': 'bg-warning-100 text-warning-700 border-warning-200',
};

function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const colors = colorMap[status] || 'bg-neutral-100 text-neutral-700 border-neutral-200';
  const size = variant === 'small' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colors} ${size}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

export default StatusBadge;
