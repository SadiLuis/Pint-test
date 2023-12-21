import { Link } from 'react-router-dom';
import logo from '/pinterest.svg';

const Logo = () => {
  return (
    <Link to="/home" className="text-3xl text-red-500 mr-2">
      <img src={logo} alt="Pinterest" style={{ width: '32px', height: '32px' }} />
    </Link>
  );
};

export default Logo;
