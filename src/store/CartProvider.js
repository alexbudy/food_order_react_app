import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.count;

    const existingDish = state.items.find((dish) => dish.id === action.item.id);

    let updatedItems = state.items;
    if (existingDish) {
      existingDish.count += action.item.count;
      updatedItems = [...state.items]
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
    const existingDish = state.items.find((dish) => dish.id === action.id);

    let updatedItems;
    if (existingDish) {
      existingDish.count -= 1;
      if (existingDish.count === 0) {
        updatedItems = state.items.filter((dish) => {
          return dish.id !== action.id;
        });
      }
      return {
        items: updatedItems,
        totalAmount: state.totalAmount - existingDish.price,
      };
    } else {
      return state;
    }
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items, // {name: 'Sushi', count: 3, price: 20.99, id: 'm1'}
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
