import React from 'react';

// material dependency
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';

// components
import Header from '../header/header';

// css
import './cart.css';

const Cart = (props) => {

  if (props.cartItems.length === 0) {
    return (<>
      <Header type={props.type} onClick={() => props.onClick(props.type, 'close')} />
      <Grid className="no-product-found ">
        <span> <b> No Products found. </b> </span>
      </Grid>
    </>)
  }

  let totalPrice = 0;
  props.cartItems.forEach(item => {
    totalPrice = totalPrice + (item.qty * item.price)
  });

  return (
    <Grid>
      <Header type={props.type} onClick={() => props.onClick(props.type, 'close')} />

      <Grid className="p-15 main-shadow">
        {
          props.cartItems.map((item, index) => {
            return (
              <Card className="mt-10" key={index}>
                <CardContent>
                  <Grid container spacing={3} className="d-flex align-item-center">

                    <Grid item sm={3}>
                      <img className="img-box" src={item.picture_url} alt="img" />
                    </Grid>

                    <Grid item sm={4}>
                      <Typography className="product-name">{item.name}</Typography>
                      <Typography>{item.description}</Typography>
                    </Grid>

                    <Grid item sm={3}>
                      <Fab size="small" color="secondary" aria-label="Add" onClick={() => props.onClick(item, 'addQty')}>
                        +
                      </Fab>
                      <b>&nbsp;{item.qty}&nbsp;</b>
                      <Fab size="small" color="secondary" aria-label="Add" onClick={() => props.onClick(item, 'subQty')}>
                        -
                      </Fab>
                    </Grid>

                    <Grid item sm={2}>
                      <Typography>{(item.price * item.qty).toFixed(2)} USD</Typography>
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            )
          })
        }

        <Grid className="item-total">
          <span> <b>Total: </b>{totalPrice.toFixed(2)} </span>
          <Button variant="outlined" className="btn-theme proceed-to-cart">Proceed to Buy</Button>

        </Grid>

      </Grid>
    </Grid>
  )
}

export default Cart;