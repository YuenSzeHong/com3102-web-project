import Link from "next/link";
import { Button, Container, Accordion, Form } from "react-bootstrap";

const reg: React.FC = function () {

  return (
    <Container>
      <h1 className="text-center">Register</h1>

      <p>
        Please fill in this form to create an account for public or student.{" "}
      </p>

      <Form className="rounded p-4 p-sm-3" method="post" action="/">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                If you are HSU student, please press it to input as well
              </Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Your Programme</Form.Label>
                  <Form.Control
                    type="text"
                    name="Enter Programme"
                    placeholder="BA-AHCC"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Year of entrance</Form.Label>
                  <Form.Control
                    type="text"
                    name="Enter entrance"
                    placeholder="2022"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Student ID</Form.Label>
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
          <Form.Label>User ID</Form.Label>
          <Form.Control type="text" name="Enter User ID" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="Password" name="Enter Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control type="Password" name="Repeat Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          By creating an account you agree to our{" "}
          <Link href="/terms">Terms & Privacy</Link>.
        </Form.Group>
        <Form.Group className="mb-3">
          already have an account? <a href="../enter/login">Sign in</a>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default reg;
