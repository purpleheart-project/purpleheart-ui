import create from "zustand";

interface Http {
  httpPanes: any;
  setHttpPanes: (a: any) => void;
  httpActiveKey: any;
  setHttpActiveKey: (a: any) => void;
}
export const useHttpStore = create<Http>(
  (set, get) => ({
    httpPanes: [],
    httpActiveKey: "1",
    setHttpPanes: (httpPanes: any) => {
      return set(() => ({ httpPanes }));
    },
    setHttpActiveKey: (httpActiveKey: any) => {
      console.log(httpActiveKey);
      return set(() => ({ httpActiveKey }));
    },
      collections:[],
      setCollectionActiveKey: "1"
  }),
);
