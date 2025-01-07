export type Overwrite<T, NewT> = Omit<T, keyof NewT> & NewT;

export function omit(key: string, obj: Record<string, unknown>) {
  const { [key]: omit, ...newObj } = obj;
  return newObj;
}
