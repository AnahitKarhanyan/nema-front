import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from './../constants';
import axios from 'axios';
import requests from './../services/requests';

class Ping extends Component {
  componentWillMount() {
    this.setState({ message: '' });
  }
  user() {
    const { getAccessToken } = this.props.auth;
    const headers = {'withCredentials': true, 'crossDomain': true,'Authorization': `Bearer ${getAccessToken()}`}



    axios({
       method:'post',
       url:`${API_URL}/user`,
       data:{name:'john',role:'admin'},
       headers:headers
    })
  }
  userGet(){

    return requests.userGet();
  }
  ping() {
    axios.get(`${API_URL}/public`)
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  securedPing() {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.get(`${API_URL}/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { message } = this.state;
    return (
      <div className="container">
        <h1>Make a Call to the Server</h1>
        {
          !isAuthenticated() &&
            <p>Log in to call a private (secured) server endpoint.</p>
        }
        <Button bsStyle="primary" onClick={this.ping.bind(this)}>Ping</Button>
        <Button onClick={this.user.bind(this)}>User</Button>
        <Button onClick={this.userGet.bind(this)}>User get</Button>

        {' '}
        {
          isAuthenticated() && (
              <Button bsStyle="primary" onClick={this.securedPing.bind(this)}>
                Call Private
              </Button>
            )
        }
        <h2>{message}</h2>
      </div>
    );
  }
}

export default Ping;
