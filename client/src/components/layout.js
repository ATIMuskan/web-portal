import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="bg-gray-100">
     
      <nav className="bg-blue-500 p-4">
        <ul className="flex space-x-6 justify-right">
         
          <li>
            <Link 
              to="/" 
              className="text-white text-lg font-semibold hover:text-blue-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link 
              to="/signup" 
              className="text-white text-lg font-semibold hover:text-blue-300"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link 
              to="/ask-us" 
              className="text-white text-lg font-semibold hover:text-blue-300"
            >
              Ask Us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Layout;
