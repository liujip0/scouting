export function omit(key: string, obj: Record<string, unknown>) {
  const { [key]: omit, ...newObj } = obj;
  return newObj;
}
