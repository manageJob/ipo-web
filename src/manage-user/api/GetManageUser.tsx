import { httpClient } from "../../api/http-client";
import { User } from "../manage-user.model";

const GetManageUser = (id: string) => {
    return new Promise((resolve, reject) => {
        httpClient
            .get<User>(`/manage-user/${id}`)
            .then((res: any) => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err: any) => reject(err.response));
    });
};

export default GetManageUser;