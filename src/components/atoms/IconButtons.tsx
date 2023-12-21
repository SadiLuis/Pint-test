import React from "react";
import { FaGoogle, FaFacebook, FaTwitter, FaVk } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const IconButtons = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/home')
      console.log(signInWithGoogle)
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };

  return (
    <div className="flex flex-row space-x-4 mb-4 text-gray-600 text-4xl justify-center">
      <FaGoogle
        className="rounded-full border border-gray-300 p-1 hover:bg-red-400 hover:text-white hover:duration-1000 cursor-pointer"
        onClick={handleGoogleLogin}
      />
      <FaFacebook className="rounded-full border border-gray-300 p-1 hover:bg-red-400 hover:text-white hover:duration-1000" />
      <FaTwitter className="rounded-full border border-gray-300 p-1 hover:bg-red-400 hover:text-white hover:duration-1000" />
      <FaVk className="rounded-full border border-gray-300 p-1 hover:bg-red-400 hover:text-white hover:duration-1000" />
    </div>
  );
};

export default IconButtons;
