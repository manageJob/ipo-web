import { httpClient } from "../../api/http-client";
import { News } from "../news.model";


const AddNews = (data: News) => {
    return new Promise((resolve, reject) => {
        httpClient
            .post(`/news`, data)
            .then(res => {
                if (res.status === 200) {
                    return resolve(res);
                }
            })
            .catch((err) => reject(err.response));
    })
};

export default AddNews;