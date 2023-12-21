import React from 'react';

interface ImageDetailsProps {
  image: GalleryImage;
  onClose: () => void;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ image, onClose }) => {
  return (
    <div>
      <h2>{image.title}</h2>
      <img src={image.src} alt={image.alt} style={{ maxWidth: '100%' }} />
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ImageDetails;
