import { httpClient } from "../../api/http-client";



const Authenticate = (data: any) => {
    return httpClient
        .post(`/authenticate`, data)
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

export default Authenticate;