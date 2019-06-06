import React from 'react';

// material dependency
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

// images
import Icon from './../../images/shopping-cart.png';

const HeaderHome = (props) => {
  return (
    <div>
      <AppBar position="fixed" className="nav-bg">
        <Toolbar className="nav-bg">

          <Typography variant="h5">Shopping Mart</Typography>

          <Typography className="ml-auto">

            <Button color="inherit" onClick={props.onClick}>
              <Badge badgeContent={props.cartItems.length} color="secondary">
                <img src={Icon} alt='img' />
              </Badge>
            </Button>

          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default HeaderHome;