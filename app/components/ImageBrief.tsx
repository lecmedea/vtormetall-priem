type Props = {
  title: string;
  src: string;
  alt: string;
  compact?: boolean;
  priority?: boolean;
};

export function ImageBrief({ title, src, alt, compact = false, priority = false }: Props) {
  return (
    <figure className={`image-brief${compact ? " image-brief--compact" : ""}`}>
      {/* Generated photography is already compressed; explicit dimensions prevent layout shift. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={compact ? 1128 : 1672}
        height={compact ? 1410 : 940}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      <figcaption><span>ВТОРМЕТАЛЛ</span><strong>{title}</strong></figcaption>
    </figure>
  );
}
