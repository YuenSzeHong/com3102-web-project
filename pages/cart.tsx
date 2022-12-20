import axios from "axios";
import { t } from "i18next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table, Toast } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { StateContext } from "../Contexts/StateContextProvider";

const Cart = () => {
  const {
    state,
    getTotalPrice,
    decrementItem,
    incrementItem,
    removeItem,
    emptyCart,
    getItemCount,
    formatPrice,
  } = useContext(StateContext);
  const { cart } = state;

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!state.auth.token) {
      router.push("/auth/login");
    }
  }, []);

  const handleCheckout = () => {
    axios
      .post(
        "/api/transaction",
        { username: state.auth.username, cart: cart },
        { headers: { Authorization: "Bearer " + state.auth.token } }
      )
      .then((res) => {
        setMessage(res.data.message);
        emptyCart();
        setShowModel(false);
      })
      .catch((err) => {
        setMessage("Payment failed");
        setError(err.message);
      });
  };

  return (
    <>
      <Toast
        bg={error ? "Danger" : "Success"}
        show={message !== ""}
        onClose={() => setMessage("")}
      >
        <Toast.Header>
          <strong className="mr-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
      <Modal show={showModel} onHide={() => setShowModel(false)}>
        <Modal.Header closeButton>
          <h3>{t("payment")}</h3>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>{t("item")}</th>
                <th>{t("quantity")}</th>
                <th>{t("price")}</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cart) => {
                return (
                  <tr key={cart.product.id}>
                    <td>{cart.product.title}</td>
                    <td>{cart.quantity}</td>
                    <td>
                      {formatPrice(
                        state.auth.role === "student"
                          ? cart.product.student_price
                          : cart.product.price
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>{t("total")}</td>
                <td>{getItemCount()}</td>
                <td>
                  {formatPrice(getTotalPrice(state.auth.role, state.cart))}
                </td>
              </tr>
            </tfoot>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleCheckout()}>
            {t("pay")} {formatPrice(getTotalPrice(state.auth.role, state.cart))}
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <h3 className="h3 my-3">{t("cart")}</h3>
          <Table>
            <thead>
              <tr>
                <th>{t("item")}</th>
                <th>{t("description")}</th>
                <th className="text-center">{t("price")}</th>
                <th colSpan={3} className="text-center">
                  {t("quantity")}
                </th>
                <th className="text-nowrap text-center">{t("sub_total")}</th>
                <th className="text-center">{t("remove")}</th>
              </tr>
            </thead>
            <tbody>
              {cart.length ? (
                cart.map((cartItem) => (
                  <CartItem
                    key={cartItem.product.id}
                    row={cartItem}
                    decrementItem={() => decrementItem(cartItem.product.id)}
                    removeItem={() => {
                      removeItem(cartItem.product.id);
                    }}
                    incrementItem={() => {
                      incrementItem(cartItem.product.id);
                    }}
                  />
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={8}>
                    {t("cart_empty_desc")}
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <Button
                    className="text-nowrap"
                    onClick={() => {
                      if (cart.length) setShowModel(true);
                    }}
                    variant="outline-success"
                  >
                    {t("checkout")}
                  </Button>
                </td>
                <td>{t("total")}</td>
                <td colSpan={2}>{getItemCount()}</td>
                <td className="text-center">
                  {formatPrice(getTotalPrice(state.auth.role, state.cart))}
                </td>
                <td className="text-center">
                  <Button variant="danger" onClick={emptyCart}>
                    🗑️
                  </Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
