 import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

 export default class EditEmployee extends Component {

  constructor(props) {
    super(props)

    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentState = this.onChangeStudentState.bind(this);
    this.onChangeStudentCity = this.onChangeStudentCity.bind(this);
    this.onChangeStudentEname = this.onChangeStudentEname.bind(this);
    this.onChangeStudentEemail = this.onChangeStudentEemail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      oname: '',
      oemail: '',
      ostate: '',
      ocity:'',
      Ename:'',
      Eemail:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/emp/' + this.props.match.params.id)
      .then(res => {
         console.log(res.data);
        this.setState({
          oname: res.data.oname,
          oemail: res.data.oemail,
          ostate: res.data.ostate,
          ocity:res.data.ocity,
          Ename:res.data.Ename,
          Eemail:res.data.Eemail
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeStudentName(e) {
    this.setState({ oname: e.target.value })
  }

  onChangeStudentEmail(e) {
    this.setState({ oemail: e.target.value })
  }

  onChangeStudentState(e) {
    this.setState({ ostate: e.target.value })
  }

  onChangeStudentCity(e) {
    this.setState({ ocity: e.target.value })
  }

  onChangeStudentEname(e) {
    this.setState({ Ename: e.target.value })
  }

  onChangeStudentEemail(e) {
    this.setState({ Eemail: e.target.value })
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
 
    axios.put('http://localhost:5000/emp/' + this.props.match.params.id, empObject)
      .then((res) => {
         console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })
     
    this.props.history.push('/Dash');
  }


   render() {
    return (
        
    <div className="form-wrapper">
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

            <Form.Group controlId="Ename">
            <Form.Control type="text"  autoComplete="off" value={this.state.Ename} onChange={this.onChangeStudentEname} placeholder="Employee Name"/>
            </Form.Group>
                    
            <Form.Group controlId="Eemail">
            <Form.Control type="email"  autoComplete="off" value={this.state.Eemail} onChange={this.onChangeStudentEemail} placeholder="Employee Email"/>
            </Form.Group>

         <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>
);
   }
 }