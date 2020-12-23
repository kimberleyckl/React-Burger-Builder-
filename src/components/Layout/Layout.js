import Aux from '../../hoc/Auxiliary';
 
const layout = (props) => (
    <Aux>
        <div>toolbar, side drawer, backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;