import requset from "../utils/request";
export class CollectionService {
  static async directorytree({ id }: any): Promise<any> {
    return requset.get(`http://127.0.0.1:8080/directorytree`);
  }
}
