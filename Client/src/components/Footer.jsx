// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <span className="text-white font-bold">Khlix Academy</span>
          </div>

          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Khlix Academy. All rights reserved.
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";

// const Footer = () => {
//   return (
//     <div className="bg-gray-900 grid grid-cols-4 items-center text-md text-white p-4 gap-4 ">
//       <div className="text-3xl text-indigo-600 font-bold ">
//         KHLIX
//         <span className="text-indigo-400">Academy</span>
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         <p className=" hover:opacity-35 cursor-pointer">FaceBook</p>
//         <p>Insatagrm</p>
//         <p>Twitter</p>
//         <p>Github</p>
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         <p className="">FaceBook</p>
//         <p>Insatagrm</p>
//         <p>Twitter</p>
//         <p>Github</p>
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         <p className="">FaceBook</p>
//         <p>Insatagrm</p>
//         <p>Twitter</p>
//         <p>Github</p>
//       </div>
//     </div>
//   );
// };

// export default Footer;
