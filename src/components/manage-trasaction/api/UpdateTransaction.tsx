import { httpClient } from "../../../api/http-client";

const UpdateTransaction = (status: String, id: number[]) => {
    return new Promise((resolve, reject) => {
        httpClient
        .put(`/manage-transaction/${status}?ids=${id}`)
        .then(res => {
            if (res.status === 200) {
                return resolve(res);
            }
        })
        .catch((err) => reject(err.response));
    });
};

export default UpdateTransaction;