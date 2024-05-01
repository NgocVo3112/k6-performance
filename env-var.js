import http from "k6/http";
import { check } from "k6";

export default function () {
    let res = http.get(`${__ENV.BASE_URL}public/crocodiles/`); // run -e BASE_URL=https://test-api.k6.io/  http-post.js

}
