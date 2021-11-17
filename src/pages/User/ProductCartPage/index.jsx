import "./styles.scss";
import TitlePage from "../../../components/User/TitlePage";
import CartItem from "../../../components/User/CartItem";
import { Button, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../utils/history";
import {
  decreaseCartItemItemAction,
  getCartListAction,
  increaseCartItemAction,
  removeFromCartAction,
} from "../../../redux/actions";
import { useEffect } from "react";

function ProductCartPage() {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartReducer.cartList);

  useEffect(() => {
    dispatch(getCartListAction({}));
  }, []);

  function totalPrice() {
    let total = 0;
    cartList.data?.forEach((item) => {
      total +=
        (item.price +
          (item.color.price ? item.color.price : 0) +
          (item.size.price ? item.size.price : 0)) *
        item.amount;
    });

    return total.toLocaleString();
  }

  function handleDeleteCart(index) {
    dispatch(removeFromCartAction({ index }));
  }

  function increaseCartItem(index, amount) {
    dispatch(increaseCartItemAction({ index, amount }));
  }

  function decreaseCartItem(index, amount) {
    dispatch(decreaseCartItemItemAction({ index, amount }));
  }

  return (
    <main className="container-1 cart-page">
      <TitlePage title="Cart Page" />
      <section className="cart-page__main">
        <div className="main__content">
          {cartList.totalCartList < 1 ? (
            <p className="main__content--not-item">No items found in cart</p>
          ) : (
            cartList.data.map((item, index) => (
              <CartItem
                key={index}
                product={{ ...item, cartIndex: index }}
                handleDeleteCart={handleDeleteCart}
                increaseCartItem={increaseCartItem}
                decreaseCartItem={decreaseCartItem}
              />
            ))
          )}
        </div>
        <div className="main__total">
          <div className="main__total--content">
            <p>Total:</p>
            <p>${totalPrice()}</p>
          </div>
          <Row justify="center">
            <Button
              type="primary"
              size="large"
              onClick={() => {
                cartList.totalCartList < 1
                  ? history.push("/")
                  : history.push("order");
              }}
            >
              {cartList.totalCartList < 1
                ? "Cart is empty, go to home"
                : "Make a payment"}
            </Button>
          </Row>
        </div>
      </section>
    </main>
  );
}

export default ProductCartPage;
