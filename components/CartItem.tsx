import { useContext } from "react";
import { Button } from "react-bootstrap";
import { StateContext } from "../Contexts/StateContextProvider";
import { cartProduct } from "../types";

export default function CartItem({
  row,
  incrementItem,
  decrementItem,
  removeItem,
}: {
  row: cartProduct;
  incrementItem: () => void;
  decrementItem: () => void;
  removeItem: () => void;
}) {
  const { state, getSubTotal, formatPrice } = useContext(StateContext);
  return (
    <tr className="align-middle">
      <td className="text-nowrap">{row.product?.title}</td>
      <td>{row.product?.description}</td>
      <td className="text-center">
        $
        {state.auth.role === "student"
          ? row.product.student_price
          : row.product.price}
      </td>
      <td>
        <Button variant="outline-warning" size="sm" onClick={decrementItem}>
          ➖
        </Button>
      </td>
      <td className="text-center">{row.quantity}</td>
      <td className="text-center">
        <Button variant="outline-success" size="sm" onClick={incrementItem}>
          ➕
        </Button>
      </td>
      <td className="text-center">{formatPrice(getSubTotal(row))}</td>
      <td className="text-center">
        <Button variant="danger" onClick={removeItem}>
          🗑️
        </Button>
      </td>
    </tr>
  );
}
