import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Accordion, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { StateContext } from "../../Contexts/StateContextProvider";

const Register: React.FC = function () {
  const { t } = useTranslation();

  const [message, setMessage] = useState<{ message: string; status: string }>({
    message: "",
    status: "",
  });

  const { login, state } = useContext(StateContext);

  const router = useRouter();

  useEffect(() => {
    if (state.auth.token.length) router.push("/");
    document.title = `${t("register")} | ${t("title")}`;
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    if (data.password !== data.password_confirm) {
      setMessage({
        message: "passwords_dont_match",
        status: "danger",
      });
      return;
    }
    if (data.student_id || data.major || data.entry) {
      if (!data.student_id || !data.major || !data.entry) {
        setMessage({
          message: "student_data_incomplete",
          status: "danger",
        });
        return;
      }
    }

    const postData = {
      username: data.username,
      password: data.password,
      student_id: data.student_id,
      major: data.major,
      entry: data.entry,
    };

    axios
      .post("/api/auth/register", postData)
      .then((res) => {
        login(res.data);
        router.push("/");
      })
      .catch((err) => {
        if (err.response) {
          setMessage({
            message: err.response.data.message,
            status: "danger",
          });
        } else {
          setMessage({
            message: "unknown_error",
            status: "danger",
          });
        }
      });
  };

  return (
    <Container>
      <h1 className="text-center">{t("register")}</h1>

      <p>
        {/* Please fill in this form to create an account for public or student.{" "} */}
        {t("fill_register_form")}
      </p>

      <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>{t("is_hsu_student")}</Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t("major")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="major"
                    placeholder="BA-AHCC"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t("year_entry")}</Form.Label>
                  <Form.Control type="text" name="entry" placeholder="2022" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t("student_id")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="student_id"
                    placeholder="s200000"
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>{t("username")}</Form.Label>
          <Form.Control type="text" required name="username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control type="Password" required name="password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>{t("confirm_password")}</Form.Label>
          <Form.Control type="Password" required name="password_confirm" />
        </Form.Group>
        {message.message && (
          <Form.Group className="mb-3" controlId="message">
            <Form.Text className="text-danger">
              {t(message.message) as string}
            </Form.Text>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {t("agree_tnp")} <Link href="/terms">{t("tnp")}</Link>.
        </Form.Group>

        <Form.Group className="mb-3">
          {t("already_have_account")} <Link href="login">{t("login")}</Link>
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("register")}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
