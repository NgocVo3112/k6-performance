import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    stages: [
        { 
            duration: '10s',
            target: 10000
        },
        { 
            duration: '1m',
            target: 0
        },
    ]
}

export default function(){
    http.get('https://test.k6.io/');
    sleep(1);
}