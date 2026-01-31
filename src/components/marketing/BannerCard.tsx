import Link from "next/link";
import Icon from "../ui/Icon";

export type BannerVariant = "women" | "men" | "junior";

interface BannerCardProps {
  variant: BannerVariant;
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
  bgClass: string;
}

const VARIANT_STYLES: Record<
  BannerVariant,
  {
    overlay: string;
    title: string;
    description: string;
    link: string;
    linkBorder: string;
    linkHover: string;
    linkHoverBorder: string;
  }
> = {
  women: {
    overlay: "bg-burgundy/50 group-hover:bg-burgundy/40",
    title: "text-gold",
    description: "text-ivory",
    link: "text-gold",
    linkBorder: "border-golden",
    linkHover: "text-ivory",
    linkHoverBorder: "border-ivory",
  },
  men: {
    overlay: "bg-black/70 group-hover:bg-black/40",
    title: "text-gold",
    description: "text-ivory",
    link: "text-golden",
    linkBorder: "border-golden",
    linkHover: "text-ivory",
    linkHoverBorder: "border-ivory",
  },
  junior: {
    overlay: "bg-pink/50 group-hover:bg-pink/20",
    title: "text-golden",
    description: "text-ivory",
    link: "text-ivory",
    linkBorder: "border-ivory",
    linkHover: "text-pink",
    linkHoverBorder: "border-pink",
  },
};

export default function BannerCard({
  variant,
  title,
  description,
  linkHref,
  linkText,
  bgClass,
}: BannerCardProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <section className="banner-card relative flex-1 group overflow-hidden flex flex-col justify-center items-center text-center p-10 cursor-pointer h-full">
      {/* Background Image with Scale Animation (No Reflow) */}
      <div
        className={`absolute inset-0 ${bgClass} bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110 z-0`}
      />

      {/* Overlay */}
      <div
        className={`banner-card__overlay absolute inset-0 ${styles.overlay} transition-colors duration-500 z-10`}
      />

      {/* Content */}
      <div className="banner-card__content relative z-20 flex flex-col items-center transform transition-transform duration-500 group-hover:-translate-y-2">
        <h2
          className={`banner-card__title text-5xl md:text-6xl ${styles.title} font-serif italic mb-4 tracking-wider drop-shadow-lg`}
        >
          {title}
        </h2>
        <p
          className={`banner-card__description ${styles.description} text-lg mb-8 max-w-xs font-sans font-light tracking-wide drop-shadow-sm`}
        >
          {description}
        </p>

        <Link
          href={linkHref}
          className={`banner-card__link inline-flex items-center gap-2 ${styles.link} border-b ${styles.linkBorder} pb-1 hover:${styles.linkHover} hover:${styles.linkHoverBorder} transition-all uppercase text-sm tracking-widest`}
        >
          {linkText} <Icon name="icon-arrow-right-dashed" size={16} />
        </Link>
      </div>
    </section>
  );
}
