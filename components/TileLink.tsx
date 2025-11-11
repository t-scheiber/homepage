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
  const defaultClassName =
    "group relative flex w-full h-full cursor-pointer flex-col items-center justify-center gap-[0.5vh] rounded-2xl bg-white/60 p-[1vh] text-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-[clamp(0.75rem,1.5vh,1.25rem)] sm:gap-[clamp(0.25rem,0.75vh,0.5rem)]";

  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  const finalImageClassName = imageClassName
    ? `mx-auto object-contain ${imageClassName}`
    : "mx-auto h-[clamp(2.5rem,6vh,5rem)] w-[clamp(2.5rem,6vh,5rem)] object-contain";

  const content = (
    <>
      <Image
        className={finalImageClassName}
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        priority={priority}
      />
      <p className="mt-[0.5vh] text-[1.25vw] font-light tracking-wide leading-normal sm:mt-[clamp(0.125rem,0.5vh,0.5rem)] sm:text-[clamp(1.25rem,2.25vw,1.625rem)]">
        {label}
      </p>
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
