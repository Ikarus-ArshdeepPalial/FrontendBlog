import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import LoginPage from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import BlogDetail from "./pages/Blogdetail";
import AllBlogs from "./pages/AllBlogs.jsx";


import Editorpage from "./pages/Editorpage";

export default function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog" element={<AllBlogs />} />
        <Route path="/editor" element={<Editorpage />} />
        
      </Routes>
    </Router>
  );
}
