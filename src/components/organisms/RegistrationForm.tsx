import IconButtons from "../atoms/IconButtons";
import ActionButtons from "../atoms/ActionButtons";
import Images from "../atoms/Images";
import Inputs from "../atoms/Input";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { SetStateAction, useState } from "react";



const Form = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, logIn } = useAuth();



  const handleFirebaseRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  };
  

  const handleFirebaseLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate('/home')
      console.log("Usuario inició sesión en Firebase");
    } catch (error) {
      console.error("Error al iniciar sesión en Firebase:", error.message);
    }
  };

  const imageURL = "/background.jpg";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="bg-white flex flex-col justify-center items-center">
        <form className="w-1/2 mx-autop-4">
          <h1 className="text-red-400 font-bold text-5xl p-8">Create Account</h1>
          <IconButtons />
          <p className="text-lg text-gray-500 mb-2">
            or use your email for registration:
          </p>
          
          <Inputs
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
          />
          
          <Inputs
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
          />
          <Inputs
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2 h-6 w-6 text-red-500 focus:ring-2 focus:ring-red-500"
            />
            <span>
              I agree to the <strong className="text-red-400">Terms</strong> and{" "}
              <strong className="text-red-400">Privacy Policy</strong>.
            </span>
          </label>
          <ActionButtons
            onFirebaseRegister={handleFirebaseRegister}
            onAuth0Login={handleFirebaseLogin}
          />
        </form>
      </div>

      <div className="hidden sm:block">
        <Images url={imageURL} />
      </div>
    </div>
  );
};

export default Form;
