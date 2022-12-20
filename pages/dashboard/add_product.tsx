import axios from "axios";
import { t } from "i18next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Modal,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { StateContext } from "../../Contexts/StateContextProvider";
import { Product } from "../../types";

const AddProduct = () => {
  const { state, setProductList } = useContext(StateContext);
  const router = useRouter();

  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (state.auth.token === "") {
      router.push("/auth/login");
      return;
    }
    if (state.auth.role !== "admin") {
      router.push("/");
    }
    document.title = `${t("product_management")} | ${t("title")}`;
  }, []);

  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    description: "",
    price: 0,
    student_price: 0,
  });

  const refreshProductList = () => {
    axios
      .get("/api/product", {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      .then((res) => {
        // if (res.status === 200) {
        setProductList(res.data);
        // }
      })
      .catch((err) => {
        console.error(`error when refresh product list: ${err.message}}`);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/api/product`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
        data: { id: product.id },
      })
      .then((res) => {
        // if (res.status === 200) {
        setShowModel(false);
        refreshProductList();
        // setProductList([]);
        // }
      })
      .catch((err) => {
        console.error(`error when delete product: ${err.message}}`);
      });
    router.push("/dashboard/add_product");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.debug(product);
    if (product.id === "") {
      console.debug("create product");
      axios
        .put(
          "/api/product",
          { ...product, id: undefined },
          {
            headers: { Authorization: `Bearer ${state.auth.token}` },
          }
        )
        .then((res) => {
          refreshProductList();
          product.id = "";
          router.push("/dashboard/add_product");
        });
      // router.push("/dashboard/add_product");
    } else {
      console.debug("update product");
      axios
        .patch("/api/product", product, {
          headers: { Authorization: `Bearer ${state.auth.token}` },
        })
        .then((res) => {
          refreshProductList();
          product.id = "";
          router.push("/dashboard/add_product");
        })
        .catch((err) => {
          console.error(`error when update product: ${err.message}}`);
        });
    }
  };

  return (
    <>
      <Modal show={showModel} onHide={() => setShowModel(false)}>
        <Modal.Header closeButton>
          <h3>
            {t("warning")}: {t("confirm_delete")}
          </h3>
        </Modal.Header>
        <Modal.Body>
          {t("product_title")}: {product.title}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModel(false)}>
            {t("cancel")}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete();
            }}
          >
            {t("delete")}
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>{t("product_management")}</h1>

      <Form className="w-75 my-3" onSubmit={handleSubmit}>
        <Form.Group className="my-3" controlId="id">
          <Form.Control
            value={product.id}
            onChange={(e) => {
              setProduct({ ...product, id: e.target.value });
            }}
            type="hidden"
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="title">
          <Form.Label>{t("product_title")}</Form.Label>
          <Form.Control
            value={product.title}
            onChange={(e) => {
              setProduct({ ...product, title: e.target.value });
            }}
            type="text"
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="description">
          <Form.Label>{t("description")}</Form.Label>
          <textarea
            value={product.description}
            onChange={(e) => {
              setProduct({ ...product, description: e.target.value });
            }}
            required
            className="form-control"
            name="description"
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="price">
          <Form.Label>{t("price")}</Form.Label>
          <Form.Control
            required
            value={product.price}
            onChange={(e) => {
              setProduct({ ...product, price: Number(e.target.value) });
            }}
            type="number"
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="student_price">
          <Form.Label>{t("student_price")}</Form.Label>
          <Form.Control
            value={product.student_price}
            onChange={(e) => {
              setProduct({ ...product, student_price: Number(e.target.value) });
            }}
            type="number"
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="submit">
          <Button type="submit">{t("submit")}</Button>
        </Form.Group>
      </Form>
      <h1>{t("product_list")}</h1>
      <Table striped hover>
        <thead>
          <tr>
            <th>{t("product_title")}</th>
            <th>{t("description")}</th>
            <th>{t("price")}</th>
            <th>{t("student_price")}</th>
            <th colSpan={2} className="text-center">
              {t("action")}
            </th>
          </tr>
        </thead>
        <tbody>
          {state.productList.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.student_price}</td>
                <td>
                  <Button
                    onClick={(e) => setProduct(product)}
                    variant="warning"
                  >
                    {t("edit")}
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      setProduct(product);
                      setShowModel(true);
                    }}
                    variant="danger"
                  >
                    {t("delete")}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AddProduct;
