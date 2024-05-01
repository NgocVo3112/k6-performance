import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';
import {Counter, Trend } from 'k6/metrics';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<100'],
        // http_req_failed: ['rate<0.01'],
        http_reqs:['count>20'],
        http_reqs:['rate>4'],
        vus: ['value>9'],
        response_time_news_page: ['p(95)<150', 'p(99)<200']
    }
}
let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function(){
    let res = http.get('https://test.k6.io/');
    myCounter.add(1);
    // console.log(exec.scenario.iterationInTest);
    // check(res,{
    //     'status is 200': (r) => r.status === 200,
    //     'page is start': (r) => r.body.includes('Collection of')
    // })
    sleep(1);
    res = http.get('https://test.k6.io/news.php');
    newsPageResponseTrend.add(res.timings.duration);
    sleep(1);

}

// run local but export report from cloud
// k6 first-script.js -o cloud

// run by CLI : k6 run first-script.js --vus 1 --duration 10s --interations 1
// run by CLI : k6 run first-script.js -u 1 --d 10s -i 1

// export result json :  k6 run first-script.js --summmary-export=summmary.json
// export result json :  k6 run first-script.js --out json=full_results.json