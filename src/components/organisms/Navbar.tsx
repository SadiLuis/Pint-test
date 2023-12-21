import { Link } from 'react-router-dom';
import Logo from '../atoms/Logo';
import SearchBar from '../molecules/SearchBar';
import Menu from '../molecules/Menu';
import CreateButton from '../atoms/Button';
import { useAuth } from '../../context/AuthProvider';

const Navbar = () => {
  const { user } = useAuth();

  if (!user) {
    return null
  }
  return (
    <nav className="fixed w-full top-0 bg-white shadow shadow-white p-4 z-50">
      <div className="container mx-auto px-4" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', padding: '0.5rem 0' }}>
        {/* Logo y botón de crear */}
        <div className='flex items-center'>
          <Logo />
          <Link to="/home" className="text-xl text-gray-800 hover:rounded-full hover:text-white py-2 px-4 flex items-center hover:bg-black">
            Inicio
          </Link>
          <CreateButton/>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex items-center justify-center mr-2">
          <SearchBar />
        </div>

        {/* Iconos de navegación */}
        <Menu/>
      </div>
    </nav>
  );
};

export default Navbar;
