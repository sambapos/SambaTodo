import React from 'react';
import AppBar from 'material-ui/AppBar';

const style = {
  position: 'fixed',
  top:0
};

const Header = () => (
  <AppBar
    style= {style}
    title="SambaPOS Todo"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

export default Header;