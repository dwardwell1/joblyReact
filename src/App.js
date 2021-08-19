import React, { useState, useEffect } from "react";
import { BrowserRouter,  Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Companies from "./routes/Companies";
import Company from "./routes/Company";
import Jobs from "./routes/Jobs";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Profile from "./routes/Profile";
import NavBar from "./Nav/NavBar"
import userContext from "./UserContext";
import useLocalStorage from "./Hooks/LocalStorage";

import JoblyApi from "./api";
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useLocalStorage("user", "");
  const [token, setToken] = useLocalStorage("token", "");
  // const [applied, setApplied] = useState([]);

  useEffect(() => {
    async function getCompaniesAndJobs() {
     
      let companies = await JoblyApi.getCompanies();
      let jobs = await JoblyApi.getJobs();

      setCompanies(companies);
      setJobs(jobs);
      setIsLoading(false);
    }
    getCompaniesAndJobs();
  }, []);

   async function search(query,type='company'){
    setIsLoading(true);
    if( type === 'job'){
      let jobs = await JoblyApi.searchJobs(query);
      setJobs(jobs);
    } else {
    let companies = await JoblyApi.searchCompanies(query);
    setCompanies(companies);}
    setIsLoading(false);
  }

  async function signUp(newUser){
    setIsLoading(true);
   let regUser = await JoblyApi.register(newUser);

   setToken(regUser);
   let user = await JoblyApi.getUser(newUser.username);
   setUser(user);
   setIsLoading(false);
  }
  async function login(curUser){
    setIsLoading(true);
    try  {
       let getToken = await JoblyApi.login(curUser);
       await setToken(getToken.token);
       console.log("test token" + token)
       let user = await JoblyApi.getUser(curUser.username); 
       await setUser(user);
       setJobs(jobs.map(job => job.id in user.applications ? {...job, applied: true} : job))
       setIsLoading(false);

    } catch (err) {
      alert(err); 
      setIsLoading(false);
    }
  }
  


  //not clearing out local storage here with either method
  function logout(){
    
    console.log("logging out")
    setToken("");
    setUser({});
    
  }

  async function updateUser(name, data) {
    setIsLoading(true);
    let user = await JoblyApi.updateUser(name, data);
    setUser(user);
    setIsLoading(false);
  }

  // async function apply(jobId){
  //   setIsLoading(true);
  //     let application = await  JoblyApi.apply(user.username, jobId);
  //     setJobs(jobs.map(job => job.id === jobId ? {...job, applied: true} : job));
  //     setIsLoading(false);
   
     
      
    
    
  

   


  if (isLoading) {
    return <p style={{color:"black"}}>Loading &hellip;</p>;
  }

  return (
    <userContext.Provider value={user}>
    <div className="App">
      <BrowserRouter>
        <NavBar logout={logout} />
    
          <h1>Welcome {user.username}</h1> 
        <main>
          <Switch>
            <Route exact path="/">
              <Home  />
            </Route>
            <Route exact path="/companies">
              <Companies companies={companies} search={search}  />
            </Route>
            <Route path="/companies/:handle">
              <Company companies={companies} cantFind="/companies"  />
            </Route>
            <Route exact path="/jobs">
              <Jobs jobs={jobs} search={search}  />
            </Route>
            <Route path="/login">
              <Login login={login} user={user}  />
            </Route>
            <Route path="/signup" >
              <Signup signUp={signUp} />
            </Route>
            <Route path="/profile">
              <Profile updateUser={updateUser} />
            </Route>


            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
    </userContext.Provider>
  );
}

export default App;
