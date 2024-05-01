import http from 'k6/http';
import { check, sleep , group} from 'k6';
import exec from 'k6/execution';
import { Counter } from 'k6/metrics';


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        'group_duration{group:::Main page}': ['p(95)<8000'],
        'group_duration{group:::News page}': ['p(95)<6000'],
        'group_duration{group:::Main page::Asset}': ['p(95)<3000']
    }
}

let httpErrors = new Counter('http_errors');

export default function(){
    group('Main page', function() {
        let res = http.get('https://run.mocky.io/v3/783b6277-5588-445f-83cc-00eb24cc295f?mocky-delay=5000ms');
        check(res, {
            'status id 200' : (r) => r.status === 200
        });
        group('Asset', function() {
            http.get('https://run.mocky.io/v3/783b6277-5588-445f-83cc-00eb24cc295f?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/783b6277-5588-445f-83cc-00eb24cc295f?mocky-delay=1000ms');
        })
    });

    group('News page', function() {
        http.get('https://run.mocky.io/v3/783b6277-5588-445f-83cc-00eb24cc295f?mocky-delay=5000ms');
    })
}