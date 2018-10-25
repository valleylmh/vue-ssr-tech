export const createError = (code, msg) => {
  const err = new Error(msg)
  err.code = code
  err.msg = msg
  return err
}
