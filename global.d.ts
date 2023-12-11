export declare global {
  type Recursive<T> = {[P in keyof T]: Recursive<T[P]>};
}
