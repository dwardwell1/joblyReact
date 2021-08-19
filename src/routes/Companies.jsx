import React, {useState,useContext} from "react";

import { Link, Redirect} from "react-router-dom";
import CompanyCard from "./CompanyCard";
import userContext from "../UserContext";

function Companies({companies, search}) {
  const user = useContext(userContext);
 
  const [searchQ, setSearchQ] = useState("");

  const handleChange = (event) => {
    const { name,value} = event.target;
    setSearchQ({[name]:value})
    };

    //still not sure how this works necessarily 
  async function submitLogic(e) {
    e.preventDefault();
    search(searchQ.name)
  }
  if(!user.username) {
    return <Redirect to="/login" />;
  }   
 
  return (
    <section className="col-md-8">
      <form action="" onSubmit={submitLogic}>
        <input type="text" name="name" value={searchQ.name} placeholder="Search for a company" onChange={handleChange} />
        <input type="submit" value="Search" />
      </form>
    
      { companies.map(company => (
        <Link style={{textDecoration: 'none'}} to={`/companies/${company.handle}`} key={company.handle}>
        <CompanyCard key={company.handle} company={company} />
          </Link> 
      ) ) }
    </section>
  );
}

export default Companies;
