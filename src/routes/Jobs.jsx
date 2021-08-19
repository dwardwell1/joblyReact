import React, {useState, useContext, useEffect} from "react";
import Job from "./Job";
import { Redirect } from "react-router-dom";
import JoblyApi from "../api";

import userContext from "../UserContext";

function Jobs({ search}) {
  const user = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      
      let jobs = await JoblyApi.getJobs();
      let userJobs = jobs.map(job => job.id in user.applications ? {...job, applied: true} : job )
      setJobs(userJobs);
      setIsLoading(false);
    }
    getJobs();
  }, []);

  async function apply(jobId){
    setIsLoading(true);
      let application = await  JoblyApi.apply(user.username, jobId);
      setJobs(jobs.map(job => job.id === jobId ? {...job, applied: true} : job));
      setIsLoading(false);
   
     }


 

  const [searchQ, setSearchQ] = useState("");

  const handleChange = (event) => {
    const { name,value} = event.target;
    setSearchQ({[name]:value})
    };

    //still not sure how this works necessarily 
  async function submitLogic(e) {
    e.preventDefault();
    search(searchQ.name, "job")
  }
   if(!user.username) {
    return <Redirect to="/login" />;
  }   

  if (isLoading) {
    return <p style={{color:"black"}}>Loading &hellip;</p>;
  }
 
  return (
    <section className="col-md-8">
      <form action="" onSubmit={submitLogic}>
        <input type="text" name="name" value={searchQ.name} placeholder="Search for a job" onChange={handleChange} />
        <input type="submit" value="Search" />
      </form>
    
      { jobs.map(job => (
       
        <Job key={job.id} job={job} apply={apply} />
          
      ) ) }
    </section>
  );
}

export default Jobs;