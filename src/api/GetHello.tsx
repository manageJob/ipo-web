import { httpClient } from "./http-client";


const GetHello = (id: number) => {
    return httpClient
        .get(`/getUser/${id}`)
        .then((res: any) => {
            if (res.status === 200) {
                return res;
            }
        })
};

export default GetHello;