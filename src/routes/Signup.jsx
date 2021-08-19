import React, {useState} from "react";
import { Card, CardBody, CardTitle,Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router";

function Signup( {signUp}) {
    const INITIAL_STATE = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
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
        signUp(formData);  
        setFormData(INITIAL_STATE)
        return <Redirect to="/" push />     
        
      
    }

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
        <Form onSubmit={handleSubmit}>
        <FormGroup>
        <Label for="username">Username: </Label>
        <Input type="text" name="username" id="username" placeholder="Username" onChange={handleChange} value={formData.username}/>
      </FormGroup>
        <FormGroup>
        <Label for="firstName">First Name: </Label>
        <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName}/>
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name: </Label>
        <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
      </FormGroup>     
      <FormGroup>
        <Label for="email">Email: </Label>
        <Input type="email" name="email" id="email" placeholder="E-mail" onChange={handleChange} value={formData.email} />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password: </Label>
        <Input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} value={formData.password} />
      </FormGroup>
      
      <Button>Submit</Button>
    </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default Signup;
