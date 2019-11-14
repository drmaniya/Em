import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EmployeeTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }
    
    deleteStudent() {
       if(window.confirm('Are you sure?'))
         axios.delete('http://localhost:5000/emp/' + this.props.obj._id)
            .then((res) => {
                
                console.log('Student successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
            window.location.reload(); 
    }

    render() {
        return (
         
            <tr>
                <td>{this.props.obj.oname}</td>
                <td>{this.props.obj.oemail}</td>
                <td>{this.props.obj.ostate}</td>
                <td>{this.props.obj.ocity}</td>
                <td>{this.props.obj.Ename}</td>
                <td>{this.props.obj.Eemail}</td>
                <td>
            <span><i class="fa fa-trash-o" onClick={this.deleteStudent} aria-hidden="true"></i> &nbsp;&nbsp;
            <Link className="edit-link" to={"/edit-employee/" + this.props.obj._id}> <i class="fa fa-pencil-square-o" aria-hidden="true">
            </i></Link></span>
                </td>
              </tr>
          
        );
    }
}