import { httpClient } from "../../api/http-client";


const GetUserById = (userId: string) => {
    return httpClient
        .get(`/setting/${userId}`)
        .then((res: any) => {
            if (res.status === 200) {
                return res;
            }
        })
};

export default GetUserById;