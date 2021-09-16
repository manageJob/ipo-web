import { httpClient } from "../../api/http-client";
import { User } from "../news.model";


const AddManageUser = (data: User) => {
    return new Promise((resolve, reject) => {
        httpClient
            .post(`/manage-user`, data)
            .then(res => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err) => reject(err.response));
    })
};

export default AddManageUser;