import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogDetailCard from "../components/blogs/BlogDetailCard";
import { getBlogById } from "../services";
import Navbar from "../components/navbar/Navbar";

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const apiHost = import.meta.env.VITE_API_HOST;

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  const prepareContent = (content) => {
    if (!content) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = doc.querySelectorAll('img');
    images.forEach(img => {
      if (img.src.startsWith('/') && !img.src.startsWith('//')) {
        img.src = `${apiHost}${img.src}`;
      }
    });
    return doc.body.innerHTML;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  const processedContent = prepareContent(blog.content);

  return (
    <>
      <Navbar />
      {/* Hero Image */}
      <div className="h-[420px] w-full overflow-hidden">
        <img
          src={blog.thumbnail}
          alt={blog.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Card */}
      <BlogDetailCard
        title={blog.name}
        content={processedContent}
        author={blog.user}
        date={new Date(blog.created_at).toDateString()}
        image={blog.thumbnail}
        summary={blog.summary}
        category={blog.category}
      />
    </>
  );
}
