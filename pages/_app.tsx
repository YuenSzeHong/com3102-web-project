// import "../styles/globals.css";
import { I18nContext } from "react-i18next";
import AuthContext from "../Contexts/Auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Layout from "../Layouts/Layout";
import i18n from "../lib/i18n";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <I18nContext.Provider value={{ i18n }}>
      <AuthContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
    </I18nContext.Provider>
  );
};

export default App;
