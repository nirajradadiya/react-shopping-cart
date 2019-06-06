import React from 'react';

// material dependency
import Button from '@material-ui/core/Button';

// css
import './header.css';

const Header = (props) => {
  return (
    <div className="cart-title d-flex">

      <span>{props.type}</span>

      <span className="ml-auto">
        <Button color="inherit" onClick={() => props.onClick(props.type)}>X</Button>
      </span>

    </div>
  )
}
export default Header;