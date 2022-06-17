import requset from "./axios";
export class FileSystemService {
  static async queryWorkspacesByUser({ id }: any): Promise<any> {
    return requset.post(
      `http://127.0.0.1:8090/api/filesystem/queryWorkspacesByUser`,
      { userName: "zt" },
    );
  }
  static async queryWorkspaceById({ id }: any): Promise<any> {
    return requset.post(
      `http://127.0.0.1:8090/api/filesystem/queryWorkspaceById`,
      {
        id: "62ab189bbf79d0746fc74268",
      },
    );
  }
}
