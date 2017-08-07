import React, { Component } from 'react';
import requests from './../services/requests'
import { Button } from 'react-bootstrap';



class Home extends Component {

  componentWillMount(){
    this.setState({ profile: {} });
    this.setState({user:{}});
    console.log(this.props.auth.isAuthenticated());
    if(!this.props.auth.isAuthenticated()){return}
    const {  getProfile } = this.props.auth;

      getProfile((err,user ,profile) => {
        this.setState({ profile });
        this.setState({user });

        console.log(profile);

      });


  }
  login() {
    this.props.auth.login();
  }
  changeRole(event){
    console.log(event.target.value);
    this.setState({role: event.target.value});
  }
  createUser(){
    console.log(this);
    requests.createUser({"name":this.state.profile.name,"role":this.state.role})
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const user = this.state.user;
    console.log(user)
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <div>
                You are logged in!
                {user.name && (<div>Hi {user.name}</div>)}
                {!user.name && (<div>
                      <div>
                      Your role is:<input type="text" value={this.state.role} onChange={this.changeRole.bind(this)} />
                        <Button onClick={this.createUser.bind(this)}></Button>
                      </div>
                  </div>)}
              </div>

            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
