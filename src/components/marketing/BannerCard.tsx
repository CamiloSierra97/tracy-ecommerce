import Link from "next/link";
import Icon from "../ui/Icon";

interface BannerCardProps {
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
  bgClass: string;
  overlayClass: string;
  flexHoverClass?: string; // For future flexibility, though we use transform scale now
  titleColor?: string;
  descriptionColor?: string;
  linkColor?: string;
  linkBorderColor?: string;
  linkHoverColor?: string;
  linkHoverBorderColor?: string;
}

export default function BannerCard({
  title,
  description,
  linkHref,
  linkText,
  bgClass,
  overlayClass,
  titleColor = "text-gold",
  descriptionColor = "text-ivory",
  linkColor = "text-gold",
  linkBorderColor = "border-golden",
  linkHoverColor = "text-ivory",
  linkHoverBorderColor = "border-ivory",
}: BannerCardProps) {
  return (
    <section className="banner-card relative flex-1 group overflow-hidden flex flex-col justify-center items-center text-center p-10 cursor-pointer h-full">
      {/* Background Image with Scale Animation (No Reflow) */}
      <div
        className={`absolute inset-0 ${bgClass} bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110 z-0`}
      />

      {/* Overlay */}
      <div
        className={`banner-card__overlay absolute inset-0 ${overlayClass} transition-colors duration-500 z-10`}
      />

      <div className="banner-card__content relative z-20 flex flex-col items-center transform transition-transform duration-500 group-hover:-translate-y-2">
        <h2
          className={`banner-card__title text-5xl md:text-6xl ${titleColor} font-serif italic mb-4 tracking-wider drop-shadow-lg`}
        >
          {title}
        </h2>
        <p
          className={`banner-card__description ${descriptionColor} text-lg mb-8 max-w-xs font-sans font-light tracking-wide drop-shadow-sm`}
        >
          {description}
        </p>

        <Link
          href={linkHref}
          className={`banner-card__link inline-flex items-center gap-2 ${linkColor} border-b ${linkBorderColor} pb-1 hover:${linkHoverColor} hover:${linkHoverBorderColor} transition-all uppercase text-sm tracking-widest`}
        >
          {linkText} <Icon name="icon-arrow-right-dashed" size={16} />
        </Link>
      </div>
    </section>
  );
}
