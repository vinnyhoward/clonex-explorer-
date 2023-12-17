import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const SearchIcon: React.FC<LogoProps> = ({
  width = 25,
  height = 25,
  scale = 1,
  color = "#FFFFFF",
}) => {
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  return (
    <svg
      width={scaledWidth}
      height={scaledHeight}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M21.53 20.47L17.161 16.102C18.309 14.717 19 12.94 19 11C19 6.582 15.418 3 11 3C6.582 3 3 6.582 3 11C3 15.418 6.582 19 11 19C12.939 19 14.717 18.309 16.102 17.162L20.47 21.53C20.62 21.68 20.81 21.75 21 21.75C21.19 21.75 21.38 21.68 21.53 21.53C21.82 21.24 21.82 20.76 21.53 20.47Z"
        fill={color}
      />
    </svg>
  );
};
