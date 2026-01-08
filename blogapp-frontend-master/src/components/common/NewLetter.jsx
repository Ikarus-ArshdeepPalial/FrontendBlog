import {Link} from "react-router-dom";
export default function  Newsletter(){
    return (
        <div style={{height:'fit-content' , padding:'50px'}} className="w-full bg-[#CF462A] py-25">
         <div className="flex items-center justify-center font-bold text-white text-6xl mb-15"><h1 className="max-w-3xl">Get your stories delivered from us to your inbox weekly .</h1></div>
          <div className="flex justify-center mt-10">
          <input
            type="email"
            placeholder="Your email"
            style={{width:'400px'}}
            className="pl-5 h-90 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          <button className="ml-2 px-4 py-3 border border-white text-white font-bold rounded-lg hover:bg-red-800 cursor-pointer">Get started</button></div>
          <p className = "flex items-center justify-center text-white mt-10 px-50">Get a response today if you submit by 9 pm today. If we received after 9 pm, you will get a reponse the following day.</p>
        </div>
    );
}