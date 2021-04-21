export interface LoginRes {
  data: {
    scuuess: boolean;
    visitData: {
      age: number;
      permissions: string[];
    };
  };
  errmsg: string;
  code: string;
}
