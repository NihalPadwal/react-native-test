export type LoginFuncPara = {
  email: string;
  pass: string;
};

export type RegisterFuncPara = {
  email: string;
  pass: string;
  username: string;
  profileUrl: string;
};

export type AuthFunc = Promise<{ success: boolean; data?: any; msg?: string }>;

export type AuthContextType = {
  user: any;
  isAuthenticated: boolean | undefined;
  login: (params: LoginFuncPara) => AuthFunc;
  register: (params: RegisterFuncPara) => AuthFunc;
  logout: () => AuthFunc;
};
