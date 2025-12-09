import * as yup from 'yup';

export const usersSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required()
});

export const bookSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  genre: yup.object().required(),
  published: yup.date().required(),
  status: yup.object().required()
});
