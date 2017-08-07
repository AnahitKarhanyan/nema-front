import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
import requests from './services/requests';
import lang from './services/lang';


class App extends Component {
  componentWillMount(){
    this.setState({lang:this.props.lang.lang});
    this.setState({user:{}});
    const {  getProfile } = this.props.auth;
    if(!this.props.auth.isAuthenticated()){return};
      getProfile((err, user) => {
        this.setState({ user });

      });
  }
  componentWillReceiveProps(nextProps){
    this.setState({lang:nextProps.lang.lang});
  }

  changeLanguage(event){
    const value = event.target.value;
    //this.getState('lang').set('lang',value)
    this.setState({lang:{lang:value}})
    this.props.lang.lang=value;
    this.goTo(window.location.pathname.substr(1));
  }
  goTo(route) {
    this.props.history.replace(`/${route}`);
    console.log(this)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  hasAccess(user,page){
    if(!user){return false};
    if (user.role=='admin') {
      return true;
    }
    if(user.role=='moderator' &&  page=='admin'){
      return true;
    }
    return user.pages && user.pages.includes(page);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const hasAccess = this.hasAccess;
    const ln=lang[this.state.lang]||{};

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>

            <select onChange={this.changeLanguage.bind(this)}>
                <option value='en'>En</option>
                <option value='hy'>Hy</option>
            </select>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              {ln.HOME}
            </Button> {this.state.lang.lang}
            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              hasAccess(this.state.user,'page1') && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'page1')}
                  >
                    Page1
                  </Button>
                )
            }
            {
              hasAccess(this.state.user,'page2') && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'page2')}
                  >
                    Page2
                  </Button>
                )
            }
            {
              hasAccess(this.state.user,'page3') && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'info')}
                  >
                    Page3
                  </Button>
                )
            }
            {
              hasAccess(this.state.user,'admin') && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'admin')}
                  >
                    Admin
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
