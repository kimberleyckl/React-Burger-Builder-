import { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        // ingredients:{
        //     salad: 0,
        //     cheese: 0,
        //     meat: 0,
        //     bacon: 0,
        // },
        totalPrice:4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get("https://react-burger-kimikikiwi-default-rtdb.firebaseio.com/orders/-MRJmD4XyBkVacDi1QJ1/ingredient.json")
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(err => {
                this.setState({error: true})
            })
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0)
        this.setState({purchasable: sum>0})

    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('you continue')
        this.setState({loading: true});
        const order = {
            ingredient: this.state.ingredients,
            price: this.state.totalPrice,           // in real world, for security issue, should calculate the price from server!
            customer:{
                name: 'Kimi',
                address: {
                    street: 'Teststreet 1',
                    zipcode: "12345",
                    country: "NZ"
                } ,
                email: "test@test.com"          
            },
            deliveryMethod: "fastest"
        }
        axios.post("/orders.json", order)
            .then(res => 
                this.setState({loading: false, purchasing: false}))
            .catch(err => 
                this.setState({loading: false, purchasing: false}));

    }

    render(){
        const disableInfo={
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

        let orderSum = null;



        let burger = this.state.error? <p>ingredient can't be loaded</p> : <Spinner/>
        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.addIngredientHandler} 
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disableInfo}
                        purchasable = {this.state.purchasable}
                        price = {this.state.totalPrice}
                        orderClicked = {this.purchaseHandler}
                        />
                </Aux>
            )
            orderSum = (
                <OrderSummery 
                    ingredients = {this.state.ingredients}
                    purchaseCancel = {this.purchaseCancelHandler}
                    purchaseContinue = {this.purchaseContinueHandler}
                    totalPrice = {this.state.totalPrice}/>)
        }
        if(this.state.loading){
            orderSum = <Spinner/>
        }

        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSum}
                </Modal>
                {burger}
                
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios );