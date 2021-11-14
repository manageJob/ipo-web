import { httpClient } from "../../../api/http-client";
import { TransactionDetail } from "../deposit-withdraw.model";

const GetTransaction = (userId: any) => {
    return new Promise((resolve, reject) => {
        httpClient
            .get<TransactionDetail>(`/transaction/userId/${userId}`)
            .then((res: any) => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err: any) => reject(err.response));
    });
};

export default GetTransaction;