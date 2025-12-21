import { cn } from "@/lib/utils";

interface ThreeRingLoaderProps {
  className?: string; // For passing CSS variables and additional classes
}

const ThreeRingLoader: React.FC<ThreeRingLoaderProps> = ({
  className = "",
}) => {
  return (
    <div
      className={cn(
        "loader-ring-root rounded-full grid border-[0.625rem] border-transparent border-r-burgundy animate-[spinner-rotate_1s_infinite_linear] size-card-half-size",
        className
      )}
    ></div>
  );
};

export default ThreeRingLoader;
