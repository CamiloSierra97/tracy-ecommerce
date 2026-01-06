import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  /**
   * Si es true (por defecto), el icono se considera decorativo y se ocultará de la tecnología de asistencia.
   * Establezca en falso y proporcione `ariaLabel` para los iconos informativos.
   */
  decorative?: boolean;
  /**
   * Etiqueta accesible para iconos informativos. Necesaria cuando `decorative` es falso.
   */
  ariaLabel?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = "",
  decorative = true,
  ariaLabel,
  ...props
}) => {
  const ariaProps = decorative
    ? { "aria-hidden": true }
    : { role: "img", "aria-label": ariaLabel };

  return (
    <svg
      className={`inline-block shrink-0 ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      focusable="false"
      {...ariaProps}
      {...props}
    >
      <use href={`/Sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
