import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSingleBlog } from '../../services';
let BaseURL = import.meta.env.VITE_API_HOST

export default function RecentPosts() {   
    const [recentPost, setRecentPost] = useState(null);
    const [loading, setLoading] = useState(true);
    // const apiHost = import.meta.env.VITE_API_HOST; // Not needed here

    useEffect(() => {
        async function fetchRecentPost() {
            try {
                const data = await getSingleBlog(true);
                setRecentPost(data);
            } catch (error) {
                console.error("Failed to fetch recent post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRecentPost();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
                <h1 className='text-5xl font-bold'>Our recent Post</h1>
                <p>Loading recent post...</p>
            </div>
        );
    }

    if (!recentPost) {
        return (
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
                <h1 className='text-5xl font-bold'>Our recent Post</h1>
                <p>No recent posts available.</p>
            </div>
        );
    }

    const imageUrl = `${BaseURL}/${recentPost.thumbnail}`; // recentPost.thumbnail already contains the full URL

    return (  
        <>
     <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 justify-between flex items-center">
        <h1 className='text-5xl font-bold'>Our recent Post</h1>
        <Link to="/blog">
        <button className="mt-10 text-white bg-[#DA634B]  px-10 py-4 rounded-lg font-medium" >View All</button>
        </Link>
     </div>
     <div>
        <div className='flex justify-center items-center  sm:px-6 lg: py-10'>
           <div> 
             {imageUrl && <img src={imageUrl} alt={recentPost.name} className="rounded-xl object-cover w-full h-auto max-w-lg"/>}
           </div>
        
        <div className='ml-10 max-w-lg'>

            {/*date*/}
           <p className='text-gray-500 mb-6 text-sm font-bold'>{new Date(recentPost.created_at).toDateString()}</p>

           <p className='text-gray-500 mb-6 text-sm font-bold'>{recentPost.category}</p>

           {/*text content*/}
             {/*heading*/}
           <h1 className='font-bold text-4xl'>{recentPost.name}</h1>
           
           {/*text*/}
           <p className='mt-6'>{recentPost.summary}</p>
           {/*button*/}
           <div>
            <Link to={`/blog/${recentPost.id}`}>
                <button className="mt-6 border border-red-400 text-[#CF462A] px-6 py-3 rounded-lg font-bold text-sm ">Read more</button>
            </Link>
           </div>
        </div>
     </div>
     </div>
        </>
      )
}