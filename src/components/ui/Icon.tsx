import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className,
  ...props
}) => {
  const spritePath = "/Sprite.svg";
  return (
    <svg
      className={`icon ${className || ""}`.trim()}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {/* 🛑 La magia del SVG Sprite: Referenciar el ID del símbolo */}
      <use href={`${spritePath}#${name}`} />
    </svg>
  );
};

export default Icon;
