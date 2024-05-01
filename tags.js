import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        'http_req_duration{status:200}': ['p(95)<2000'],
        'http_req_duration{status:201}': ['p(95)<2000']
    }
}


export default function(){
    http.get('https://run.mocky.io/v3/c6b01b7d-16b7-44fe-85cd-03db263c58f5');
    http.get('https://run.mocky.io/v3/783b6277-5588-445f-83cc-00eb24cc295f?mocky-delay=2000ms');
}