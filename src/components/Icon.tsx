import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string; // El ID del símbolo en el sprite (ej: 'icon-carrito')
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, className, ...props }) => {
  
  // 💡 Importante: La ruta debe ser absoluta, apuntando a public/icons/sprite.svg
  const spritePath = "/icons/sprite.svg"; 

  return (
    <svg 
      className={className} 
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