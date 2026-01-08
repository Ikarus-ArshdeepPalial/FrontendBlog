import ikarusLogo from '../../assets/ikarus-delta.png';
import {Link} from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-white text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="flex-col align-center md:flex md:justify-between md:items-center">
          {/* Logo / Brand */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-white"></h1>
            <p className="text-sm text-gray-400">
              <Link to="/signup"><img src={ikarusLogo} alt="" className=' h-20 ' /></Link>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 mt-5">
            <a href="/blog" className="text-black transition-colors hover:text-gray-500 px-3">
              Blog
            </a>
            <a href="#services" className="text-black transition-colors hover:text-gray-500 px-3">
              About
            </a>
            <a href="#contact" className="text-black transition-colors hover:text-gray-500 px-3">
              ContactUs
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-[#CF462A] w-f" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Copyright */}
         
          

         
        </div>
      </div>
    </footer>
  );
};

export default Footer;


