export const extractAddress = (data: any, keys: string[]) => {
  const obj: Record<string, string> = {};
  keys.forEach((key) => {
    data.forEach((x: any) => {
      x.types.includes(key) && Object.assign(obj, { [key]: x.long_name });
    });
  });
  return obj;
};