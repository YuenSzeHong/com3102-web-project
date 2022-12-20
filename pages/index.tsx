import { useContext, useEffect } from "react";
import { StateContext } from "../Contexts/StateContextProvider";
import axios from "axios";
import { Container, Button, Card, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Home(): JSX.Element {
  const { state, setProductList, addItemToCart, formatPrice, setFilteredList } =
    useContext(StateContext);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("/api/product", {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      })
      .then((res) => {
        setProductList(res.data);
        setFilteredList(res.data);
      });
  }, []);

  return (
    <Container>
      <h1>{t("shop")}</h1>
      {state.search.length ? <div>{t("search_result")}</div> : null}
      <Row>
        {state.filteredList.length ? (
          state.filteredList.map((product) => (
            <Card className="m-3" key={product.id} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <span
                  style={{
                    textDecoration: product.student_price ? "line-through" : "",
                  }}
                >
                  {formatPrice(product.price)}
                </span>

                {product.student_price ? (
                  <h3>{formatPrice(product.student_price)}</h3>
                ) : (
                  ""
                )}
                <Card.Text>{product.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    addItemToCart(product);
                  }}
                >
                  {t("add_to_cart")}
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : state.search.length ? (
          <h3>{t("keyword_search_no_result")}</h3>
        ) : (
          <h3>{t("loading")}</h3>
        )}
      </Row>
    </Container>
  );
}
