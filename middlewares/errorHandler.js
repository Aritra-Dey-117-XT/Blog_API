export const errorHandler = (err, req, res, next) => {

  console.error("Error: ", err.message, err.details)

  if (Array.isArray(err.details)) {
    return res.status(err.statusCode).json({
      message: "Validation failed",
      errors: err.details
    })
  }

  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  })
}