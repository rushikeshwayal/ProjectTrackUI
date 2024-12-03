import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import Login from './components/Login/Login';
import HomeAdmin from './components/Admin/Home/HomeAdmin';
import AdminCreateProject from './components/Admin/Home/AdminCreateProject';
import CreateNewAgency from './components/Admin/Home/CreateNewAgency';
import CreateNewSubAgency from './components/Admin/Home/CreateNewSubAgency';
import CreateNewSubInvestigator from './components/Admin/Home/CreateNewSubInvestigator';
import AddInvestigator from './components/Admin/Home/CreateNewInvestigator';
import ProjectDetails from './components/Admin/Project/ProjectDetails/ProjectDetails';
import AdminProfile from './components/Admin/AdminSubpart/AdminProfile';
import ChatSystem from './components/Admin/Message/ChatSystem';
import HomeInvestigator from './components/Investigator/Home/HomeInvestigator';
import InvestigatorProfile from './components/Investigator/Home/InvestigatorProfile'
import  ProjectDetailsInvestigaor from './components/Investigator/ProjectDetails/ProjectDetails';
import ChatSystemInvestigator from './components/Investigator/Message/ChatSystem';
function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  // If user is not logged in or doesn't have the required role, redirect to login
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Login route */}
      <Route path="/" element={<Login />} />

      {/* Admin Routes (protected) */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <HomeAdmin />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/project" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <AdminCreateProject />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/agency" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <CreateNewAgency />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/sub-agency" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <CreateNewSubAgency />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/investigator" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <AddInvestigator />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/sub-investigator" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <CreateNewSubInvestigator />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/project/details/:projectId" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <ProjectDetails />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/profile/:adminId" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <AdminProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/chat" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <ChatSystem />
          </ProtectedRoute>
        } 
      />
{/* ========================================================================= */}
      {/* Investigator Routes (protected) */}
      <Route 
        path="/investigator" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <HomeInvestigator />
          </ProtectedRoute>
        } 
      />
       <Route 
        path="/investigator/profile" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <InvestigatorProfile/>
          </ProtectedRoute>
        } 
      />
       <Route 
        path="/investigator/profile" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <InvestigatorProfile/>
          </ProtectedRoute>
        } 
      />


<Route 
        path="/investigator/project/details/:projectId" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <ProjectDetailsInvestigaor/>
          </ProtectedRoute>
        } 
      />

<Route 
        path="/investigator/chat" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <ChatSystemInvestigator />
          </ProtectedRoute>
        } 
      />








    </Routes>
    

    
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
