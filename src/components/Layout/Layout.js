import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <Toolbar/>
        <div>toolbar, side drawer, backdrop</div>
        <main className = {classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;