import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';

// a breakpoint test is designed to determine the maximum capacity of an application
export const options = {
    stages: [
        { 
            duration: '2h',
            target: 10000
        }
    ]
}

export default function(){
    http.get('https://test.k6.io/');
    sleep(1);
}