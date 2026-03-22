"use client";
import React, { useState } from "react";
import Image from "next/image";

interface LeadershipImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  rounded?: boolean;
}

const LeadershipImage: React.FC<LeadershipImageProps> = ({ src, alt, className = "", width = 140, height = 140, rounded = true }) => {
  const [error, setError] = useState(false);
  const placeholder = "/logo.png";

  return (
    <Image
      src={error ? placeholder : src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${rounded ? "rounded-full" : "rounded-lg"} object-contain w-full h-full bg-white`}
      onError={() => setError(true)}
      priority
    />
  );
};

export default LeadershipImage;
