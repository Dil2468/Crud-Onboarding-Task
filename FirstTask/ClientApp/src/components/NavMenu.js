import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const NavMenu = () => {
  return (
    <div>
      <Menu inverted>
        <Menu.Item active as={NavLink} to="/" name="React" />
        <Menu.Item as={NavLink} to="/Customer" name="Customer" />
        <Menu.Item as={NavLink} to="/Product" name="Product" />
        <Menu.Item as={NavLink} to="/Store" name="Store" />
        <Menu.Item as={NavLink} to="/Sales" name="Sales" />
      </Menu>
    </div>
  );
};

export default NavMenu;
