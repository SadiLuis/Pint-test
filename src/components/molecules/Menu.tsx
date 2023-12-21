// components/molecules/Menu.js
import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const Menu = () => {
  const {user} = useAuth();
  const [menu, setMenu] = useState(false);
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    setMenu(false);
    navigate('/')

  };

  return (
    <div className="flex -mr-14 text-2xl items-center justify-end space-x-6">
      <Link to="" className="text-gray-500 hover:text-red-500 duration-700">
        <FaBell />
      </Link>
      <div className="relative" onClick={() => setMenu(!menu)}>
        <FaUserCircle className="text-gray-500 hover:text-red-500 duration-1000" />
        <div className={`absolute right-0 top-8 bg-white border border-gray-300 rounded-md py-2 px-4 w-48 ${menu ? 'block' : 'hidden'}`}>
          <h3 className=' text-gray-500 text-xl hover:text-red-500'> {user?.email} </h3>
          <button onClick={handleLogout} className="block text-gray-500  hover:text-red-500 duration-1000">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
