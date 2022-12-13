import React from "react";
import Head from "next/head";
import { Navbar, Container, Nav } from "react-bootstrap";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>HSU Calender App | Home</title>
      </Head>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">HSU Calender App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/enter/login">Login</Nav.Link>
            <Nav.Link href="/reg/registration">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
