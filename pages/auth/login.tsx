import { Container, Button, Form } from "react-bootstrap";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { StateContext } from "../../Contexts/StateContextProvider";
import Router, { useRouter } from "next/router";

const Login = function () {
  const { t } = useTranslation();

  const router = useRouter();

  const [message, setMessage] = useState<string>("");

  const { login, state, setProductList } = useContext(StateContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());
    axios
      .post(`/api/auth/login`, {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        login(res.data);
        if (data.remember_me) localStorage.setItem("auth", res.data);
        axios
          .get("/api/product", {
            headers: {
              Authorization: "Bearer " + state.auth.token,
            },
          })
          .then((res) => {
            setProductList(res.data);
          });
        router.push("/");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          setMessage(err.response.data.message);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <Container>
      <h1 className="text-center">{t("login")}</h1>

      <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>{t("username")}</Form.Label>
          <Form.Control type="text" name="username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control type="password" name="password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="remember">
          <Form.Check
            type="checkbox"
            name="remember_me"
            label={t("remember_me")}
          />
        </Form.Group>
        {message && (
          <Form.Group className="mb-3" controlId="message">
            <Form.Text className="text-danger">{t(message)}</Form.Text>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="register">
          <Form.Text className="text-muted">
            {t("dont_have_account")}{" "}
            <Link href="register">{t("register_here")}</Link>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("login")}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
