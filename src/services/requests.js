import { API_URL } from './../constants';
import axios from 'axios';
import Auth from './../Auth/Auth';
const auth = new Auth();

let requests= {

  getUser(username){
    const  getAccessToken  =auth.getAccessToken;
    const headers = {'withCredentials': true, 'crossDomain': true,'Authorization': `Bearer ${getAccessToken()}`}

    return axios({
       method:'get',
       url:`${API_URL}/user/${username}`,
       headers:headers
    })
  },
  updateUser(pages){
    console.log(pages);
    const  getAccessToken  =auth.getAccessToken;
    const headers = {'withCredentials': true, 'crossDomain': true,'Authorization': `Bearer ${getAccessToken()}`}

    return axios({
       method:'put',
       url:`${API_URL}/user`,
       data:pages,
       headers:headers
    })
  },
  getPages(data){
    const  getAccessToken  =auth.getAccessToken;
    const headers = {'withCredentials': true, 'crossDomain': true,'Authorization': `Bearer ${getAccessToken()}`}

    return axios({
       method:'post',
       url:`${API_URL}/user/userPages`,
       data:data,
       headers:headers
    })

  },
  createUser(user){
    const  getAccessToken  =auth.getAccessToken;
    const headers = {'withCredentials': true, 'crossDomain': true,'Authorization': `Bearer ${getAccessToken()}`}

    return axios({
       method:'post',
       url:`${API_URL}/user`,
       data:user,
       headers:headers
    })
  }
    /*getOrder(id: number|string): Promise<IOrder> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("pick/order/" + id),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }*/



}
export default requests;
