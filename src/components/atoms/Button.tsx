import React from 'react';
import { Link } from 'react-router-dom';

const CreateButton = () => {
  return (
    <Link to="/create" className="text-xl text-gray-800 hover:rounded-full hover:text-white py-2 px-4 flex items-center hover:bg-black">
      Crear
    </Link>
  );
};

export default CreateButton;
