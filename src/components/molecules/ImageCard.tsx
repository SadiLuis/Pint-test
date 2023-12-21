// ImageCard.tsx
import React, { useState, useEffect } from 'react';

interface ImageCardProps {
  image: GalleryImage;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    // Reset imageLoaded state when a new image is received
    setImageLoaded(false);
  }, [image]);

  return (
    <div className={`p-1 w-[5rem] ${imageLoaded ? 'image-loaded' : ''}`} onClick={onClick}>
      <div className="rounded-3xl overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="object-cover rounded-xl"
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default ImageCard;
