import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Loading from "components/Loading";
import { useAuth } from "contexts/AuthContextProvider";

const NoMatch = lazy(() => import("components/NoMatch"));
const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/Login"));
const Signup = lazy(() => import("pages/Signup"));
const VendorSignup = lazy(() => import("pages/VendorSignup"));
const ForgotPassword = lazy(() => import("pages/ForgotPassword"));
const ResetPassword = lazy(() => import("pages/ResetPassword"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const AdminResetPassword = lazy(
  () => import("containers/Settings/AdminResetPassword")
);
const Users = lazy(() => import("pages/Users"));
const OrgVendors = lazy(() => import("pages/OrgVendors"));
const OrgItems = lazy(() => import("pages/OrgItems"));
const RFQ = lazy(() => import("pages/RFQ"));
const VendorRFQBiddingDetails = lazy(
  () => import("containers/RFQ/VendorRFQBiddingDetails")
);
const BuyerRFQBiddingDetails = lazy(
  () => import("containers/RFQ/BuyerRFQBiddingDetails")
);
const Profile = lazy(() => import("pages/Profile"));
const VendorProfile = lazy(() => import("pages/VendorProfile"));
const Comparison = lazy(() => import("pages/Comparison"));

function GuestRoute({ children }: { children: JSX.Element }) {
  const { accessToken } = useAuth();
  let location = useLocation();

  if (accessToken === undefined) return null;
  if (accessToken) {
    return <Navigate to={"/rfq"} state={{ from: location }} />;
  }

  return children;
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { accessToken } = useAuth();
  let location = useLocation();
  if (accessToken === undefined) return null;
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

const RoutesScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/vendor-signup"
          element={
            <GuestRoute>
              <VendorSignup />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />

        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/settings/reset-password"
          element={
            <ProtectedRoute>
              <AdminResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-vendors"
          element={
            <ProtectedRoute>
              <OrgVendors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-items"
          element={
            <ProtectedRoute>
              <OrgItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rfq"
          element={
            <ProtectedRoute>
              <RFQ />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/rfq/view/:id"
          element={
            <ProtectedRoute>
              <VendorRFQBiddingDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer/rfq/view/:id"
          element={
            <ProtectedRoute>
              <BuyerRFQBiddingDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-profile"
          element={
            <ProtectedRoute>
              <VendorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comparison"
          element={
            <ProtectedRoute>
              <Comparison />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default RoutesScreen;
