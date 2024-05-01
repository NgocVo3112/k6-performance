import http from "k6/http";
import { check } from "k6";
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();
    const crocodilesIds = crocodiles.map(item => item.id);
    const crocodilesId = randomItem(crocodilesIds);
    // const crocodilesName = crocodiles[0].name;
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodilesId}/`);

    // check(res, {
    //     'status is 200': (r) => r.status === 200,
    //     // 'crocodiles is Sobek' : (r) => r.body.includes('Sobek')
    //     'crocodiles name ' : (r) => r.json().name ===crocodilesName
    // })
    // console.log(res.headers['Content-Type']);
}
// DEBUG :  k6 run --http-debug  http-get.js // not include response body
// DEBUG :  k6 run --http-debug="full"  http-get.js //  include response body