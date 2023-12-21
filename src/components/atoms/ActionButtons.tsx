import React from "react";

interface ActionButtonsProps {
  onFirebaseRegister: (e: React.FormEvent) => void;
  onAuth0Login: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onFirebaseRegister,
  onAuth0Login,
}) => {
  return (
    <div className="flex flex-row space-x-4">
      <button
        type="submit"
        className="bg-red-500 text-white rounded-md w-1/2 p-4 font-semibold text-lg transition duration-300 ease-in-out hover:bg-white hover:text-red-600 hover:border hover:border-red-400 hover:shadow-md"
        onClick={onFirebaseRegister}
      >
        Sign Up
      </button>
      <button
        type="submit"
        className="bg-red-500 text-white rounded-md w-1/2 p-4 font-semibold text-lg transition duration-300 ease-in-out hover:bg-white hover:text-red-600 hover:border hover:border-red-400 hover:shadow-md"
        onClick={onAuth0Login}
      >
        Sign In
      </button>
    </div>
  );
};

export default ActionButtons;
