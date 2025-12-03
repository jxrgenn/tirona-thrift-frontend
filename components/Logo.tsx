import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 200 50" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 10H40V18H29V40H21V18H10V10Z" />
    <path d="M45 10H53V40H45V10Z" />
    <path d="M58 10H75C80 10 83 13 83 18V22C83 25 81 27 77 28L84 40H75L69 29H66V40H58V10ZM66 18V22H74V18H66Z" />
    {/* Fixed O - now a symmetric rectangle instead of D-shaped */}
    <path d="M88 10H113V40H88V10ZM96 18V32H105V18H96Z" />
    <path d="M118 10H126L136 28V10H144V40H136L126 22V40H118V10Z" />
    <path d="M149 10H165L170 40H162L160 28H154L152 40H144L149 10ZM155 22H159L157 14L155 22Z" />
    
    {/* Stylized Star/Spark */}
    <path d="M185 5L188 20L200 25L188 30L185 45L182 30L170 25L182 20L185 5Z" className="text-[#ccff00]" fill="currentColor" />
  </svg>
);

export default Logo;