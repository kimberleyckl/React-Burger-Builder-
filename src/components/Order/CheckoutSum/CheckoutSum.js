import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSum.module.css';

const checkoutSum = (props) => {
    return (
        <div className={classes.CheckoutSum}>
            <h1>Thank you!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button btnType = 'Danger' clicked = {props.checkoutCancelled} >CANCEL</Button>
            <Button btnType = 'Success' clicked = {props.checkoutContinued} >CONTINUE</Button>
        </div>
    )
}

export default checkoutSum;