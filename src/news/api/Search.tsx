import { httpClient } from "../../api/http-client";
import { Criteria, News } from "../news.model";

const Search = (param: Criteria) => {
    return new Promise((resolve, reject) => {
      httpClient
        .get<News[]>('/news', { params: { ...param } })
        .then((res: any) => {
          if (res.status === 200) {
            return resolve(res);
          }
        })
        .catch((err: any) => reject(err.response));
    });
  };
  
  export default Search;
  