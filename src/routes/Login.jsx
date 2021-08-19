import React, {useState, useContext} from "react";
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Redirect } from "react-router";
import userContext from "../UserContext";

function Login({login}) {
  const user = useContext(userContext);

  const INITIAL_STATE = {
    username: "",
    password: ""}
const [formData, setFormData] = useState(INITIAL_STATE);


const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }))};
 async function handleSubmit(event){
     
    event.preventDefault();
    login(formData);  
    setFormData(INITIAL_STATE)
     
    
  
}
//come back and add AUTH to make sure user is real before redirecting
  return (
      
    <section className="col-md-16">
      { user.username   ? 
             <Redirect to={"/"}/> :
        
      <Card>
        <CardBody className="text-center">
        <Form onSubmit={handleSubmit}>
        <FormGroup>
        <Label for="username">Username: </Label>
        <Input type="username" name="username" id="username" placeholder="Username" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password: </Label>
        <Input type="password" name="password" id="password" placeholder="Password"  onChange={handleChange}/>
      </FormGroup>
      
      <Button>Login</Button>
    </Form>
        </CardBody>
      </Card> }
   
    </section>
  );
}

export default Login;
