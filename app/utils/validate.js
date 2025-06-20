export const handleValidation = (data, schema, res) => {
  const { error, value } = schema.validate(data);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    throw new Error(error.details[0].message); // stop execution
  }
  return value;
};
