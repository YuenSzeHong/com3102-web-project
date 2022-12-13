// import "../styles/globals.css";
import { I18nContext, useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Layout from "../Layouts/Layout";
import i18n from "../lib/i18n";

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation();

  return (
    <I18nContext.Provider value={{ i18n }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </I18nContext.Provider>
  );
};

export default App;
