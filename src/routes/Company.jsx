import React, {useState, useEffect, useContext} from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Redirect, useParams } from "react-router-dom";
import Job from "./Job";
import JoblyApi from "../api";
import userContext from "../UserContext";
function Company({companies, cantFind, apply}) {
  const user = useContext(userContext);
 
    //Brought in isLoading and Company state to find jobs of the company, is there better solution?
    const [isLoading, setIsLoading] = useState(true);
    let [company, setCompany] = useState(null);
    const {handle}  = useParams();

    useEffect(() => {
        async function getCompanyJobs() {
         
          let companyJobs = await JoblyApi.getCompany(handle);
           setCompany(companyJobs);
          setIsLoading(false);
         }
        getCompanyJobs();  
        }, []);
      if(!user.username) {
    return <Redirect to="/login" />;
  }    
      
    //included my check to see if company exists in loading component 
      if (isLoading) {
          let check = companies.find(company => company.handle === handle);
        if (!check) return <Redirect to={cantFind} />; 
        return <p style={{color:"black"}}>Loading &hellip;</p>;
      }
 
    
  return (
    <section className="col-md-8">
        
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      {company.jobs.map(job => (
        <Job key={job.id} job={job} apply={apply} />
      ))}
    </section>
  );
}

export default Company;
