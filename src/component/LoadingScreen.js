 import jkdIcon from "../../public/jkd-icon.png"
import Image from "next/image";

 const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  p-4">
      {/* Define the spinning keyframe animation directly in a style block 
        since we are using Tailwind via the CDN import in the main App component.
      */}
      {/* <style>
        {`
          @keyframes spin-360 {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-infinite {
            animation: spin-360 1.5s linear infinite;
          }
        `}
      </style> */}
            <style>
        {`
          @keyframes opacity-0-100 {
            from {
              opacity: 100%;
            }
            to {
              opacity: 0%;
            }
          }
          .animate-spin-infinite {
            animation: opacity-0-100 1.5s linear infinite;
          }
        `}
      </style>
      <div className="w-24 h-24 mb-6">
        {/*
          Custom SVG representing the user's logo.
          The custom CSS class 'animate-spin-infinite' is applied here.
        */}
        <Image  src={jkdIcon} alt="***" className="w-full h-full animate-spin-infinite transition-opacity duration-150" />
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          // Apply the new class for continuous rotation
          className="w-full h-full animate-spin-infinite transition-opacity duration-150"
          fill="none"
        >
          {/* Main Figure/Body (Blue sphere) 
          <circle cx="50" cy="65" r="12" fill="#1C7ED6" />
          {/* Stylized Arms/Energy (Orange and Teal curves) 
          <path d="M 30 75 C 20 65, 20 40, 45 40" stroke="#F76707" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M 70 75 C 80 65, 80 40, 55 40" stroke="#10B981" strokeWidth="6" fill="none" strokeLinecap="round"/>
          {/* Leaf/Floral Element (Above the head) 
          <g transform="translate(50, 25)" fill="#0E9AA7">
            {/* 4 stylized leaves/petals 
            <ellipse cx="0" cy="-10" rx="6" ry="12" transform="rotate(0)" fill="#10B981" />
            <ellipse cx="0" cy="-10" rx="6" ry="12" transform="rotate(90)" fill="#1C7ED6" />
            <ellipse cx="0" cy="-10" rx="6" ry="12" transform="rotate(180)" fill="#10B981" />
            <ellipse cx="0" cy="-10" rx="6" ry="12" transform="rotate(270)" fill="#1C7ED6" />
            {/* Center connector 
            <circle cx="0" cy="0" r="4" fill="#1C7ED6" />
          </g>
        </svg> */}
      </div>
      <p className="text-xl font-semibold text-gray-700 tracking-wider">Loading Content...</p>
    </div>
  );
};

export default LoadingScreen;