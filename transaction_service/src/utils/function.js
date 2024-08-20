export function responseSuccess(res, message, data) {
  res.status(200).json({
    message,
    data,
  });
}
