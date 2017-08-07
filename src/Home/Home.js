import React, { Component } from 'react';
import requests from './../services/requests'
import { Button } from 'react-bootstrap';

import lang from './../services/lang';




class Home extends Component {

  componentWillMount(){
    this.setState({lang:this.props.lang.lang})

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
  componentWillReceiveProps(nextProps){
    this.setState({lang:nextProps.lang.lang});
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
    requests.createUser({"name":this.state.profile.name,"role":this.state.role}).then(()=>{
      window.location.reload();
    },(err)=>{
      alert('Something went wrong'),console.log(err);
    })
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const user = this.state.user||{};
    const ln=lang[this.state.lang]||{};

    return (
      <div className="container">
        {
          isAuthenticated() && (
              <div>
                {ln.LOGGED_IN}
                {user && user.name && (<div>Hi {user.name}</div>)}
                {!user.name && (<div>
                      <div>
                      {ln.ROLE_IS}:<input type="text" value={this.state.role} onChange={this.changeRole.bind(this)} />
                        <Button onClick={this.createUser.bind(this)}>Send</Button>(admin,moderator,user)
                      </div>
                  </div>)}
              </div>

            )
        }
        {
          !isAuthenticated() && (
              <h4>
                {ln.PLEASE_LOGIN} Please{' '}
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
