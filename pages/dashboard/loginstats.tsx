import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { StateContext } from "../../Contexts/StateContextProvider";
import { LoginRecord } from "../../types";

const LoginStats = () => {
  const { state } = useContext(StateContext);

  const router = useRouter();

  const [stats, setStats] = useState<LoginRecord[]>([]);

  useEffect(() => {
    if (!state.auth.token) {
      router.push("/auth/login");
    }
    if (state.auth.token && state.auth.role !== "admin") {
      router.push("/");
    }
    axios
      .get("/api/login_stats", {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      })
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.error(err.response.data.message));
    document.title = `${t("login_stats")} | ${t("title")}`;
  }, []);

  const { t } = useTranslation();
  return (
    <>
      <h1>{t("login_stats")}</h1>
      <Table>
        <thead>
          <tr>
            <th>{t("username")}</th>
            <th>{t("login_timestamp")}</th>
            <th>{t("login_ip")}</th>
            <th>{t("success")}</th>
            <th>{t("remarks")}</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.user.username}</td>
                <td>{new Date(row.login_date).toLocaleString()}</td>
                <td>{row.login_ip}</td>
                <td>{t(row.success.toString())}</td>
                <td>{t(row.remarks)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default LoginStats;
