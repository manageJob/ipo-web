import { httpClient } from "../../../api/http-client";
import { Transaction } from "../deposit-withdraw.model";

const AddTransaction = (data: Transaction) => {
    return new Promise((resolve, reject) => {
        httpClient
            .post(`/transaction`, data)
            .then(res => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err) => reject(err.response));
    })
};

export default AddTransaction;