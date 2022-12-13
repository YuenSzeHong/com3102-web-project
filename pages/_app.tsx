// import "../styles/globals.css";

import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { appWithTranslation, useTranslation } from "next-i18next";
import Layout from "../Layouts/Layout";
import "../lib/i18n";

const App = ({ Component, pageProps }: AppProps) => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(App);
