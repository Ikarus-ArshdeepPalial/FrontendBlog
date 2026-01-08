import React from "react";
import bcard1 from '../../assets/bcard1.png';
import bcard2 from '../../assets/bcard2.png';
import bcard3 from '../../assets/bcard3.png';
import { getPosts } from "../../services.js";
import { useEffect, useState } from "react";

export default function BlogCard() {

  const[posts, setPosts]=React.useState(null);
  useEffect(()=>{
    getPosts().then((data)=>
      setPosts(data));
  },[]);

return (
<div className="grid grid-cols-3 gap-4 px-10 py-10 max-w-7xl mx-auto">
  <div className="">
    <div>
        <img src={bcard1} alt="" className="rounded-xl"/>
        <p className='text-gray-500 mb-6 text-sm font-bold mt-5'>June 15, 2024</p></div>
    <div className="font-bold text-md mb-3"><h3>{posts?.[0]?.title}</h3></div>
    <p>{posts?.[0]?.body}</p>
   <a href="/blog1" className="text-[#CF462A] font-bold text-sm ">Read more...</a>
  </div>
  <div className="">
    <div><img src={bcard2} alt="" className="rounded-xl"/>
    <p className='text-gray-500 mb-6 text-sm font-bold mt-5'>June 15, 2024</p></div>
    <div className="font-bold text-md mb-3"><h3>{posts?.[1]?.title}</h3></div>
    <p>{posts?.[1]?.body}</p>
    <a href="/blog1" className="text-[#CF462A] font-bold text-sm ">Read more...</a>
  </div>
  <div className="">
    <div><img src={bcard3} alt="" className="rounded-xl"/>
    <p className='text-gray-500 mb-6 text-sm font-bold mt-5'>June 15, 2024</p></div>
    <div className="font-bold text-md mb-3"><h3>{posts?.[2]?.title}</h3></div>
    <p>{posts?.[2]?.body}</p>
    <a href="/blog1" className="text-[#CF462A] font-bold text-sm ">Read more...</a>
  </div>
</div>

)

}