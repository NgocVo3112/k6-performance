import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    stages: [
        { // ram-up
            duration: '10s',
            target: 1000
        },
        {
            duration: '30s',
            target: 1000
        },
        { // ram-down
            duration: '5s',
            target: 0
        },
    ]
}

export default function(){
    http.get('https://test.k6.io/');
    sleep(1);
    http.get('https://test.k6.io/contact.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}