import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import PropertySearch from "./pages/tenant/PropertySearch";
import PropertyDetails from "./pages/tenant/PropertyDetails";
import RentalApplication from "./pages/tenant/RentalApplication";
import ApplicationTracker from "./pages/tenant/ApplicationTracker";
import AgreementPreview from "./pages/tenant/AgreementPreview";
import AgreementConfirmation from "./pages/tenant/AgreementConfirmation";
import LandlordDashboard from "./pages/landlord/LandlordDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GrievancePortal from "./pages/grievance/GrievancePortal";
import RaiseGrievance from "./pages/grievance/RaiseGrievance";
import GrievanceStatus from "./pages/grievance/GrievanceStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Tenant Routes */}
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="/tenant/properties" element={<PropertySearch />} />
          <Route path="/tenant/properties/:id" element={<PropertyDetails />} />
          <Route path="/tenant/apply/:propertyId" element={<RentalApplication />} />
          <Route path="/tenant/applications/:applicationId/status" element={<ApplicationTracker />} />
          <Route path="/tenant/agreements/:agreementId" element={<AgreementPreview />} />
          <Route path="/tenant/agreements/:agreementId/confirmation" element={<AgreementConfirmation />} />
          
          {/* Grievance Routes */}
          <Route path="/grievance" element={<GrievancePortal />} />
          <Route path="/grievance/new" element={<RaiseGrievance />} />
          <Route path="/grievance/:grievanceId" element={<GrievanceStatus />} />
          
          {/* Landlord Routes */}
          <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
