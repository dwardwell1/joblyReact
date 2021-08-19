import React, {useContext} from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import userContext from "../UserContext";

function NavBar({logout}) {
  const user = useContext(userContext);


  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>
    
        {(user.username ? 
          <Nav className="ml-auto" navbar>
            {console.log(user)}
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile">My Profile</NavLink>
          </NavItem>
          <NavItem  onClick={logout}>
            <NavLink  to="/">Logout</NavLink>
            
          </NavItem> 
          </Nav>
          :
          <Nav className="ml-auto" navbar>
        
          <NavItem>
            <NavLink to="/login">Sign in</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Sign Up</NavLink>
            </NavItem> 
          </Nav>
            ) }
          
        
      </Navbar>
    </div>
  );
}

export default NavBar;
