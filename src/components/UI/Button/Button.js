import classes from './Button.module.css';

const button = (props) => (
    <button 
        className = {[classes.Button, classes[props.btnType]].join(' ')}   //btnType = Success or Danger
        onClick={props.clicked}>
            {props.children}
    </button>
);
export default button;