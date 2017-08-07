import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';


//import { API_URL } from './../constants';
//import axios from 'axios';
import requests from './../services/requests';
var CheckBoxList = require('react-checkbox-list');




class Admin extends Component{
  constructor(props) {
   super(props);
   this.state = {
     user: {},
     moderatorPages: [],
     userPages:[]
   };
   const {  getProfile } = this.props.auth;
//    this.setState({user:{}});
   getProfile((err, user) => {
     this.setState({ user });
     requests.getPages({type:'moderator'}).then((res)=>{
       this.setState({moderatorPages:res.data});
     })

     requests.getPages({type:'user'}).then((res)=>{
       this.setState({userPages:res.data});
     })
   });

   this.handleUserListChange = this.handleUserListChange.bind(this);
   this.handleModeratorListChange = this.handleModeratorListChange.bind(this);
 }

//   componentWillMount(){
//     /*this.setState({user:{}});
//     this.setState({moderatorPages:[]});
//     this.setState({userPages:[]});*/
//
//
//     const {  getProfile } = this.props.auth;
// //    this.setState({user:{}});
//     getProfile((err, user) => {
//       this.setState({ user });
//       requests.getPages({type:'moderator'}).then((res)=>{
//         this.setState({moderatorPages:res.data});
//       })
//
//       requests.getPages({type:'user'},(res)=>{
//       //  this.setState({userPages:res.data});
//
//       })
//     });
//   }

  save(user){
    let list=user=='moderator'?this.state.moderatorPages:this.state.userPages;
    requests.updateUser({type:user,pages:list}).then(()=>{
      console.log('ha');
    })
  }
  handleUserListChange(event) {
    console.log(this);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let list = this.state.userPages.slice();
    let index = this.state.userPages.indexOf(name);
    if(value){
      if(index==-1){
        list.push(name);
      };
    }else{
      if(index!=-1){
        list.splice(index,1)
      }
    }
    this.setState({'userPages': list});

 }
 handleModeratorListChange(event) {
   console.log(this);
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;
   let list = this.state.moderatorPages.slice();
   let index = this.state.moderatorPages.indexOf(name);
   if(value){
     if(index==-1){
       list.push(name);
     };
   }else{
     if(index!=-1){
       list.splice(index,1)
     }
   }
   this.setState({'moderatorPages': list});

}
 /*handleUserListChange(values) {
  console.log(values)
}*/
  render (){
    const user = this.state.user;
    const time = new Date().getTime();


    /*for(let i=0;i<moderatorPages.length;i++){
      console.log(i);
      console.log(moderatorPages[i].value);
      if(this.state.moderatorPages.includes( moderatorPages[i].value )){
        moderatorPages[2].checked=false;
      };
    //  moderatorPages[i].checked=
  }*/
    return(
      <div>
          <h3>Manage Users</h3>

          <div>
            <h6>Users pages</h6>
              Page 1 {this.props.lang.lang}<input type="checkbox"
                    name='page1'
                  checked={this.state.userPages.includes('page1')}
                  onChange={this.handleUserListChange}
                />
              Page 2<input type="checkbox"
                    name='page2'
                    checked={this.state.userPages.includes('page2')}
                    onChange={this.handleUserListChange}
                />
                Page 3<input type="checkbox"
                      name='page3'
                      checked={this.state.userPages.includes('page3')}
                      onChange={this.handleUserListChange}
                  />
              <Button onClick={this.save.bind(this,'user')}>Save</Button>
          </div>
          {user.role==='admin' && (<div>
                        <h6>Moderator pages</h6>
                          Page 1<input type="checkbox"
                                name='page1'
                              checked={this.state.moderatorPages.includes('page1')}
                              onChange={this.handleModeratorListChange}
                            />
                          Page 2<input type="checkbox"
                                name='page2'
                                checked={this.state.moderatorPages.includes('page2')}
                                onChange={this.handleModeratorListChange}
                            />
                            Page 3<input type="checkbox"
                                  name='page3'
                                  checked={this.state.moderatorPages.includes('page3')}
                                  onChange={this.handleModeratorListChange}
                              />
                            <Button onClick={this.save.bind(this,'moderator')}>Save</Button>
                    </div>
          )}
      </div>
    )
  }
}

export default Admin;
