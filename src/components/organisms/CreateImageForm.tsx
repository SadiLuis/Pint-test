import React, { useState, ChangeEvent, FormEvent } from 'react';
import { storage, firestore } from '../../services/firebase';
import { useAuth } from '../../context/AuthProvider';
import { uploadBytes } from '@firebase/storage';
import { getDownloadURL, ref } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { IoMdCloudUpload } from "react-icons/io";

interface CreateImageFormProps {
  onSubmit?: (imageUrl: string) => void;
}

const CreateImageForm: React.FC<CreateImageFormProps> = ({ onSubmit }) => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { user } = useAuth();

  const uploadImageToFirebaseStorage = async (image: File | null): Promise<string> => {
    if (!image) {
      throw new Error('No se proporcionó ninguna imagen para subir.');
    }

    const storageRef = ref(storage, 'images/' + image.name);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.error('Usuario no autenticado.');
      return;
    }

    try {
      const imageUrl = await uploadImageToFirebaseStorage(image);

      const docRef = await addDoc(collection(firestore, 'images'), {
        userId: user.uid,
        imageUrl: imageUrl,
        title: title.trim(), // Agrega el título
        description: description.trim(), // Agrega la descripción
        timestamp: serverTimestamp(),
      });

      console.log('Imagen subida y documento agregado a Firestore con ID:', docRef.id);

      setImage(null);
      setTitle('');
      setDescription('');

      if (onSubmit) {
        onSubmit(imageUrl);
      }
    } catch (error) {
      console.error('Error durante la subida de imagen y escritura en Firestore:', error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-2xl mx-auto my-8 p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center"
    >
      <motion.form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-10 px-6 text-center"
        >
          <IoMdCloudUpload className="mx-auto text-gray-500 text-8xl" /> 
          <p className="mt-2 text-lg text-gray-600"> 
            Elige un archivo o arrástralo y suéltalo aquí
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Se recomienda usar archivos .jpg de alta calidad de menos de 20MB o archivos .mp4 que tengan menos de 200MB.
          </p>
        </motion.div>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label htmlFor="image" className="mt-4 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Selecciona una imagen
        </label>
        <div className="mt-4 w-full">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mt-4 w-full">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button type="submit" className="mt-4 p-2 bg-red-400 text-white rounded-md">
          Subir imagen
        </button>
      </motion.form>
    </motion.div>
  );
};

export default CreateImageForm;
