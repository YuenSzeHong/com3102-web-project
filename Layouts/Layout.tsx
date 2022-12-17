import React, {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Head from "next/head";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Link from "next/link";
// import { AuthContext } from "../Contexts/Auth";
import axios from "axios";
import { StateContext } from "../Contexts/StateContextProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t, i18n } = useTranslation();

  const Mapping: {
    [key: string]: { lang1: string; lang2: string };
  } = {
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

  const { setSearchKeyword, setProductList, logout, state } =
    useContext(StateContext);

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.search) {
      const res = await axios.get(
        `http://localhost:3000/api/product/search?keyword=${state.search}`,
        { withCredentials: true }
      );
      setProductList(res.data);
    }
  };

  return (
    <>
      <Head>
        <title>{t("title")} | Home</title>
      </Head>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">{t("title")}</Navbar.Brand>
          <Nav className="my-0 me-auto">
            {!state.auth.username && (
              <>
                <Nav.Link href="/enter/login">{t("login")}</Nav.Link>
                <Nav.Link href="/reg/registration">{t("register")}</Nav.Link>
              </>
            )}
            {/* product search form */}
            <Nav.Item>
              <Form className="ma-0 pa-0" onSubmit={search}>
                <Form.Group className="d-flex g-2" controlId="search">
                  <Form.Control
                    type="search"
                    placeholder={t("search_placeholder") as string}
                    className="mx-2"
                    aria-label="Search"
                    value={state.search}
                    onChange={(e) => {
                      setSearchKeyword(e.target.value);
                    }}
                  />
                  <Button type="submit" variant="outline-light text-nowrap">
                    {t("search")}
                  </Button>
                </Form.Group>
              </Form>
            </Nav.Item>
          </Nav>
          <Navbar.Text>
            <Link
              href="#"
              onClick={() => {
                const lang = Mapping[i18n.language].lang2;
                i18n.changeLanguage(lang);
                localStorage.setItem("lang", lang);
              }}
            >
              {t("lang2")}
            </Link>
          </Navbar.Text>
          <Navbar.Text className="mx-2">|</Navbar.Text>
          <Navbar.Text>
            <Link
              href="#"
              onClick={() => {
                const lang = Mapping[i18n.language].lang1;
                i18n.changeLanguage(lang);
                localStorage.setItem("lang", lang);
              }}
            >
              {t("lang1")}
            </Link>
          </Navbar.Text>
          {state.auth.username && (
            <>
              <Navbar.Text className="mx-2">|</Navbar.Text>
              <Navbar.Text className="mx-2 text-white">
                {t("logged_as")}
              </Navbar.Text>
              <Navbar.Text className="mx-2 text-white">
                {state.auth.username}
              </Navbar.Text>
              <Navbar.Text className="mx-2">|</Navbar.Text>
              <Nav.Link
                href="#"
                onClick={() => {
                  logout();
                }}
                className="mx-2 text-white"
              >
                {t("logout")}
              </Nav.Link>
              <Navbar.Text className="mx-2">|</Navbar.Text>
              <Nav.Link className="text-white" href="/cart">
                {t("cart")}
              </Nav.Link>
            </>
          )}
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
