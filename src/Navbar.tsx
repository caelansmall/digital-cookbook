import { useAuth } from './providers/AuthProvider';
import './styling/navbar.css';
import { UserOutlined, FileAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from 'antd';

const apiUrl = import.meta.env.VITE_BASE_API;

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.username || 'Login';

  const openProfile = () => {
    console.log('opening profile');
  }

  const queryLogin = async () => {
    console.log('Queueing login...');
    window.location.href = `${apiUrl}/login`;
    // try {
    //   await fetch(`${apiUrl}/login`,
    //     {
    //       credentials: 'include',
    //     }).then(res => res.json()
    //   ).then(data => navigate(data.cognitoLoginURL))
    // } catch (error) {
    //   console.error(error);
    // }
  }

  const createRecipe = () => {
    navigate("/recipe/create");
  }

  return (
    <nav className="navbar">

      <div className="navbar-left">

        <Tooltip title="Create recipe">
          <Button 
            className="custom-button"
            shape="round"
            variant="outlined"
            size='large'
            onClick={createRecipe}
            icon={<FileAddOutlined />}
            iconPlacement='end'  
          ></Button>
        </Tooltip>

      </div>

      <div className="navbar-center">
        <img
          src="/digital_cookbook.svg"
          alt="Digital Cookbook"
          width={190}
          height={35}
          style={{ cursor: 'pointer' }}
          onClick={ () => navigate("/feed")}
        />
      </div>

      <div className="navbar-right">
        <Button 
          className="username"
          onClick={user ? openProfile : queryLogin}
          icon={ <UserOutlined /> }
          iconPlacement='end'
        >
          {displayName}
        </Button>
      </div>

    </nav>

  )
}

export default Navbar;
