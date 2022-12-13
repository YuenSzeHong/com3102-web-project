import Link from "next/link";
import { Button, Container, Accordion, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Register: React.FC = function () {
  const { t } = useTranslation();

  return (
    <Container>
      <h1 className="text-center">{t("register")}</h1>

      <p>
        {/* Please fill in this form to create an account for public or student.{" "} */}
        {t("fill_register_form")}
      </p>

      <Form className="rounded p-4 p-sm-3" method="post" action="/">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>{t("is_hsu_student")}</Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t("major")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="Enter Programme"
                    placeholder="BA-AHCC"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t("year_entry")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="Enter entrance"
                    placeholder="2022"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t("student_id")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="Enter student ID"
                    placeholder="s200000"
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>{t("username")}</Form.Label>
          <Form.Control type="text" name="Enter User ID" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control type="Password" name="Enter Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>{t("confirm_password")}</Form.Label>
          <Form.Control type="Password" name="Repeat Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {t("agree_tnp")} <Link href="/terms">{t("tnp")}</Link>.
        </Form.Group>
        <Form.Group className="mb-3">
          {t("already_have_account")} <a href="../enter/login">{t("login")}</a>
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("register")}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
