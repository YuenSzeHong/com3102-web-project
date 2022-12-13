import React from "react";
import Head from "next/head";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t, i18n } = useTranslation();

  const Mapping = {
    "en-US": {
      lang1: "zh-CN",
      lang2: "zh-TW",
    },
    "zh-CN": {
      lang1: "en-US",
      lang2: "zh-TW",
    },
    "zh-TW": {
      lang1: "en-US",
      lang2: "zh-CN",
    },
  };

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
          <Navbar.Text>
            <Link
              href="#"
              onClick={() => i18n.changeLanguage(Mapping[i18n.language].lang2)}
            >
              {t("lang2")}
            </Link>
          </Navbar.Text>
          <Navbar.Text className="mx-2">|</Navbar.Text>
          <Navbar.Text>
            <Link
              href="#"
              onClick={() => i18n.changeLanguage(Mapping[i18n.language].lang1)}
            >
              {t("lang1")}
            </Link>
          </Navbar.Text>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
