export type JsonRequestInit = RequestInit & {
  isMultipart?: boolean;
};

export type AbortableFn = () => void;
