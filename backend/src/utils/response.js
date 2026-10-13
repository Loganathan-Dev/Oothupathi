export const sendResponse = (res, statusCode, success, message, data = null, error = null) => {
  const response = {
    success,
    message,
  }

  if (data !== null) {
    response.data = data
  }

  if (error !== null && process.env.NODE_ENV === 'development') {
    response.error = error
  }

  return res.status(statusCode).json(response)
}

export const paginateResponse = (data, page, limit, total) => {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  }
}