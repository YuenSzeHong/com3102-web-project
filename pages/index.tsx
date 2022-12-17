import { useContext, useEffect } from "react";
import { StateContext } from "../Contexts/StateContextProvider";
import axios from "axios";
import { Container, Button, Card, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Home(): JSX.Element {
  const { state, setProductList } = useContext(StateContext);
  const { i18n, t } = useTranslation();

  const formatPrice = (price: number) => {
    return price.toLocaleString(i18n.language, {
      style: "currency",
      currency: "HKD",
    });
  };

  useEffect(() => {
    axios
      .get("/api/product", {
        headers: {
          Authorization: "Bearer " + state.auth.token,
        },
      })
      .then((res) => {
        setProductList(res.data);
      });
  },[]);
  // const [products, setProducts] = useState([
  //   {
  //     description: "T-shirt with special design of HSU style",
  //     id: "rec_cecq0r2v2jel6mc80clg",
  //     price: 100,
  //     student_price: 80,
  //     title: "HSU T-shirt",
  //   },
  //   {
  //     description: "cute doll with HSU design",
  //     id: "rec_cecq1mdm592d8dh850sg",
  //     price: 50,
  //     student_price: 40,
  //     title: "HSU doll",
  //   },
  //   {
  //     description: "beautiful craft design by our staff",
  //     id: "rec_cectb3nqu1q5o0kkbii0",
  //     price: 70,
  //     student_price: 55,
  //     title: "Hand-make craft",
  //   },
  //   {
  //     description: "delicious cookie made by our staff",
  //     id: "rec_cectbdnqu1q5o0kkbipg",
  //     price: 20,
  //     student_price: 15,
  //     title: "Hand-make cookie",
  //   },
  //   {
  //     description: "reference book made by our staff for start-up",
  //     id: "rec_cectd5vqu1q5o0kkbir0",
  //     price: 200,
  //     student_price: 180,
  //     title: "Reference book for start-up",
  //   },
  // ]);

  return (
    <Container>
      <h1>{t("search_result")}</h1>
      <Row>
        {state.productList.length && state.search.length ? (
          state.productList.map((product) => (
            <Card key={product.id} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <span
                    style={{
                      textDecoration: product.student_price
                        ? "line-through"
                        : "",
                    }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  {formatPrice(product.student_price)}
                </Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary">{t("add_to_cart")}</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h3>{t("keyword_search_no_result")}</h3>
        )}
      </Row>
    </Container>
  );
}
