import { Container, Button, Form } from "react-bootstrap";
import React, { useState } from "react";

import Link from "next/link";

const login: React.FC = function () {

  const [ID, setID] = useState<string>("");
  const [PW, setPW] = useState<string>("");

  return (
    <Container>
      <h1 className="text-center">HSU calendar app</h1>

      <Form className="rounded p-4 p-sm-3">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            value={ID}
            onChange={(x) => setID(x.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={PW}
            onChange={(x) => setPW(x.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="remember">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Form.Group className="mb-3" controlId="register">
          <Form.Text className="text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/reg/registration">Register here</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default login;
