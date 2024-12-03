const format = (error: any) => {
  return error.response.data.message;
};

const errors = { format };

export default errors;
