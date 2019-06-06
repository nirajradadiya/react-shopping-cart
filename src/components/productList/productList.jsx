import React, { Component } from 'react';

// data
import items from './../../items.json';
import options from './../../options.json';

// material dependency
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

// components
import ProductCard from '../productItem/productItem';
import ProductItemDetail from '../productItemDetail/productItemDetail'
import HeaderHome from '../header/headerHome';
import Cart from '../cart/cart';

// css
import './productList.css';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
      isItemDetailOpen: false,
      pageSize: 12,
      selectedItem: '',
      radioChecked: '',
      radioQtyChecked: '',
      radioSelVal: 0.2,
      radioQtyVal: 0,
      checkBoxVal: 0,
      cartItems: [],
      snackBarOpen: false,
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleOperation = this.handleOperation.bind(this);

    this.handleCartOperation = this.handleCartOperation.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleChoices = this.handleChoices.bind(this);
    /* this.handleRadio = this.handleRadio.bind(this); */
    this.handleCartItems = this.handleCartItems.bind(this);

    this.handleCartOpen = this.handleCartOpen.bind(this);
    this.handleItemdetail = this.handleItemdetail.bind(this);
  }

  handleItemdetail(itemId) {
    this.setState({
      isItemDetailOpen: true,
      isCartOpen: false,
      pageSize: 6,
      selectedItem: itemId,
      radioChecked: '',
      radioQtyChecked: '',
      checkBoxVal: 0
    });
  }

  handleClose() {
    this.setState({ isItemDetailOpen: false, isCartOpen: false, pageSize: 12 });
  }

  handleCartOpen() {
    this.setState({ isCartOpen: true, pageSize: 6 });
  }

  handleChoices(val, e, type) {
    if (type === 'radio') {
      this.setState({ radioSelVal: parseFloat(e.target.value), radioChecked: val });
    }
    else if (type === 'radioQty') {
      this.setState({ radioQtyVal: parseFloat(e.target.value), radioQtyChecked: val });
    }
    else {
      let value = parseFloat(e.target.value);

      this.setState(e.target.checked ?
        {
          checkBoxVal: Math.round((this.state.checkBoxVal + value) * 100) / 100
        }
        :
        {
          ...this.state, checkBoxVal: Math.round((this.state.checkBoxVal - value) * 100) / 100
        }
      )
    }
  }

  handleOperation(val, e, operation) {
    if (operation === 'close') {
      this.handleClose(val);
    }
    else if (operation === 'AddToCart') {
      this.handleCartItems(val, e, operation);
    }
    else {
      this.handleChoices(val, e, operation);
    }
  }

  handleCartItems(val, e) {
    let valPrice = parseFloat(val.price.base_unit + '.' + val.price.exponent);
    let tempObj = {
      name: val.name,
      description: val.description,
      picture_url: val.picture_url,
      qty: 1,
      price: Math.round((valPrice + this.state.radioSelVal + this.state.radioQtyVal + this.state.checkBoxVal) * 100) / 100
    }
    this.setState({
      ...this.state, cartItems: [...this.state.cartItems, tempObj], snackBarOpen: true
    })

  }

  handleCartOperation(val, operation) {
    if (operation === 'close') {
      this.handleClose(val)
    }
    else {
      this.handleQuantity(val, operation);
    }
  }

  handleQuantity(item, operation) {
    if (operation === 'addQty') {
      const cartItems = this.state.cartItems;
      const cartItem = cartItems.find(x => x.name === item.name);
      cartItem.qty = cartItem.qty + 1;
      this.setState({ cartItems });
    }
    else {
      if (item.qty !== 1) {
        const cartItems = this.state.cartItems;
        const cartItem = cartItems.find(x => x.name === item.name);
        cartItem.qty = cartItem.qty - 1;
        this.setState({ cartItems });
      }
      else {
        console.log('max limit reached');
      }
    }
  }

  TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  handleCloseSnackBar = () => {
    this.setState({ snackBarOpen: false });
  }

  render() {

    return (
      <Grid className="main">
        <Grid container>
          <Grid item sm={this.state.pageSize}>
            <HeaderHome onClick={this.handleCartOpen} cartItems={this.state.cartItems} />
            <ProductCard items={items} pageSize={this.state.pageSize} onClick={this.handleItemdetail} />
          </Grid>
          <Grid item sm={6} className="main-shadow">
            <Drawer open={this.state.isItemDetailOpen} variant="persistent" anchor="right">
              <ProductItemDetail type="Detail" onClick={this.handleOperation} selectedItem={this.state.selectedItem} options={options}
                items={items} radioSelVal={this.state.radioSelVal} radioQtyVal={this.state.radioQtyVal} checkBoxVal={this.state.checkBoxVal}
                radioChecked={this.state.radioChecked} radioQtyChecked={this.state.radioQtyChecked} />
            </Drawer>
          </Grid>
          <Grid item sm={6} className="main-shadow">
            <Drawer className="drawer" variant="persistent" anchor="right" open={this.state.isCartOpen}>
              <Cart cartItems={this.state.cartItems} type="Cart" onClick={this.handleCartOperation} />
            </Drawer>

          </Grid>
        </Grid>

        <Snackbar
          open={this.state.snackBarOpen}
          onClose={this.handleCloseSnackBar}
          TransitionComponent={this.TransitionDown}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          action={[
            <div key="close" aria-label="Close" className="close-icon" color="inherit" onClick={this.handleCloseSnackBar}>
              x
            </div>,
          ]}
          message={<span id="message-id">Product added in cart</span>}
        />
        
      </Grid>
    )
  }
}