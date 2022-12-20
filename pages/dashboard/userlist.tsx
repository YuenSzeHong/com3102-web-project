import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { StateContext } from "../../Contexts/StateContextProvider";
import { User } from "../../types";

const UserList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const [userlist, setUserList] = useState<User[]>([]);

  const { state } = useContext(StateContext);

  useEffect(() => {
    if (!state.auth.token) {
      router.push("/auth/login");
    }
    if (state.auth.token && state.auth.role !== "admin") {
      router.push("/");
    }
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      })
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
    document.title = `${t("user_list")} | ${t("title")}`;
  }, []);

  return (
    <>
      <h1>{t("user_list")}</h1>
      <Table>
        <thead>
          <tr>
            <th>{t("username")}</th>
            <th>{t("role")}</th>
            <th>{t("student_id")}</th>
            <th>{t("student_name")}</th>
            <th>{t("major")}</th>
            <th>{t("enrolled_year")}</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.username}</td>
                <td>{t(row.role.id)}</td>
                <td>{row.student?.id}</td>
                <td>{row.student?.name}</td>
                <td>{row.student?.major}</td>
                <td>{row.student?.enrolled_year}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
