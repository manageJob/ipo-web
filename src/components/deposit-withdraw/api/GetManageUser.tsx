import { httpClient } from "../../../api/http-client";
import { BankDetail } from "../deposit-withdraw.model";

const getBankDetail = (id: string) => {
    return new Promise((resolve, reject) => {
        httpClient
            .get<BankDetail>(`/transaction/${id}`)
            .then((res: any) => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err: any) => reject(err.response));
    });
};

export default getBankDetail;