import { Container, Button, Form } from "react-bootstrap";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { StateContext } from "../../Contexts/StateContextProvider";

const Login = function () {
  const { t } = useTranslation();

  const [message, setMessage] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useContext(StateContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`/api/auth/login`, { username, password })
      .then((res) => {
        login(res.data);
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
          <Form.Control
            type="text"
            value={username}
            onChange={(x) => setUsername(x.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(x) => setPassword(x.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="remember">
          <Form.Check type="checkbox" label={t("remember_me")} />
        </Form.Group>
        {message && (
          <Form.Group className="mb-3" controlId="message">
            <Form.Text className="text-danger">{message}</Form.Text>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="register">
          <Form.Text className="text-muted">
            {t("dont_have_account")}{" "}
            <Link href="/reg/registration">{t("register_here")}</Link>
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
