import { Container, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Login: React.FC = function () {
  const { t, i18n } = useTranslation();

  const [ID, setID] = useState<string>("");
  const [PW, setPW] = useState<string>("");

  return (
    <Container>
      <h1 className="text-center">HSU calendar app</h1>

      <Form className="rounded p-4 p-sm-3">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>{t("username")}</Form.Label>
          <Form.Control
            type="text"
            value={ID}
            onChange={(x) => setID(x.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control
            type="password"
            value={PW}
            onChange={(x) => setPW(x.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="remember">
          <Form.Check type="checkbox" label={t("remember_me")} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("login")}
        </Button>
        <Form.Group className="mb-3" controlId="register">
          <Form.Text className="text-muted">
            {t("dont_have_account")}
            <Link href="/reg/registration">{t("register_here")}</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Login;
