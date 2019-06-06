import React from 'react';

// material depedency
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ProductCard = (props) => {

  return (
    <Grid container spacing={3} className="p-15">

      {props.items.map((element, index) => {

        return (
          <Grid item sm={props.pageSize === 12 ? 3 : 6} key={index}>

            <Button className="product-btn" onClick={() => props.onClick(element.item_id)}>

              <Grid item className="item-container">
                <img className="product-img" src={element.picture_url} alt="img" />

                <Grid className="product-detail">
                  <Typography className="product-name">
                    {element.name}
                  </Typography>

                  <Grid className="product-price">
                    <span className="product-price">{element.price.base_unit + '.'}
                      <sup>{element.price.exponent}</sup>
                    </span>
                    <span className="product-price-unit">{element.price.iso_4217}</span>
                  </Grid>

                </Grid>

              </Grid>
            </Button>
          </Grid>

        )
      })}

    </Grid>
  )
}
export default ProductCard;