import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxiliary';

const orderSummery = (props) =>{
    const ingredientSum = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key ={igKey}>
                    <span style = {{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        });
    return(<Aux>
        <h3>Your Order</h3>
        <p>Burger with ingredients: </p>
        <ul>
            {ingredientSum}
        </ul>
        <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to check out?</p>
        <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
        <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>)
};

export default orderSummery;