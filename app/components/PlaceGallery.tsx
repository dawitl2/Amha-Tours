"use client";

import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

export function PlaceGallery({ images, placeName }: { images: GalleryImage[]; placeName: string }) {
  const [active, setActive] = useState(0);
  const galleryImages = images.length > 0 ? images : [{ src: "/Addis highlights.webp", alt: `${placeName} in Addis Ababa` }];

  const show = (index: number) => {
    setActive((index + galleryImages.length) % galleryImages.length);
  };

  return (
    <div
      className="place-gallery"
      aria-label={`${placeName} image gallery`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") show(active - 1);
        if (event.key === "ArrowRight") show(active + 1);
      }}
    >
      <div className="gallery-stage">
        <img src={galleryImages[active]?.src} alt={galleryImages[active]?.alt} />
        <div className="gallery-count" aria-live="polite">{active + 1} / {galleryImages.length}</div>
        <button className="gallery-arrow gallery-prev" type="button" aria-label="Previous image" onClick={() => show(active - 1)}>
          &larr;
        </button>
        <button className="gallery-arrow gallery-next" type="button" aria-label="Next image" onClick={() => show(active + 1)}>
          &rarr;
        </button>
      </div>
      <div className="gallery-thumbs" aria-label="Choose an image">
        {galleryImages.map((image, index) => (
          <button
            className={index === active ? "is-active" : ""}
            type="button"
            key={image.src}
            onClick={() => show(index)}
            aria-label={`Show image ${index + 1}: ${image.alt}`}
            aria-current={index === active ? "true" : undefined}
          >
            <img src={image.src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
