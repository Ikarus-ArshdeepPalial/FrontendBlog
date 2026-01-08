import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Navbar from "../components/navbar/Navbar.jsx";
import Blogs from "../components/blogs/Hero.jsx";
import FeaturedBlogs from "../components/blogs/FeaturedBlogs.jsx";
import RecentPosts from "../components/blogs/RecentPosts.jsx";
import PopularPosts from "../components/blogs/PopularPosts.jsx";
import Newsletter from "../components/common/NewLetter.jsx";
import Footer from "../components/common/Footer.jsx";
import Hero from "../components/blogs/Hero.jsx";
import { useEffect, useState } from "react";
import { getPosts } from "../services.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        // console.log(data.results)
        setPosts(data.results.slice(0, 6)); 
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedBlogs />
      <RecentPosts />
      <PopularPosts posts={posts} loading={loading} />
      <Newsletter />
      <Footer />
    </>
  );
}
