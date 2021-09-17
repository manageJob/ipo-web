import { httpClient } from "../../api/http-client";
import { News } from "../news.model";

const UpdateNews = (id: string, data: News) => {
    return new Promise((resolve, reject) => {
        httpClient
            .put(`/news/${id}`, data)
            .then((res: any) => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err: any) => reject(err.response));
    });
};

export default UpdateNews;