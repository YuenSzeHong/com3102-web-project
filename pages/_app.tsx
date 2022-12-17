// import "../styles/globals.css";
import { I18nContext } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Layout from "../Layouts/Layout";
import i18n from "../lib/i18n";
import { AuthProvider } from "../Contexts/Auth";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {

    useEffect(() => {
      const lang = localStorage.getItem("lang");
      if (lang) {
        console.log("lang", lang);
        i18n.changeLanguage(lang);
      }
    }, []);

  return (
    <I18nContext.Provider value={{ i18n }}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </I18nContext.Provider>
  );
};

export default App;
