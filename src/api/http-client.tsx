import axios from 'axios';
import { Token } from '../models/token.model';

const instance = axios.create({
  baseURL: 'https://manage-ipo-api.herokuapp.com',
});

instance.interceptors.request.use(
  (config) => {
    // const localStorageToken = localStorage.getItem('antToken');
    if (true) {
      // const token: Token = {};
     // Object.assign(token, JSON.parse(localStorageToken));
      config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyOTUxMTg3NCwiaWF0IjoxNjI5NDc1ODc0fQ.WlLGYNz8-jBxeaTWcm5wROiI3GwMX-ygoDsX8jYflA0SEfW5-Ysc1ac1d-FWR00RDgCp6Kf_nUYiFbR-qtut1w`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }

);


instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config;
      const localStorageToken = localStorage.getItem('antToken');
      if (
        err.response.status === 401 &&
        err.config &&
        !err.config.__isRetryRequest
      ) {
        originalReq._retry = true;
        const token: Token = {};
        Object.assign(
          token,
          JSON.parse(localStorageToken ? localStorageToken : '')
        );
        let res = fetch(`${process.env.REACT_APP_ANT_API_LOGIN}/oauth/token`, {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + btoa('client:secret'),
            'Content-type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
            originalReq._retry = false;
            localStorage.removeItem(`antToken`);
            window.open(`${process.env.REACT_APP_ANT_WEB_LOGIN}`, '_self');
          })
          .then((res) => {
            const dataToken = {
              access_token: res.access_token,
              refresh_token: res.refresh_token,
            };
            localStorage.setItem(`antToken`, JSON.stringify(dataToken));
            return instance(originalReq);
          });
        resolve(res);
      }
      return reject(err);
    });
  }
);

export const httpClient = instance;
