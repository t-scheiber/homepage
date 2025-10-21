import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface TileLinkProps {
  href: string;
  label: string;
  imageSrc: StaticImageData | string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  priority?: boolean;
  external?: boolean;
  download?: string;
  className?: string;
  imageClassName?: string;
}

export default function TileLink({
  href,
  label,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  priority = false,
  external = false,
  download,
  className,
  imageClassName,
}: TileLinkProps) {
  // Default tile styles
  const defaultClassName = "w-[400px] h-60 rounded-2xl bg-white/65 flex flex-col justify-center text-center transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-80 md:min-h-[220px] sm:w-80 sm:min-h-[200px] sm:p-4";
  
  const finalClassName = className || defaultClassName;
  
  const content = (
    <>
      <Image
        className={imageClassName || "mx-auto"}
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        priority={priority}
      />
      <p className="m-0 mt-2">{label}</p>
    </>
  );

  // For downloads, use regular anchor tag
  if (download) {
    return (
      <a href={href} download={download} className={finalClassName}>
        {content}
      </a>
    );
  }

  // For external links
  if (external) {
    return (
      <Link
        href={href}
        className={finalClassName}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${label} (opens in new tab)`}
      >
        {content}
      </Link>
    );
  }

  // For internal links
  return (
    <Link href={href} className={finalClassName} aria-label={`Go to ${label}`}>
      {content}
    </Link>
  );
}
