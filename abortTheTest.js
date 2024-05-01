import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 10,
    duration: '60s'
}
export function setup() {
    let res = http.get('https://test.k6.io.local/status');
    if (res.error){
        exec.test.abort('Aborting test. Application is DOWN')
    }
}

export default function(){
    http.get('https://test.k6.io/somepAGE');
    sleep(1);

}