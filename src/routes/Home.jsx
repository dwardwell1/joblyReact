import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home() {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
            Jobly
            </h3>
          </CardTitle>
          <p>All the jobs in one, convenient place.</p>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
