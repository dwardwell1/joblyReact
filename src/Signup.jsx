import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Signup() {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
            SignUP FORM
            </h3>
          </CardTitle>
          <p>SIGN UP HERE.</p>
        </CardBody>
      </Card>
    </section>
  );
}

export default Signup;