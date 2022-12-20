import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import { AuthContext } from "../Contexts/Auth";
import axios from "axios";
import { StateContext } from "../Contexts/StateContextProvider";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    setSearchKeyword,
    setFilteredList,
    formatPrice,
    setProductList,
    getTotalPrice,
    logout,
    login,
    state,
  } = useContext(StateContext);

  useEffect(() => {
    // login from local storage
    setProductList([]);
    const auth = sessionStorage.getItem("auth") || localStorage.getItem("auth");
    if (auth) {
      const authObj = JSON.parse(auth as string);
      if (authObj.token) {
        axios
          .get("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${authObj.token}`,
            },
          })
          .then((res) => {
            login(authObj);
            router.push("/");
          })
          .catch((err) => {
            localStorage.removeItem("auth");
          });
      }
    }
    if (state.auth.token) {
      axios
        .get("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        })
        .then((res) => {
          login(state.auth);
        })
        .catch((err) => {
          logout();
        });
    } else {
      logout();
    }
  }, []);
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

  const router = useRouter();

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.search) {
      const res = await axios.get(
        `http://localhost:3000/api/product?keyword=${state.search}`
      );
      setFilteredList(res.data);
      setSearchKeyword("");
    }
  };

  return (
    <>
      <Head>
        <title>
          {t("home")} | {t("title")}
        </title>
      </Head>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link className="navbar-brand" href="/">
            {t("title")}
          </Link>
          <Nav className="my-0 me-auto">
            {!state.auth.username && (
              <>
                <Link className="nav-link" href="/auth/login">
                  {t("login")}
                </Link>

                <Link className="nav-link" href="/auth/register">
                  {t("register")}
                </Link>
              </>
            )}

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
              className="text-decoration-none"
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
              className="text-decoration-none"
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
                  router.push("/auth/login");
                }}
                className="mx-2 text-white text-decoration-none"
              >
                {t("logout")}
              </Nav.Link>
            </>
          )}
          {state.auth.role !== "admin" && state.auth.username && (
            <>
              <Navbar.Text className="mx-2">|</Navbar.Text>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    {formatPrice(getTotalPrice(state.auth.role, state.cart))}
                  </Tooltip>
                }
              >
                <Link className="text-white text-decoration-none" href="/cart">
                  {t("cart")}
                  {state.cart.length > 0 && (
                    <>
                      ({state.cart.reduce((acc, row) => acc + row.quantity, 0)})
                    </>
                  )}
                </Link>
              </OverlayTrigger>
            </>
          )}
          {state.auth.role === "admin" && (
            <>
              <Navbar.Text className="mx-2">|</Navbar.Text>
              <Link
                className="text-white text-decoration-none"
                href="/dashboard/"
              >
                {t("dashboard")}
              </Link>
            </>
          )}
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
