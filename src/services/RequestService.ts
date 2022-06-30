import requset from "../utils/request";
export class RequestService {
  static async retrieveARequest({ id }: any): Promise<any> {
    return requset.get(`http://127.0.0.1:8080/request`,{params:{id:id}});
  }
}
