import { httpClient } from "../../api/http-client";
import { Setting } from "../seting-profile.model";


const UpdateUser = (userId: string, data: Setting) => {
    return new Promise((resolve, reject) => {
        httpClient
            .put(`/setting/update-user/${userId}`, data)
            .then((res: any) => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err: any) => reject(err.response));
    });
};

export default UpdateUser;