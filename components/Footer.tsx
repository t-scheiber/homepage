import { memo } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-5 relative bg-white/20 backdrop-blur-md rounded-b-2xl flex justify-around text-center box-border sm:p-4 sm:flex-col sm:items-center sm:gap-2 border border-white/30">
      <Link href="/" className="flex items-center gap-2 p-2 transition-all duration-200 hover:scale-105 sm:text-base sm:p-3 sm:w-full sm:max-w-[300px] sm:justify-center !text-white font-semibold !text-lg drop-shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-11 h-11 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span>Back to the Homepage</span>
      </Link>
    </footer>
  );
};

export default memo(Footer);
