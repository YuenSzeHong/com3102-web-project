
import {Button,Container,Row,Col, Form} from 'react-bootstrap'; 
import { useState } from 'react';
import { useTranslation } from "react-i18next";


interface LineData {
    description: string;
    id: string;
    price: number;
    student_price: number;
    title: string;
}

const add_product:React.FC = () => {
  const [description, descriptionSet] = useState<string>("");
  const [id, idSet] = useState<string>("");
  const [price, priceSet] = useState<number>(0);
  const [student_price, student_priceSet] = useState<number>(0);
  const [title, titleSet] = useState<string>("");

  const [Data, setData] = useState<LineData[]>([]);
  const { t } = useTranslation();

  function add() {
    setData([...Data, { description:description, id:id, price:price, student_price:student_price, title:title}]);
    descriptionSet("");
    idSet("");
    priceSet(0);
    student_priceSet(0);
    titleSet("");

}

function removeItem(index: number) {
  Data.splice(index, 1);
  setData([...Data]);
}
  

  return (   
    <div>      

      <Container>
        <Row>
          <Col>
          <Form className="rounded p-4 p-sm-3">
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>{t("Description")}</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(x) => descriptionSet(x.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="id">
          <Form.Label>{t("ID")}</Form.Label>
          <Form.Control
            type="text"
            value={id}
            onChange={(x) => idSet(x.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>{t("Price")}</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(x) => priceSet(parseInt(x.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="student_price">
          <Form.Label>{t("Student Price")}</Form.Label>
          <Form.Control
            type="number"
            value={student_price}
            onChange={(x) => student_priceSet(parseInt(x.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>{t("Title")}</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(x) => titleSet(x.target.value)}
          />
        </Form.Group>
        <Button onClick={add} variant="primary">
          {t("create item")}
        </Button>
      </Form>
      </Col>
      <Col>
      {Data.map((item, index) =>
                <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => removeItem(index)}
                    
                />)}
                </Col>
                </Row>
                </Container>
    </div>
  );
}

const CartItem: React.FC<{
  item: LineData;
  onRemove: () => void;

}> = function ({
  item: lineData,
  onRemove,

}) {
      const { description,id, price,student_price, title} = lineData
      const { t } = useTranslation();

          return (
              <div>
                <Form className="rounded p-4 p-sm-3">
           <Form.Group className="mb-3">
          <Form.Label>{t("Description: ")}</Form.Label>
            {description}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("ID: ")}</Form.Label>
            {id}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("Price: ")}</Form.Label>
            {price}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("Student price: ")}</Form.Label>
            {student_price}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("Title: ")}</Form.Label>
            {title}
        </Form.Group>
        <Button onClick={onRemove} variant="primary">
          {t("Remove item")}
        </Button>
        </Form>
             
              </div>              
          )
          
          
      

  }


 
export default add_product;