// import "../styles/globals.css";

import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Layout from "../Layouts/Layout";

import axios from "axios";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(App);
