import { httpClient } from "../../api/http-client";


const GetRole = () => {
    return httpClient
        .get(`/manage-user/role`)
        .then((res: any) => {
            if (res.status === 200) {
                return res;
            }
        })
};

export default GetRole;