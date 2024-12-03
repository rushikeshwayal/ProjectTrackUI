import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import Login from './components/Login/Login';
import HomeAdmin from './components/Admin/Home/HomeAdmin';
import AssinedProjectInvestigator from './components/Investigator/Home/AssinedProjectInvestigator';
import AdminCreateProject from './components/Admin/Home/AdminCreateProject';
import CreateNewAgency from './components/Admin/Home/CreateNewAgency';
import CreateNewSubAgency from './components/Admin/Home/CreateNewSubAgency';
import CreateNewSubInvestigator from './components/Admin/Home/CreateNewSubInvestigator';
import AddInvestigator from './components/Admin/Home/CreateNewInvestigator';
import ProjectDetails from './components/Admin/Project/ProjectDetails/ProjectDetails';
import ProjectDetailsSection from './components/Admin/Project/ProjectDetails/ProjectDetailsSection';
import AdminProfile from './components/Admin/AdminSubpart/AdminProfile';
import AllMessages from './components/Admin/Message/AllMessages';
import ChatSystem from './components/Admin/Message/ChatSystem';
// import { AuthProvider } from './components/context/AuthContext';

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
            <ProjectDetails/>
          </ProtectedRoute>
        } 
      />
       <Route 
        path="/admin/profile/:adminId" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <AdminProfile/>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/chat" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <ChatSystem/>
          </ProtectedRoute>
        } 
      />

{/* ======================================================== */}
      <Route 
        path="/investigator" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <AssinedProjectInvestigator />
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

