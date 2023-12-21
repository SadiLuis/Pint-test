import React, { useEffect, useState } from 'react';
import ImageCard from '../molecules/ImageCard';
import { Masonry } from '@tx666/masonry';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../services/firebase';
import ImageDetails from '../molecules/ImageDetails';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

const ImageGallery: React.FC = () => {
  const [imagesFromPexels, setImagesFromPexels] = useState<any[]>([]);
  const [imagesFromFirestore, setImagesFromFirestore] = useState<FirestoreImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.pexels.com/v1/curated', {
          headers: {
            Authorization: import.meta.env.VITE_PEXEL_API,
          },
        });
        const data = await response.json();
        setImagesFromPexels(data.photos);
      } catch (error) {
        console.error('Error fetching images from Pexels:', error.message);
      }
    };

    const fetchDataFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'images'));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FirestoreImage[];
        setImagesFromFirestore(data);
      } catch (error) {
        console.error('Error fetching images from Firestore:', error.message);
      }
    };

    fetchData();
    fetchDataFromFirestore();
  }, []);

  const columns = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    xxl: 7,
  };

  const masonryDataFromPexels = imagesFromPexels.map((image) => ({ src: image.src.large2x, alt: image.photographer, title: image.photographer }));
  const masonryDataFromFirestore = imagesFromFirestore.map((image) => ({ src: image.imageUrl, alt: 'Firestore Image', title: 'Firestore Image' }));

  const combinedMasonryData = [...masonryDataFromPexels, ...masonryDataFromFirestore];

  return (
    <div>
      <Masonry data={combinedMasonryData} column={columns}>
        {combinedMasonryData.map((image, index) => (
          <ImageCard key={index} image={image} onClick={() => setSelectedImage(image)} />
        ))}
      </Masonry>
      {selectedImage && <ImageDetails image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default ImageGallery;
