import { httpClient } from "../../api/http-client";

const Authenticate = (data: any) => {
    return httpClient
        .post(`/authenticate`, data)
        .then((res: any) => {
            if (res.status === 200) {
                return res;
            }
        })
};

export default Authenticate;