import http from "k6/http";
import { check } from "k6";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const credentials = {
        username : 'test_' +  randomString(8),
        password : 'secret_' +  randomString(8)
    }
    http.post(
        'https://test-api.k6.io/user/register/', 
        JSON.stringify(credentials), 
        params);

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        params
    );

    const accessToken = res.json().access;
    console.log(accessToken);
    http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
        
    );



}