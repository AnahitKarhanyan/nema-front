import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';


//import { API_URL } from './../constants';
//import axios from 'axios';
import requests from './../services/requests';
var CheckBoxList = require('react-checkbox-list');




class Admin extends Component{
  componentWillMount(){
    this.setState({user:{}});
    this.setState({moderatorPages:[]});
    this.setState({userPages:[]});


    const {  getProfile } = this.props.auth;
//    this.setState({user:{}});
    getProfile((err, user) => {
      this.setState({ user });
      requests.getPages({type:'moderator'}).then((res)=>{
        this.setState({moderatorPages:res.data});
      })

      requests.getPages({type:'user'},(res)=>{
      //  this.setState({userPages:res.data});

      })
    });
  }

  save(){
    requests.updateUser({type:'user',pages:['page1','page416']}).then(()=>{
      console.log('ha');
    })
  }
  handleUserListChange(event) {
    console.log(this);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    /*this.setState({
     [name]: value
   });*/

 }
 /*handleUserListChange(values) {
  console.log(values)
}*/
  render (){
    const user = this.state.user;
    let  moderatorPages = [
      {value: 'page1', label: 'Page1'},
      {value: 'page2', label: 'Page2'},
      {value: 'page3', label: 'Page3', checked: true} // check by default
    ];
    let  userPages = [
      {value: 'page1', label: 'Page1'},
      {value: 'page2', label: 'Page2'},
      {value: 'page3', label: 'Page3', checked: true} // check by default
    ];
    for(let i=0;i<userPages.length;i++){
      userPages[i].checked=this.state.userPages.includes( userPages[i].value )
    }

    for(let i=0;i<moderatorPages.length;i++){
      console.log(i);
      console.log(moderatorPages[i].value);
      if(this.state.moderatorPages.includes( moderatorPages[i].value )){
        moderatorPages[2].checked=false;
      };
    //  moderatorPages[i].checked=
    }
    return(
      <div>
          <h3>Manage Users</h3>

          <div>
            <h6>Users pages</h6>
              Page 1<input type="checkbox"
                    name='page1'
                  checked={this.state.moderatorPages.includes('page1')}
                  onChange={this.handleUserListChange}
                />
              Page 2<input type="checkbox"
                    name='page2'
                    checked={this.state.moderatorPages.includes('page1')}
                    onChange={this.handleUserListChange}
                />
                Page 3<input type="checkbox"
                      name='page3'
                      checked={this.state.moderatorPages.includes('page1')}
                      onChange={this.handleUserListChange}
                  />
              <Button onClick={this.save.bind(this,'user')}>Save</Button>
          </div>
          {user.role==='admin' && (<div>
                        <h6>Moderator pages</h6>
                        <CheckBoxList ref="chkboxList" defaultData={moderatorPages} onChange={this.handleModeratorListChange} />

                        <Button onClick={this.save.bind(this,'user')}>Save</Button>
                    </div>
          )}
      </div>
    )
  }
}

export default Admin;
