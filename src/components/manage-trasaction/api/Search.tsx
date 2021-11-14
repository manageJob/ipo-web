import { httpClient } from "../../../api/http-client";
import { Criteria } from "../manage-trasaction.model";

const Search = (param: Criteria) => {
    return new Promise((resolve, reject) => {
      httpClient
        .get<any[]>('/manage-transaction', { params: { ...param } })
        .then((res: any) => {
          if (res.status === 200) {
            return resolve(res);
          }
        })
        .catch((err: any) => reject(err.response));
    });
  };
  
  export default Search;
  