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

  // const onExport = () => {
  //   console.log('Start');
    
  //   GetHello(5)
  //       .then((res: any) => {
  //         console.log(res?.data, "-ssss");
  //       })
  //       .catch((err) => {
        
  //       });

  //       console.log('End');
    
  // }

export default GetHello;