export type Overwrite<T, NewT> = Omit<T, keyof NewT> & NewT;
