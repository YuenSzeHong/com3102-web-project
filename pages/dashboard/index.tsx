import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { StateContext } from "../../Contexts/StateContextProvider";

const Dashboard: React.FC = function () {
  const { state } = useContext(StateContext);

  useEffect(() => {
    if (state.productList.length === 0) {
      router.push("/");
    }
    if (!state.auth.token) {
      router.push("/auth/login");
    }
    if (state.auth.token && state.auth.role !== "admin") {
      router.push("/");
    }
    document.title = `${t("dashboard")} | ${t("title")}`;
  }, []);

  const { t } = useTranslation();

  const router = useRouter();

  return (
    <Col>
      <Row className="my-3">
        <Button
          variant="primary"
          onClick={() => router.push("/dashboard/add_product")}
        >
          {t("product_management")}
        </Button>
      </Row>
      <Row className="my-3">
        <Button
          variant="primary"
          onClick={() => router.push("/dashboard/loginstats")}
        >
          {t("login_stats")}
        </Button>
      </Row>
      <Row className="my-3">
        <Button
          variant="primary"
          onClick={() => router.push("/dashboard/transactions")}
        >
          {t("orders")}
        </Button>
      </Row>
      <Row className="my-3">
        <Button
          variant="primary"
          onClick={() => router.push("/dashboard/userlist")}
        >
          {t("user_list")}
        </Button>
      </Row>
    </Col>
  );
};

export default Dashboard;
