import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const AcademyIcon: React.FC<IconProps> = ({ size = 32, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="academyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFAA00" />
          <stop offset="50%" stopColor="#00AAFF" />
          <stop offset="100%" stopColor="#556BFF" />
        </linearGradient>
      </defs>
      <path
        d="M32 4L6 20l26 16 26-16L32 4Z"
        fill="url(#academyGradient)"
        stroke="#222"
        strokeWidth="2"
      />
      <path
        d="M10 24v24c0 2 2 4 4 4h36c2 0 4-2 4-4V24"
        stroke="#222"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M22 44h20"
        stroke="#222"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M26 48h12"
        stroke="#222"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AcademyIcon;