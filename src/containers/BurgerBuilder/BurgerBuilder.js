import { Component } from "react";
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0,
        }
    }




    render(){
        return(
            <Aux>
                <div>Builder</div>
                <Burger ingredients = {this.state.ingredients}/>
                <div>Build control</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;