import { httpClient } from "../../api/http-client";
import { User } from "../manage-user.model";

const UpdateManageUser = (id: string, data: User) => {
    return new Promise((resolve, reject) => {
        httpClient
            .put(`/manage-user/${id}`, data)
            .then((res: any) => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err: any) => reject(err.response));
    });
};

export default UpdateManageUser;