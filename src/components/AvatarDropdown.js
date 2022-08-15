import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const AvatarDropdown = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log("You're logged out");
        } catch (e) {
            console.log(e.message);
        };
    };

  console.log(currentUser?.photoURL);
    
  return (
    <>
      <Dropdown className="avatar" align='end'>
        <Dropdown.Toggle className="avatar-toggle caret-off">
          <img src={currentUser?.photoURL || "https://i.imgur.com/3oHh4La.png"} className="avatar-img" referrerpolicy="no-referrer"/>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header>Username</Dropdown.Header>
          <Dropdown.Item><Link to={'/account'}>Account</Link></Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default AvatarDropdown;
