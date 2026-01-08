import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import AllBlogPosts from "../components/blogs/AllBlogPosts";
import Footer from "../components/common/Footer";
import { getPosts } from "../services";

export default function AllBlogs() {
  const [data, setData] = useState({ results: [], next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const responseData = await getPosts(page);
        setData(responseData);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [page]);

  return (
    <>
      <Navbar />
      <AllBlogPosts
        title="All Blogs"
        posts={data.results}
        loading={loading}
      />
      <div className="flex justify-center items-center my-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={!data.previous}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!data.next}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <Footer />
    </>
  );
}