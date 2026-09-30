import { AlertTriangle } from 'lucide-react';

function MockEnvBanner() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-warning-50 border border-warning-200 rounded-lg text-sm text-warning-800">
      <AlertTriangle size={16} className="shrink-0" />
      <span>
        <strong>DEMO / MOCK ENVIRONMENT</strong> — Payments are simulated for demonstration purposes. No real money is transferred.
      </span>
    </div>
  );
}

export default MockEnvBanner;
