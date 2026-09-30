import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import BrandLayout from '@/layouts/BrandLayout';
import CreatorLayout from '@/layouts/CreatorLayout';
import BrandDashboard from '@/pages/brand/BrandDashboard';
import CreatorDashboard from '@/pages/creator/CreatorDashboard';
import {
  BrandCampaigns,
  BrandFindCreators,
  BrandEscrow,
  BrandDeliverables,
  BrandVerification,
  BrandPayouts,
  BrandDisputes,
  BrandAuditLogs,
  BrandAnalytics,
  BrandProfile,
  BrandSettings,
  CreatorProfile,
  CreatorDiscover,
  CreatorInvitations,
  CreatorCampaigns,
  CreatorDeliverables,
  CreatorVerification,
  CreatorPayouts,
  CreatorDisputes,
  CreatorNotifications,
  CreatorAnalytics,
  CreatorSettings,
} from '@/pages/placeholders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Brand routes */}
        <Route path="/brand" element={<BrandLayout />}>
          <Route index element={<Navigate to="/brand/dashboard" replace />} />
          <Route path="dashboard" element={<BrandDashboard />} />
          <Route path="campaigns" element={<BrandCampaigns />} />
          <Route path="creators" element={<BrandFindCreators />} />
          <Route path="escrow" element={<BrandEscrow />} />
          <Route path="deliverables" element={<BrandDeliverables />} />
          <Route path="verification" element={<BrandVerification />} />
          <Route path="payouts" element={<BrandPayouts />} />
          <Route path="disputes" element={<BrandDisputes />} />
          <Route path="audit-logs" element={<BrandAuditLogs />} />
          <Route path="analytics" element={<BrandAnalytics />} />
          <Route path="profile" element={<BrandProfile />} />
          <Route path="settings" element={<BrandSettings />} />
        </Route>

        {/* Creator routes */}
        <Route path="/creator" element={<CreatorLayout />}>
          <Route index element={<Navigate to="/creator/dashboard" replace />} />
          <Route path="dashboard" element={<CreatorDashboard />} />
          <Route path="profile" element={<CreatorProfile />} />
          <Route path="campaigns/discover" element={<CreatorDiscover />} />
          <Route path="invitations" element={<CreatorInvitations />} />
          <Route path="campaigns" element={<CreatorCampaigns />} />
          <Route path="deliverables" element={<CreatorDeliverables />} />
          <Route path="verification" element={<CreatorVerification />} />
          <Route path="payouts" element={<CreatorPayouts />} />
          <Route path="disputes" element={<CreatorDisputes />} />
          <Route path="notifications" element={<CreatorNotifications />} />
          <Route path="analytics" element={<CreatorAnalytics />} />
          <Route path="settings" element={<CreatorSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
