import React, { Component } from 'react';
 import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
 import "bootstrap/dist/css/bootstrap.css";
 import CreateEmp from './CreateEmp';
import { logoutUser } from '../actions/authentication';
 import EmployeeTableRow from './EmployeeTableRow';
 import Form from 'react-bootstrap/Form'
 import Button from 'react-bootstrap/Button';
 import axios from 'axios';
 import EditEmployee from './EditEmployee';
 export default class Home extends Component {
    constructor(props) {
        super(props)
    
        // Setting up functions
        this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
        this.onChangeStudentState = this.onChangeStudentState.bind(this);
        this.onChangeStudentCity = this.onChangeStudentCity.bind(this);
        this.onChangeStudentEname = this.onChangeStudentEname.bind(this);
        this.onChangeStudentEemail = this.onChangeStudentEemail.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
       
        // Setting up state
        this.state = {
          oname: '',
          oemail: '',
          ostate: '',
          ocity:'',
          Employee:[],
          no:0,
          show:true,
          Ename:'',
          Eemail:''
        }
      }
     
      onChangeStudentName(e) {
        this.setState({oname: e.target.value})
      }
    
      onChangeStudentEmail(e) {
        this.setState({oemail: e.target.value})
      }
    
      onChangeStudentState(e) {
        this.setState({ostate: e.target.value})
      }

      onChangeStudentCity(e) {
        this.setState({ocity: e.target.value})
      }
      onChangeStudentEname(e) {
        this.setState({Ename: e.target.value})
      }
      onChangeStudentEemail(e) {
        this.setState({Eemail: e.target.value})
      }
    
       onSubmit(e) {
        e.preventDefault()
        const empObject = {
            oname: this.state.oname,
            oemail: this.state.oemail,
            ostate: this.state.ostate,
            ocity:this.state.ocity,
            Ename:this.state.Ename,
            Eemail:this.state.Eemail
          };
        console.log(`Name: ${this.state.oname}`);
        console.log(`Email: ${this.state.oemail}`);
        console.log(`State: ${this.state.ostate}`);
        console.log(`City: ${this.state.ocity}`);
        console.log(`Ename: ${this.state.Ename}`);
        console.log(`Eemail: ${this.state.Eemail}`);
        
        
        axios.post('http://localhost:5000/emp', empObject)
        .then(res => console.log(res.data));
  
    
        this.setState({oname: '', oemail: '', ostate: '', ocity: '',Ename: '',Eemail: ''});
        this.componentDidMount();
        }
    
      componentDidMount() {
        axios.get('http://localhost:5000/emp')
          .then(res => {
            this.setState({
              Employee: res.data
            });
          })
          .catch((error) => {
            console.log(error);
          })
       
      }
      
      DataTable() {
        return this.state.Employee.map((res, i) => {
          return <EmployeeTableRow obj={res} key={i} />;
        });
      }
      IncrementItem = () => {
        this.setState({ no: this.state.no + 1 });
      }
      DecreaseItem = () => {
        this.setState({ no: this.state.no - 1 });
      }
    render() {
    
            return (
          
            <div class="col-12">
              {/* <Switch>
                <Route path="/edit-employee" component={EditEmployee} />/:
              </Switch> */}
                <label>Owner</label>
                <Form onSubmit={this.onSubmit}>
                    
                    <Form.Group controlId="Name">
                     <Form.Control type="text"  autoComplete="off" value={this.state.oname} onChange={this.onChangeStudentName} placeholder="Name"/>
                    </Form.Group>
                    
                    <Form.Group controlId="Email">
                    <Form.Control type="email" autoComplete="off" value={this.state.oemail} onChange={this.onChangeStudentEmail} placeholder="Email"/>
                    </Form.Group>

                    <Form.Group controlId="State">
                    <Form.Control type="text"  autoComplete="off" value={this.state.ostate} onChange={this.onChangeStudentState} placeholder="State"/>
                    </Form.Group>
                    
                    <Form.Group controlId="City">
                    <Form.Control type="text"  autoComplete="off" value={this.state.ocity} onChange={this.onChangeStudentCity} placeholder="City"/>
                    </Form.Group>

                    <br></br>
                   <span> How many employees? <Button onClick={this.DecreaseItem}>-</Button>&nbsp;&nbsp; {this.state.no}  &nbsp;&nbsp;<Button onClick={this.IncrementItem}>+</Button></span>
                    <br></br><br></br>
                    <Form.Group controlId="Ename">
                    <Form.Control type="text"  autoComplete="off" value={this.state.Ename} onChange={this.onChangeStudentEname} placeholder="Employee Name"/>
                    </Form.Group>
                    
                    <Form.Group controlId="Eemail">
                    <Form.Control type="email"  autoComplete="off" value={this.state.Eemail} onChange={this.onChangeStudentEemail} placeholder="Employee Email"/>
                    </Form.Group>
                    <Button variant="danger" size="lg" block="block" type="submit">
                       Submit
                    </Button>
                 </Form>
        
                  <table class="table table-responsive">
                     <thead>
                        <tr>
                           <td>Name</td>
                           <td>Email</td>
                           <td>State</td>
                           <td>City</td>
                           <td>Ename</td>
                           <td>Eemail</td>
                           <td>Actions</td>
                        </tr>
                     </thead>
                         
                        {this.DataTable()}
                   
              </table>                     
      

        </div>
                   
           );
        }
}