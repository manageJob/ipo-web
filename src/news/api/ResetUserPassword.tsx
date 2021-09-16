import { httpClient } from "../../api/http-client";

const ResetUserPassword = (id: string) => {
    return new Promise((resolve, reject) => {
        httpClient
            .put(`/manage-user/reset-password/${id}`)
            .then((res: any) => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err: any) => reject(err.response));
    });
};

export default ResetUserPassword;