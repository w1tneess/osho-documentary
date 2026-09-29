import { useAppStore } from '../../features/store';
import { describeSection } from '../../features/useSectionTracking';
import { documentary } from '../../entities/content/documentary';

interface NavProps {
  onOpenIndex: () => void;
  indexOpen: boolean;
  audioOn: boolean;
  onToggleAudio: () => void;
}

/**
 * The navigation bar.
 *
 * Furniture, not content. It carries the imprint, the current position, and two
 * controls; everything else is behind the index. It is set in mono at a small
 * size against a gradient scrim, and it deliberately contains exactly one
 * accent-coloured element at a time.
 *
 * The chapter readout is a real button that opens the contents — that gives the
 * primary navigation a keyboard-reachable, labelled target rather than a div.
 */
export function NavigationHeader({
  onOpenIndex,
  indexOpen,
  audioOn,
  onToggleAudio,
}: NavProps) {
  const sectionIndex = useAppStore(s => s.sectionIndex);
  const { label: sectionLabel, ordinal: sectionOrdinal, short: shortLabel } = describeSection(sectionIndex, documentary.chapters);
  return (
    <header className="nav">
      <p className="nav__imprint">
        <strong>Osho</strong>
        <span>/ Documentary</span>
      </p>

      <button
        type="button"
        className="nav__chapter"
        onClick={onOpenIndex}
        aria-expanded={indexOpen}
        aria-controls="index-drawer"
      >
        <span className="nav__chapter-index">{sectionOrdinal}</span>
        <span className="nav__chapter-title">{sectionLabel}</span>
        {/* The ordinal alone is a position without a referent. On a narrow bar
            the full title will not fit, so a short noun takes its place. */}
        <span className="nav__chapter-short">{shortLabel}</span>
      </button>

      <div className="nav__actions">
        <button
          type="button"
          className="nav__btn"
          onClick={onToggleAudio}
          aria-pressed={audioOn}
        >
          <span className="nav__level" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="nav__btn-label">{audioOn ? 'Sound on' : 'Sound off'}</span>
          <span className="sr-only">Ambient soundscape</span>
        </button>

        <button
          type="button"
          className="nav__btn"
          onClick={onOpenIndex}
          aria-expanded={indexOpen}
          aria-controls="index-drawer"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 4h12M2 8h12M2 12h8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="nav__btn-label">Index</span>
          <span className="sr-only">Open the table of contents</span>
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {sectionLabel}
      </span>
      <span className="sr-only">{`Section ${sectionIndex + 1} of ${documentary.chapters.length + 4}`}</span>
    </header>
  );
}
