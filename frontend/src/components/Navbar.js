import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto navbar">
                <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                            Logout
                </a>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login &nbsp;<i class="fa fa-sign-in" aria-hidden="true"></i></Link>
            </li>
        </ul>
      )
        return(
          <div class="col-lg-12 col-sm-12 col-12">  
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {isAuthenticated? <Link className="navbar-brand" to="/Dash">EmPowerED</Link> 
         : <Link className="navbar-brand" to="/Login">EmPowerED</Link> }
                <div className="" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
            </div>   
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));