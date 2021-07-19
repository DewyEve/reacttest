import axios from 'axios';

export class HttpClient {

    constructor(){
        // todo: bearer token
    }

    request = ({method, url, data, callback, errCallback}) => {
        
        axios({
            method: method,
            url: url,
            data: data
            })
            .then(function (response) {
                if(callback) {
                    callback(response);
                }
            })
            .catch((err)=> {
                if(errCallback){
                    errCallback(err);
                }
            });
    }
}