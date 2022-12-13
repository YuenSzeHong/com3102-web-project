import React from "react";
import Head from "next/head";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("title")} | Home</title>
      </Head>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">{t("title")}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/enter/login">{t("login")}</Nav.Link>
            <Nav.Link href="/reg/registration">{t("register")}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
