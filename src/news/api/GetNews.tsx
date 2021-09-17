import { httpClient } from "../../api/http-client";
import { News } from "../news.model";

const GetNews = (id: string) => {
    return new Promise((resolve, reject) => {
        httpClient
            .get<News>(`/news/${id}`)
            .then((res: any) => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err: any) => reject(err.response));
    });
};

export default GetNews;