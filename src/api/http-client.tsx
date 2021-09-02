import axios from 'axios';
import { Token } from '../models/token.model';

const instance = axios.create({
  baseURL: 'https://manage-ipo-api.herokuapp.com/',
});

instance.interceptors.request.use(
  (config) => {
    document.body.classList.add('loading-indicator')
    const localStorageToken = localStorage.getItem('ipoToken');
    if (localStorageToken) {
      const token: Token = {};
      Object.assign(token, JSON.parse(localStorageToken));
      config.headers['Authorization'] = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => {
    document.body.classList.remove('loading-indicator');
    Promise.reject(error);
  }
);


instance.interceptors.response.use(
  (response) => {
     document.body.classList.remove('loading-indicator');
    return response;
  },
  (err) => {
    document.body.classList.remove('loading-indicator');
    return new Promise((resolve, reject) => {
      const originalReq = err.config;
      const localStorageToken = localStorage.getItem('ipoToken');
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
            localStorage.removeItem(`ipoToken`);
            window.open('https://manage-ipo-api.herokuapp.com/', '_self');
          })
          .then((res) => {
            const dataToken = {
              access_token: res.access_token,
              refresh_token: res.refresh_token,
            };
            localStorage.setItem(`ipoToken`, JSON.stringify(dataToken));
            return instance(originalReq);
          });
        resolve(res);
      }
      return reject(err);
    });
  }
);

export const httpClient = instance;
