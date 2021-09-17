import { httpClient } from "../../api/http-client";

const DeleteNews = (id: number[]) => {
    return new Promise((resolve, reject) => {
        httpClient
        .delete(`/news?ids=${id}`)
        .then(res => {
            if (res.status === 200) {
                return resolve(res);
            }
        })
        .catch((err) => reject(err.response));
    });
};

export default DeleteNews;