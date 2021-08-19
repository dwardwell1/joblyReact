import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function CompanyCard({ company}) {
 
  return (
    <section>
      <Card id={company.handle}>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
           <h2>{company.name}<img src={company.logoUrl} alt="" /></h2>  
          </CardTitle>
          
          <p>
             {company.description}
          </p>
          <p>
             <b>Number Of Employees </b> {company.numEmployees}
            </p>
           
        </CardBody>
      </Card>
    </section>
  );
}

export default CompanyCard;