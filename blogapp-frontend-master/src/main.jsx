import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Hero from "./components/blogs/Hero.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import FeaturedBlogs from "./components/blogs/FeaturedBlogs.jsx";
import RecentPosts from "./components/blogs/RecentPosts.jsx";
import BlogCard from "./components/common/Blogthree.jsx";
import PopularPosts from "./components/blogs/PopularPosts.jsx";
import Newsletter from "./components/common/NewLetter.jsx";
import Footer from "./components/common/Footer.jsx";
import Signup from "./pages/Signup.jsx";
import LoginPage from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./context/Authcontext.jsx";


createRoot(document.getElementById("root")).render(
 
 <> 
 <AuthProvider>
  <App/>
  </AuthProvider>
  </>
);
