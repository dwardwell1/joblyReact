import React, {useContext, useState} from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import JoblyApi from "../api";
import userContext from "../UserContext";

function Job({ job, apply}) {
  const [applied, setApplied] = useState(false);

  const applyForJob = async () => {
    return apply(job.id);
  }
 
  return (
    <section>
      <Card id={job.id}>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
              <h2>{job.title}</h2>
            {job.companyHandle}
          </CardTitle>
          {console.log(job.applied, job.id)}
          <p>
            <b>Salary:</b> {job.salary}
          </p>
          <p>
            <b>Equity:</b> {job.equity}
          </p>
          { !job.applied  ? <button onClick={applyForJob} >Apply to Job</button>
          : <p>Applied</p>}
        </CardBody>
      </Card>
    </section>
  );
}

export default Job;