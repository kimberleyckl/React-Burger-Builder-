
import Aux from '../../../hoc/Auxiliary';

const orderSummery = (props) =>{
    const ingredientSum = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li>
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
        <p>Continue to check out?</p>
    </Aux>)
};

export default orderSummery;