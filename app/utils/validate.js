export const handleValidation = (data, schema) => {
  const { error, value } = schema.validate(data);
  if (error) {
    const message = error.details[0].message;
    const err = new Error(message);
    err.status = 400; // Optional: use for custom error codes
    throw err; // Let asyncHandler or middleware handle it
  }
  return value;
};
