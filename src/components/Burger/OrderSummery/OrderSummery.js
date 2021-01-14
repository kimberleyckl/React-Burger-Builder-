import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Component } from 'react';

class OrderSummery extends Component{
    // this can be a functional component, below is performance purposes [mod 154]
        // componentDidUpdate(){
        //     console.log("[OrderSummery] will update")
        // }
    render(){
        const ingredientSum = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key ={igKey}>
                        <span style = {{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            });         
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Burger with ingredients: </p>
                <ul>
                    {ingredientSum}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to check out?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>)
    }
    
};

export default OrderSummery;