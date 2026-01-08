import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSingleBlog } from '../../services';

let BaseURL = import.meta.env.VITE_API_HOST

export default function Hero() {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getSingleBlog(true);
        setBlogPost(data);
      } catch (error) {
        console.error("Failed to fetch single blog:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-[#EC917C] to-[#DA634B] py-24">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="bg-gradient-to-b from-[#EC917C] to-[#DA634B] py-24">
        <div className="text-center text-white">No featured blog post available.</div>
      </div>
    );
  }

  const imageUrl = `${BaseURL}/${blogPost.thumbnail}`; // blogPost.thumbnail already contains the full URL

  return (
    <div className="bg-gradient-to-b from-[#EC917C] to-[#DA634B]">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white pr-8">
            <h1 className="text-4xl md:text-5xl font-bold pb-5 ">{blogPost.name}</h1>
             <p className="text-gray-200 mb-6 text-sm">{blogPost.category}</p>
            <div>
              <h3 className="text-md ">{blogPost.summary}</h3>
            </div>
            <Link to={`/blog/${blogPost.id}`}>
              <button className="mt-10 bg-white text-[#CF462A] px-10 py-4 rounded font-medium">
                Read more
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            {imageUrl && <img src={imageUrl} alt={blogPost.name} className="rounded-lg shadow-lg w-full" />}
          </div>
        </div>
      </div>
    </div>
  );
}