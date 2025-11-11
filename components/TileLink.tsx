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
  textMargin?: string;
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
  textMargin = "mt-[0.5vh]",
}: TileLinkProps) {
  // Default tile styles
  const defaultClassName =
    "group relative flex w-full h-full cursor-pointer flex-col items-center justify-center gap-[0.5vh] rounded-2xl bg-white/60 p-[1vh] text-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-[1vh] sm:gap-[0.5vh]";

  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  const finalImageClassName = imageClassName
    ? `mx-auto object-contain ${imageClassName}`
    : "mx-auto h-[6vh] w-[6vh] object-contain";

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
      <p className={`${textMargin} text-[0.75vw] font-light tracking-wide leading-normal sm:${textMargin} sm:text-[1.35vw]`}>
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
