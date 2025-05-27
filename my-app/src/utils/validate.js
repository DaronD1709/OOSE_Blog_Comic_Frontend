export const validate = (values) => {
  if (Array.isArray(values)) {
    return values.length > 0
  }

  return values !== undefined && values !== null;

}
