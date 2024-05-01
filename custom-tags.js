import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';
import { Counter } from 'k6/metrics';


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        'http_req_duration{page:order}': ['p(95)<2000'],
        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0'],
        checks: ['rate>=0.99'],
        'checks{page:order}':['rate>=0.99']
    }
}

let httpErrors = new Counter('http_errors');

export default function(){
    let res = http.get('https://run.mocky.io/v3/c6b01b7d-16b7-44fe-85cd-03db263c58f5');
    if (res.error) {
        httpErrors.add(1);
    }
    check(res, {
        'status id 200' : (r) => r.status === 200
    });
    res = http.get('https://run.mocky.io/v3/783b6277-5588-445f-83cc-00eb24cc295f?mocky-delay=2000ms',
    {
        tags: {
            page: 'order'
        }
    });
    if (res.error) {
        httpErrors.add(1,{page: 'order'});
    }
    check(res, {
        'status id 201' : (r) => r.status === 201
    }, {
        page: 'order'
    });
}