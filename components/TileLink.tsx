import { memo } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { TILE_BUTTON_CLASS } from "@/lib/constants";

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

function TileLink({
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
  const defaultClassName = TILE_BUTTON_CLASS;

  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  const finalImageClassName = imageClassName
    ? `mx-auto object-contain ${imageClassName}`
    : "mx-auto h-14 w-14 object-contain sm:h-16 sm:w-16";

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
      <p
        className={`${textMargin} text-slate-900 text-[clamp(1rem,1.4vw,1.2rem)] font-medium tracking-wide leading-tight sm:text-[clamp(1.05rem,1.2vw,1.35rem)]`}
      >
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

export default memo(TileLink);
