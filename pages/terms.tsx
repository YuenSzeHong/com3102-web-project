import React from "react";
import { Button, Container } from "react-bootstrap";

const Terms = () => {
  return (
    <Container>
      <h1 className="text-center">Terms and Conditions</h1>
      {/* cookie and data usage */}
      <h2>Cookie and Data Usage</h2>
      <p>
        This website uses cookies to improve your experience while you navigate
        through the website. Out of these cookies, the cookies that are
        categorized as necessary are stored on your browser as they are as
        essential for the working of basic functionalities of the website. We
        also use third-party cookies that help us analyze and understand how you
        use this website. These cookies will be stored in your browser only with
        your consent. You also have the option to opt-out of these cookies. But
        opting out of some of these cookies may have an effect on your browsing
        experience.
      </p>
      {/* back to register  */}
      <h2>Back to Register</h2>
        <p>
            If you want to go back to register, please click the button below.
        </p>
        <Button variant="primary" href="../reg/registration">Back to Register</Button>
    </Container>
  );
};

export default Terms;
