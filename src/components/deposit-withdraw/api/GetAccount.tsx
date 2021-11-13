import { httpClient } from "../../../api/http-client";

const GetAccount = () => {
    return httpClient
        .get(`/transaction/account`)
        .then((res: any) => {
            if (res.status === 200) {
                return res;
            }
        })
};

export default GetAccount;