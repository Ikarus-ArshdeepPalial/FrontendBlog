import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSingleBlog } from "../../services";

export default function FeaturedBlogs() {
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  let BaseURL = import.meta.env.VITE_API_HOST

  useEffect(() => {
    async function fetchFeaturedBlog() {
      try {
        const data = await getSingleBlog(false); // false for random
        setFeaturedBlog(data);
      } catch (error) {
        console.error("Failed to fetch featured blog:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedBlog();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading featured blog...</div>;
  }

  if (!featuredBlog) {
    return <div className="text-center py-10">No featured blog available.</div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 ">
        <div className="h-[70dvh] bg-transparent relative pt-5">
          <img
            src={`${BaseURL}/${featuredBlog.thumbnail}`}
            alt={featuredBlog.name}
            className="h-4/5 w-full rounded-lg shadow-md object-cover"
          />
          <div className="absolute bottom-10 right-0 bg-white p-10 rounded-xl shadow-xl w-[70%]">
            <div className="">
              <div className="ml-10">
                <p className="text-gray-500 mb-6 text-sm font-bold">
                  {new Date(featuredBlog.created_at).toDateString()}
                </p>
                <p className="text-gray-500 mb-6 text-sm font-bold">
                  {featuredBlog.category}
                </p>
                <h1 className="font-bold text-4xl">{featuredBlog.name}</h1>
                <p className="mt-6">{featuredBlog.summary}</p>
                <div>
                  <Link to={`/blog/${featuredBlog.id}`}>
                    <button className="mt-6 border border-red-400 text-[#CF462A] px-6 py-3 rounded-lg font-bold text-sm ">
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
