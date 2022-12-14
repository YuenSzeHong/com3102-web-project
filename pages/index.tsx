import { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";

export default function Home(): JSX.Element {
  const [products, setProducts] = useState([
    {
      description: "T-shirt with special design of HSU style",
      id: "rec_cecq0r2v2jel6mc80clg",
      price: 100,
      student_price: 80,
      title: "HSU T-shirt",
    },
    {
      description: "cute doll with HSU design",
      id: "rec_cecq1mdm592d8dh850sg",
      price: 50,
      student_price: 40,
      title: "HSU doll",
    },
    {
      description: "beautiful craft design by our staff",
      id: "rec_cectb3nqu1q5o0kkbii0",
      price: 70,
      student_price: 55,
      title: "Hand-make craft",
    },
    {
      description: "delicious cookie made by our staff",
      id: "rec_cectbdnqu1q5o0kkbipg",
      price: 20,
      student_price: 15,
      title: "Hand-make cookie",
    },
    {
      description: "reference book made by our staff for start-up",
      id: "rec_cectd5vqu1q5o0kkbir0",
      price: 200,
      student_price: 180,
      title: "Reference book for start-up",
    },
  ]);

  return (
    <Container>
      <h1>Products</h1>
      {products.map((product) => (
        <Card key={product.id}>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: {product.price}</Card.Text>
            <Card.Text>Student Price: {product.student_price}</Card.Text>
            <Button variant="primary">Add to Cart</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
