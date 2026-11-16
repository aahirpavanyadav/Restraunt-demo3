"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { galleryImages } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowUpRight, ChevronLeft, ChevronRight, Close } from "../ui/Icons";
import styles from "./Gallery.module.css";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const active = activeIndex === null ? null : galleryImages[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeIndex !== null) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
    }
  }, [activeIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setActiveIndex(null);
    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
      document.body.style.overflow = "";
    };
  }, []);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null
        ? current
        : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % galleryImages.length,
    );
  };

  return (
    <section
      id="gallery"
      className={`section ${styles.gallery}`}
      aria-labelledby="gallery-title"
    >
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <SectionHeading
              id="gallery-title"
              eyebrow="The gallery"
              title={
                <>
                  A room best seen
                  <br />
                  <em>slowly.</em>
                </>
              }
              description="Late light, plates on their way to the pass, and the quiet theatre of a room filling up."
            />
          </Reveal>
          <Reveal delay={120} className={styles.aside}>
            <span>Autumn, in the room</span>
            <p>Photography from the dining room, the pass and the bar.</p>
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {galleryImages.map((image, index) => (
            <li key={image.src} className={styles.item}>
              <button
                type="button"
                className={styles.tile}
                onClick={() => setActiveIndex(index)}
                aria-label={`View larger image: ${image.caption}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={75}
                  sizes={
                    index === 0 || index === 5 || index === 6
                      ? "(max-width: 640px) 100vw, (max-width: 1023px) 66vw, 50vw"
                      : "(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  }
                  className={styles.img}
                />
                <span className={styles.caption}>{image.caption}</span>
                <span className={styles.zoom} aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label="Gallery image viewer"
        onClick={(event) => {
          if (event.target === dialogRef.current) setActiveIndex(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPrevious();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            showNext();
          }
        }}
      >
        {active ? (
          <div className={styles.lightboxInner}>
            <div className={styles.lightboxTop}>
              <span className={styles.counter}>
                {String((activeIndex ?? 0) + 1).padStart(2, "0")}
                <span aria-hidden="true"> / </span>
                {String(galleryImages.length).padStart(2, "0")}
              </span>
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                onClick={() => setActiveIndex(null)}
                aria-label="Close image viewer"
              >
                <Close />
              </button>
            </div>

            <div className={styles.stage}>
              <Image
                src={active.src}
                alt={active.alt}
                fill
                quality={88}
                sizes="92vw"
                className={styles.lightboxImage}
              />
            </div>

            <div className={styles.lightboxBottom}>
              <p>{active.caption}</p>
              <div className={styles.lightboxControls}>
                <button
                  type="button"
                  className={styles.control}
                  onClick={showPrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  className={styles.control}
                  onClick={showNext}
                  aria-label="Next image"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
