import type { ReactNode } from 'react';
import { Construction } from 'lucide-react';

type PlaceholderPageProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
        {icon || <Construction size={28} />}
      </div>
      <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
      <p className="text-neutral-500 mt-2 max-w-md">
        {description || 'This section will be built in an upcoming phase. The navigation and layout are ready.'}
      </p>
      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 text-neutral-500 text-sm font-medium">
        Phase 1 — Foundation & Navigation
      </div>
    </div>
  );
}

export default PlaceholderPage;
