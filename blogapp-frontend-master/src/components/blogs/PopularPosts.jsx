// import React from 'react';
// import bcard1 from '../../assets/bcard1.png';
// import bcard2 from '../../assets/bcard2.png';
// import bcard3 from '../../assets/bcard3.png';
// import imageplaceholder from '../../assets/Image-placeholder.png';
// export default function PopularPosts() {   
//     return (  
//         <>
//      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 justify-between flex items-center">
//         <h1 className='text-5xl font-bold'>Popular Post</h1>
//         <button className="mt-10 text-white bg-[#DA634B]  px-10 py-4 rounded-lg font-medium">View All</button>
//      </div>
//     <div className="grid grid-cols-3 gap-4 px-10 py-10 max-w-7xl mx-auto">

//         <div className="">
//             <div>
//                 <img src={bcard1} alt="" className="rounded-xl"/>
//                 <p className='text-gray-500 mb-6 text-sm font-bold mt-5'>June 15, 2024</p></div>
//             <div className="font-bold text-md mb-3"><h3>Blog Title 1</h3></div>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque molestias debitis aperiam neque, dolore necessitatibus!</p>
//            <a href="/blog1" className="text-[#CF462A] font-bold text-sm ">Read more...</a>
//           </div>
//  <div className="">
//             <div>
//                 <img src={bcard1} alt="" className="rounded-xl"/>
//                 <p className='text-gray-500 mb-6 text-sm font-bold mt-5'>June 15, 2024</p></div>
//             <div className="font-bold text-md mb-3"><h3>Blog Title 1</h3></div>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque molestias debitis aperiam neque, dolore necessitatibus!</p>
//            <a href="/blog1" className="text-[#CF462A] font-bold text-sm ">Read more...</a>
//           </div>
//            <div className="">
//             <div>
//                 <img src={bcard1} alt="" className="rounded-xl"/>
//                 <p className='text-gray-500 mb-6 text-sm font-bold mt-5'>June 15, 2024</p></div>
//             <div className="font-bold text-md mb-3"><h3>Blog Title 1</h3></div>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque molestias debitis aperiam neque, dolore necessitatibus!</p>
//            <a href="/blog1" className="text-[#CF462A] font-bold text-sm ">Read more...</a>
//           </div>
//            <div className="">
//             <div>
//                 <img src={bcard1} alt="" className="rounded-xl"/>
//                 <p className='text-gray-500 mb-6 text-sm font-bold mt-5'>June 15, 2024</p></div>
//             <div className="font-bold text-md mb-3"><h3>Blog Title 1</h3></div>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque molestias debitis aperiam neque, dolore necessitatibus!</p>
//            <a href="/blog1" className="text-[#CF462A] font-bold text-sm ">Read more...</a>
//           </div>
//            <div className="">
//             <div>
//                 <img src={bcard1} alt="" className="rounded-xl"/>
//                 <p className='text-gray-500 mb-6 text-sm font-bold mt-5'>June 15, 2024</p></div>
//             <div className="font-bold text-md mb-3"><h3>Blog Title 1</h3></div>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque molestias debitis aperiam neque, dolore necessitatibus!</p>
//            <a href="/blog1" className="text-[#CF462A] font-bold text-sm ">Read more...</a>
//           </div>
//            <div className="">
//             <div>
//                 <img src={bcard1} alt="" className="rounded-xl"/>
//                 <p className='text-gray-500 mb-6 text-sm font-bold mt-5'>June 15, 2024</p></div>
//             <div className="font-bold text-md mb-3"><h3>Blog Title 1</h3></div>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque molestias debitis aperiam neque, dolore necessitatibus!</p>
//            <a href="/blog1" className="text-[#CF462A] font-bold text-sm ">Read more...</a>
//           </div>
//     </div>
//         </>
//       )


// }

import BlogCard from "../common/BlogCard";
import { Link } from "react-router-dom";

export default function PopularPosts({ posts, loading}) {
  if (loading) return <p>Loading...</p>;
  return (
    <><div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 justify-between flex items-center">
    <h1 className='text-5xl font-bold'>Popular Post</h1>
      <Link to="/blog">
      <button className="mt-10 text-white bg-[#DA634B]  px-10 py-4 rounded-lg font-medium">View All</button>
      </Link>
      </div>
      <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto px-6 py-12">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.name}
            body={post.summary.substring(0,100)}
            category={post.category}
            image={post.thumbnail}
            created_at={post.created_at}
          />
        ))}
        
      </div>
    </>
  );
}