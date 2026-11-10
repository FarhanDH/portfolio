import { useEffect, useRef, useState } from "react";
import {
  Trophy,
  GraduationCap,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Move,
  Maximize2,
} from "lucide-react";
import {
  type AchievementItem,
  FALLBACK_ACHIEVEMENTS,
} from "../data/achievementsData";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

export default function AchievementsSection() {
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(
    null,
  );
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const openModal = (item: AchievementItem) => {
    setSelectedItem(item);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(MAX_ZOOM, +(prev + ZOOM_STEP).toFixed(2)));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(MIN_ZOOM, +(prev - ZOOM_STEP).toFixed(2)));
  };

  const handleResetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleResetView();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setZoom((prev) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(prev + delta).toFixed(2))),
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore if pointer capture already released
    }
  };

  const handleDoubleClick = () => {
    if (zoom > 1) {
      handleResetView();
    } else {
      setZoom(2);
    }
  };

  return (
    <>
      <section
        id="achievements"
        className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs transition-colors duration-200"
      >
        {/* Header */}
        <div className="flex flex-col gap-1 mb-6 pb-4 border-b border-border">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Honors &amp; Awards
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Achievements
          </h2>
          <p className="text-sm text-muted-foreground">
            International and regional hackathon awards and innovation
            competitions. Click any certificate to inspect and zoom.
          </p>
        </div>

        {/* Achievement List */}
        <div className="flex flex-col divide-y divide-border">
          {FALLBACK_ACHIEVEMENTS.map((item) => (
            <article
              key={item.id}
              className="py-6 first:pt-0 last:pb-0 flex flex-col gap-4"
            >
              {/* Top Meta & Title */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-secondary border border-border text-foreground flex-shrink-0">
                    <Trophy size={12} />
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  Issued by{" "}
                  <span className="text-foreground font-medium">
                    {item.issuer}
                  </span>{" "}
                  · {item.date}
                </p>

                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="w-5 h-5 rounded-md bg-secondary border border-border flex items-center justify-center text-foreground flex-shrink-0">
                    <GraduationCap size={12} />
                  </span>
                  <span>Associated with {item.associatedWith}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Clickable Certificate Preview Thumbnail Row */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => openModal(item)}
                  className="group relative flex items-center gap-3.5 p-2 pr-4 rounded-xl border border-border bg-secondary/60 hover:bg-secondary hover:border-foreground/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer text-left shadow-2xs"
                  aria-label={`View certificate for ${item.title}`}
                >
                  {/* Certificate Image Thumbnail */}
                  <div className="relative w-28 sm:w-36 aspect-[16/10] rounded-lg overflow-hidden border border-border bg-card flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-card/90 backdrop-blur-xs border border-border flex items-center justify-center text-foreground shadow-sm group-hover:scale-110 transition-transform">
                        <Maximize2 size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Certificate Label & Hint */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      {item.certificateLabel}
                    </span>
                    {item.certificateId && (
                      <span className="font-mono text-[11px] text-muted-foreground">
                        ID: {item.certificateId}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-foreground font-medium mt-0.5">
                      <ZoomIn size={12} />
                      Click to zoom &amp; inspect
                    </span>
                  </div>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Zoomable & Draggable Certificate Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex flex-col animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          {/* Top Modal Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-card/90 border-b border-border z-10">
            <div className="flex flex-col min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-foreground truncate">
                {selectedItem.title}
              </h3>
              <span className="text-xs text-muted-foreground truncate">
                Issued by {selectedItem.issuer} · {selectedItem.date}
              </span>
            </div>

            {/* Zoom & Reset Controls */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary border border-border text-[11px] font-mono text-muted-foreground mr-1">
                <Move size={12} />
                <span>Drag to pan · Scroll to zoom</span>
              </div>

              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= MIN_ZOOM}
                className="p-2 rounded-lg bg-secondary hover:bg-accent border border-border text-foreground disabled:opacity-40 cursor-pointer transition-all hover:scale-105 active:scale-95"
                title="Zoom Out (-)"
                aria-label="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>

              <span className="font-mono text-xs font-semibold text-foreground min-w-[3.5rem] text-center px-1.5">
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= MAX_ZOOM}
                className="p-2 rounded-lg bg-secondary hover:bg-accent border border-border text-foreground disabled:opacity-40 cursor-pointer transition-all hover:scale-105 active:scale-95"
                title="Zoom In (+)"
                aria-label="Zoom In"
              >
                <ZoomIn size={16} />
              </button>

              <button
                type="button"
                onClick={handleResetView}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg bg-secondary hover:bg-accent border border-border text-xs font-medium text-foreground cursor-pointer transition-all hover:scale-105 active:scale-95"
                title="Reset Zoom & Position (0)"
                aria-label="Reset View"
              >
                <RotateCcw size={14} />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 cursor-pointer transition-all hover:scale-105 active:scale-95 ml-1"
                title="Close (Esc)"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Canvas Area */}
          <div
            className={`relative flex-1 overflow-hidden flex items-center justify-center select-none touch-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={handleDoubleClick}
          >
            {/* Backdrop Click Area when clicking outside image */}
            <div
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoom})`,
                transition: isDragging ? "none" : "transform 120ms ease-out",
              }}
              className="max-w-[90vw] max-h-[80vh] flex items-center justify-center"
            >
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                draggable={false}
                className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-xl border border-border shadow-2xl bg-card pointer-events-none"
              />
            </div>

            {/* Bottom Floating Mobile Hint */}
            <div className="sm:hidden absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-card/90 border border-border text-[11px] font-mono text-muted-foreground shadow-md pointer-events-none">
              Drag to move · Double-tap or use +/- to zoom
            </div>
          </div>
        </div>
      )}
    </>
  );
}
