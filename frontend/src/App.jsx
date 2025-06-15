import "./App.css";
import Navbar from "./components/Navbar";
import "./assets/css/all.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import ProjectProfile from "./pages/ProjectProfile";
import Posts from "./pages/Posts";
import AddProject from "./components/AddProject";
import Profile from "./pages/Profile";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import PostDetails from "./pages/PostDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<Projects search={true} />} />
          <Route path="/posts" element={<Posts search={true} />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/editProject/:id" element={<AddProject />} />
          

          <Route
            path="/profile/invitations/:id"
            element={<Profile key="invitations" invProj={true} />}
          />
          <Route
            path="/profile/projects/:id"
            element={<Profile key="projects" invProj={false} />}
          />
          <Route path="/project/:id" element={<ProjectProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
