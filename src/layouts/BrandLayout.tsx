import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import MockEnvBanner from '@/components/MockEnvBanner';

function BrandLayout() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar role="BRAND" userName="Nike" />
      <div className="lg:ml-64">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="mb-6">
            <MockEnvBanner />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default BrandLayout;
