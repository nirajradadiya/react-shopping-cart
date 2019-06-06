import React from 'react';

// material dependency
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// components
import Header from '../header/header';

// css
import './productItemDetail.css';

const ProductItemDetail = (props) => {

  const selectedProduct = props.selectedItem;
  const filterItem = props.items.filter(item => item.item_id === selectedProduct);

  if (!filterItem.length) {
    return null;
  }

  const price = filterItem.length !== 0 ? parseFloat(filterItem[0].price.base_unit + '.' + filterItem[0].price.exponent) + props.checkBoxVal + props.radioQtyVal + props.radioSelVal : 0;


  return (
    <div>
      <Grid >
        <Header type={props.type} onClick={(e) => props.onClick(props.type, e, 'close')} />
        <Grid container spacing={3} className="p-15">

          <Grid item xs={4}>
            <img className="product-img" src={filterItem[0].picture_url} alt="img" />
          </Grid>

          <Grid item xs={8}>

            <Grid className="d-flex">
              <Typography className="product-name">{filterItem[0].name}</Typography>
              <Typography className="product-price ml-auto">
                {price.toFixed(2) + ' ' + filterItem[0].price.iso_4217}</Typography>
            </Grid>

            <Typography className="item-description">{filterItem[0].description}</Typography>

            {/* for the section_names  */}
            {props.options[selectedProduct] && props.options[selectedProduct].map((item, index) =>
              <Grid key={index}>
                <span className="category-title">{item.section_name}</span>

                {/* section choices */}
                {item.uitype === "RADIO" && (
                  <Grid className="choices">
                    {item.choices.map((choice, index2) =>
                      <Grid key={index2}>
                        <Radio name={item.section_name} checked={props.radioChecked ? (props.radioChecked === choice.name) : (index2 === 0)} onClick={(e) => props.onClick(choice.name, e, 'radio')} value={choice.price.base_unit + '.' + choice.price.exponent} required={item.required} />{choice.name + ' '}<b>{
                          choice.price.base_unit + '.' + choice.price.exponent + ' ' + choice.price.iso_4217} </b>
                      </Grid>
                    )}
                  </Grid>
                )}

                {item.uitype === "RADIO_QTY" && (
                  <Grid className="choices">
                    {item.choices.map((choice, index2) =>
                      <Grid key={index2}>
                        <Radio name={item.section_name} checked={props.radioQtyChecked ? (props.radioQtyChecked === choice.name) : (index2 === 0)} onClick={(e) => props.onClick(choice.name, e, 'radioQty')} value={choice.price.base_unit + '.' + choice.price.exponent} />{choice.name + ' '}<b>{
                          choice.price.base_unit + '.' + choice.price.exponent + ' ' + choice.price.iso_4217} </b>
                      </Grid>
                    )}
                  </Grid>
                )}

                {item.uitype === "CHECKBOX" && (
                  <Grid className="choices">
                    {item.choices.map((choice, index2) =>
                      <Grid key={index2}>
                        <Checkbox name={item.section_name} onClick={(e) => props.onClick(index2, e, 'checkbox')} value={choice.price.base_unit + '.' + choice.price.exponent} />{choice.name + ' '}<b>{
                          choice.price.base_unit + '.' + choice.price.exponent + ' ' + choice.price.iso_4217}</b>
                      </Grid>
                    )}
                  </Grid>
                )}

              </Grid>
            )}

            <Button variant="outlined" className="btn-theme" onClick={(e) => props.onClick(filterItem[0], e, 'AddToCart')}>Add to Cart</Button>

          </Grid>
        </Grid>
      </Grid>

    </div >
  )
}
export default ProductItemDetail;