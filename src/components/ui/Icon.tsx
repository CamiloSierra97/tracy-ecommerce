import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = "",
  ...props
}) => {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24" // Siempre fijo
      aria-hidden="true"
    >
      <use href={`/Sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
