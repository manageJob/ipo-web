import { httpClient } from "../../api/http-client";


const UpdatePassword = (userId: string, data: any) => {
    return new Promise((resolve, reject) => {
        httpClient
            .put(`/setting/update-password/${userId}`, data)
            .then((res: any) => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err: any) => reject(err.response));
    });
};

export default UpdatePassword;