module.exports = (message = 'NOT FOUND') => (httpStatus) => {
  const error = new Error(message)

  return {
    ...error,
    message,
    status: httpStatus,
    statusCode: httpStatus,
  }
}
