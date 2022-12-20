import axios from "axios";
import { t } from "i18next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { StateContext } from "../../Contexts/StateContextProvider";
import { Transaction } from "../../types";

const Transactions = () => {
  const { state, getTotalPrice } = useContext(StateContext);
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (state.auth.token === "") {
      router.push("/auth/login");
      return;
    }
    if (state.auth.role !== "admin") {
      router.push("/");
    }
    axios
      .get("/api/transaction", {
        headers: {
          Authorization: "Bearer " + state.auth.token,
        },
      })
      .then((res) => {
        setTransactions(
          res.data.map((row: any) => {
            console.log(row.user);
            return {
              ...row,
              cart_json: undefined,
              cart: JSON.parse(row.cart_json),
            };
          })
        );
      });
  }, []);

  return (
    <>
      <h1>{t("orders")}</h1>
      <Table variant="striped">
        <thead>
          <tr>
            <th>{t("trans_id")}</th>
            <th>{t("username")}</th>
            <th>{t("trans_timestamp")}</th>
            <th>{t("quantity")}</th>
            <th>{t("total")}</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: Transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.user.username}</td>
                <td>
                  {new Date(transaction.transaction_timestamp).toLocaleString()}
                </td>
                <OverlayTrigger
                  overlay={
                    <Tooltip placement="bottom">
                      {transaction.cart.map((row) => {
                        return (
                          <div key={row.product.id}>
                            {row.product.title} &times; {row.quantity}
                          </div>
                        );
                      })}
                    </Tooltip>
                  }
                >
                  <td>
                    {transaction.cart.reduce(
                      (acc, row) => acc + row.quantity,
                      0
                    )}
                  </td>
                </OverlayTrigger>
                <td>
                  {getTotalPrice(transaction.user.role, transaction.cart)}
                </td>
              </tr>
            );
          })}
          {!transactions.length && (
            <tr>
              <td colSpan={5} >
                {t("loading")}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Transactions;
