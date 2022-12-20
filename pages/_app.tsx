// import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { I18nContext } from "react-i18next";
import StateContextProvider from "../Contexts/StateContextProvider";
import Layout from "../Layouts/Layout";
import i18n from "../lib/i18n";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      console.log("lang", lang);
      i18n.changeLanguage(lang);
    }
    window.onpopstate = (e: PopStateEvent) => {
      router.push(e.state.url);
    };
  }, []);

  return (
    <I18nContext.Provider value={{ i18n }}>
      <StateContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContextProvider>
    </I18nContext.Provider>
  );
};

export default App;
