<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import "react-calendar/dist/Calendar.css";

=======
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
>>>>>>> b57d2198986781bc9a2d7245ff9bf034e9d54cf4

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(App);
