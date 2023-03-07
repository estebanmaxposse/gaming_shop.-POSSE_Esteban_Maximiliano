import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AvatarDropdown = () => {
  const { logout, user } = useAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Dropdown className="avatar" align="end">
        <Dropdown.Toggle className="avatar-toggle caret-off">
          <img
            src={user?.avatar || "https://i.imgur.com/3oHh4La.png"}
            className="avatar-img"
            referrerPolicy="no-referrer"
            alt="avatar"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header>{user.username || user.email}</Dropdown.Header>
          <li>
            <Link to={"/account"} className="dropdown-item">
              Account
            </Link>
          </li>
          <li onClick={handleLogout}>
            <span className="dropdown-item">Logout</span>
          </li>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default AvatarDropdown;
