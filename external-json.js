import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const userCredentials = new SharedArray('users ', function () {
    return JSON.parse(open('./users.json')).users;
});


export default function () {

    const randomCred = randomItem(userCredentials);
    userCredentials.forEach((item) => {
        const credentials = {
            username: randomCred.username,
            password: randomCred.password,
        }
    
        let res = http.post(
            'https://test-api.k6.io/user/register/',
            JSON.stringify(credentials),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    
        check(res, {
            'status is 201': (r) => r.status === 201
        });
    })
    

    // res = http.post(
    //     'https://test-api.k6.io/auth/token/login/',
    //     JSON.stringify(
    //         {
    //             username: credentials.username,
    //             password: credentials.password
    //         }
    //     ),
    //     {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    // );

    // check(res, {
    //     'status is 200': (r) => r.status === 200,
    //     'has access token': (r) => r.json() !== undefined
    // });
    
    // const accessToken = res.json().access;
}

