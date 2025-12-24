import { Toaster } from './components/ui/toaster.jsx';
import { Toaster as Sonner } from './components/ui/sonner.jsx';
import { TooltipProvider } from './components/ui/tooltip.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Index from './pages/Index.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';

// Tenant Pages
import TenantDashboard from './pages/tenant/TenantDashboard.jsx';
import PropertySearch from './pages/tenant/PropertySearch.jsx';
import PropertyMapView from './pages/tenant/PropertyMapView.jsx';
import PropertyDetails from './pages/tenant/PropertyDetails.jsx';
import RentalApplication from './pages/tenant/RentalApplication.jsx';
import ApplicationTracker from './pages/tenant/ApplicationTracker.jsx';
import MyApplications from './pages/tenant/MyApplications.jsx';
import MyAgreements from './pages/tenant/MyAgreements.jsx';
import AgreementPreview from './pages/tenant/AgreementPreview.jsx';
import AgreementConfirmation from './pages/tenant/AgreementConfirmation.jsx';
import ProfileVerification from './pages/tenant/ProfileVerification.jsx';
import AgreementSign from './pages/tenant/AgreementSign.jsx';
import TenantProfile from './pages/tenant/TenantProfile.jsx';
import TenantSettings from './pages/tenant/TenantSettings.jsx';

// Landlord Pages
import LandlordDashboard from './pages/landlord/LandlordDashboard.jsx';
import LandlordProfile from './pages/landlord/LandlordProfile.jsx';
import PropertyList from './pages/landlord/PropertyList.jsx';
import PropertyDetail from './pages/landlord/PropertyDetail.jsx';
import EditProperty from './pages/landlord/EditProperty.jsx';
import AddProperty from './pages/landlord/AddProperty.jsx';
import ApplicationsList from './pages/landlord/ApplicationsList.jsx';
import ApplicationDetail from './pages/landlord/ApplicationDetail.jsx';
import LandlordAgreements from './pages/landlord/LandlordAgreements.jsx';
import LandlordSettings from './pages/landlord/LandlordSettings.jsx';
import LandlordVerification from './pages/landlord/LandlordVerification.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import GISMapView from './pages/admin/GISMapView.jsx';
import InventoryList from './pages/admin/InventoryList.jsx';
import AdminPropertyDetail from './pages/admin/PropertyDetail.jsx';
import ApplicationsMonitoring from './pages/admin/ApplicationsMonitoring.jsx';
import UserDirectory from './pages/admin/UserDirectory.jsx';
import UserDetail from './pages/admin/UserDetail.jsx';
import AgreementRepository from './pages/admin/AgreementRepository.jsx';
import AgreementDetail from './pages/admin/AgreementDetail.jsx';
import GrievanceManagement from './pages/admin/GrievanceManagement.jsx';
import GrievanceDetail from './pages/admin/GrievanceDetail.jsx';
import AuditLogs from './pages/admin/AuditLogs.jsx';
import AdminProfile from './pages/admin/AdminProfile.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';
import Reports from './pages/admin/Reports.jsx';
import PendingApprovals from './pages/admin/PendingApprovals.jsx';
import ApprovalDetail from './pages/admin/ApprovalDetail.jsx';
// Grievance Pages
import GrievancePortal from './pages/grievance/GrievancePortal.jsx';
import RaiseGrievance from './pages/grievance/RaiseGrievance.jsx';
import GrievanceStatus from './pages/grievance/GrievanceStatus.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Tenant Routes */}
            <Route path="/tenant/dashboard" element={<TenantDashboard />} />
            <Route path="/tenant/properties" element={<PropertySearch />} />
            <Route path="/tenant/properties/map" element={<PropertyMapView />} />
            <Route path="/tenant/properties/:propertyId" element={<PropertyDetails />} />
            <Route path="/tenant/apply/:propertyId" element={<RentalApplication />} />
            <Route path="/tenant/applications" element={<MyApplications />} />
            <Route path="/tenant/applications/:applicationId" element={<ApplicationTracker />} />
            <Route path="/tenant/applications/:applicationId/status" element={<ApplicationTracker />} />
            <Route path="/tenant/agreements" element={<MyAgreements />} />
            <Route path="/tenant/agreements/:agreementId/preview" element={<AgreementPreview />} />
            <Route path="/tenant/agreements/:agreementId/confirmation" element={<AgreementConfirmation />} />
            <Route path="/tenant/agreements/:agreementId/sign" element={<AgreementSign />} />
            <Route path="/tenant/verification" element={<ProfileVerification />} />
            <Route path="/tenant/profile" element={<TenantProfile />} />
            <Route path="/tenant/settings" element={<TenantSettings />} />
            
{/* Landlord Routes */}
            <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
            <Route path="/landlord/profile" element={<LandlordProfile />} />
            <Route path="/landlord/properties" element={<PropertyList />} />
            <Route path="/landlord/properties/add" element={<AddProperty />} />
            <Route path="/landlord/properties/:propertyId" element={<PropertyDetail />} />
            <Route path="/landlord/properties/:propertyId/edit" element={<EditProperty />} />
            <Route path="/landlord/applications" element={<ApplicationsList />} />
            <Route path="/landlord/applications/:applicationId" element={<ApplicationDetail />} />
            <Route path="/landlord/agreements" element={<LandlordAgreements />} />
            <Route path="/landlord/settings" element={<LandlordSettings />} />
            <Route path="/landlord/verification" element={<LandlordVerification />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/map" element={<GISMapView />} />
            <Route path="/admin/inventory" element={<InventoryList />} />
            <Route path="/admin/properties/:propertyId" element={<AdminPropertyDetail />} />
            <Route path="/admin/applications" element={<ApplicationsMonitoring />} />
            <Route path="/admin/users" element={<UserDirectory />} />
            <Route path="/admin/users/:userType/:userId" element={<UserDetail />} />
            <Route path="/admin/agreements" element={<AgreementRepository />} />
            <Route path="/admin/agreements/:agreementId" element={<AgreementDetail />} />
            <Route path="/admin/grievances" element={<GrievanceManagement />} />
            <Route path="/admin/grievances/:grievanceId" element={<GrievanceDetail />} />
            <Route path="/admin/audit-logs" element={<AuditLogs />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/approvals" element={<PendingApprovals />} />
            <Route path="/admin/approvals/:approvalId" element={<ApprovalDetail />} />
            
            {/* Grievance Routes */}
            <Route path="/grievance" element={<GrievancePortal />} />
            <Route path="/grievance/raise" element={<RaiseGrievance />} />
            <Route path="/grievance/:grievanceId/status" element={<GrievanceStatus />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
