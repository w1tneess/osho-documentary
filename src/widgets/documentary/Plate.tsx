import { IMAGE_MANIFEST } from '../../entities/content/imageManifest';

export interface PlateProps {
  /** Logical plate path, e.g. '/images/osho/osho-portrait'. */
  src: string;
  alt: string;
  /** The `sizes` this plate's role actually renders at. */
  sizes: string;
  eager?: boolean;
}

/**
 * An archival plate.
 *
 * Every plate in the documentary is a responsive `<picture>` with a real
 * `srcset` and intrinsic `width`/`height`. Three things depend on it:
 *
 *   • The browser reserves the correct box before a byte of the image arrives,
 *     so a slow connection reflows once instead of jumping eleven times.
 *   • The right derivative is fetched for the right display size. The hero
 *     portrait is 240 CSS pixels wide; the original is 900. Shipping the
 *     original costs 267KB for 34KB of pixels.
 *   • The aspect ratio survives, so the CSS role and the file's proportions
 *     cannot disagree and produce a squashed face.
 */
export function Plate({ src, alt, sizes, eager = false }: PlateProps) {
  const entry = IMAGE_MANIFEST[src];
  if (!entry) {
    // A plate with no manifest entry is a content bug, not a runtime one. The
    // verification script fails the build for this; rendering the original
    // keeps the page complete if it ever ships anyway.
    return (
      <div className="plate-figure__frame">
        <img className="plate-figure__img" src={`${src}.jpg`} alt={alt} loading="lazy" />
      </div>
    );
  }

  const srcset = entry.webp.map((v) => `${v} ${parseInt(v.match(/-(\d+)\./)?.[1] ?? '0', 10)}w`);

  return (
    <picture>
      {srcset.length > 0 && <source type="image/webp" srcSet={srcset.join(', ')} sizes={sizes} />}
      <img
        className="plate-figure__img"
        src={entry.fallback ?? entry.webp[0]}
        alt={alt}
        width={entry.width}
        height={entry.height}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </picture>
  );
}
