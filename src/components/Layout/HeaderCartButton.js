import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onCartClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>{props.children}</span>
      <span className={classes.badge}>0</span>
    </button>
  );
};

export default HeaderCartButton;
