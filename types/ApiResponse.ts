export type Error = {
  message: string;
  code?: number;
};

export type ApiResponse<T> = {
  data?: T;
  error?: Error;
};
