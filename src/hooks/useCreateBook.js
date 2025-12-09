import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bookSchema } from '../schemas';
import { useBookStore } from '../store';
import { axiosInstance } from '../utils/axiosInstance';
import { useEffect } from 'react';
import moment from 'moment';

export const useCreateBook = () => {
  const { addUser, updateUser } = useBookStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      published: '',
      status: ''
    }
  });

  const active_custom = useWatch({
    control,
    name: 'role'
  });

  const getUsersById = () => {
    axiosInstance
      .get(`/books/byId/${id}`)
      .then((res) => {
        const { data } = res.data;
        setValue('title', data?.title ?? 'fff');
        setValue('author', data?.author ?? '');
        setValue('genre', data?.genre ?? '');
        setValue('published', new Date(data?.published) ?? '');
        setValue('status', data?.status ?? '');
      })
      .catch((error) => {
        toast(error?.response?.data?.message ?? 'Something went wrong', {
          type: 'error'
        });
      });
  };

  useEffect(() => {
    if (id) {
      getUsersById();
    }
  }, []);

  const onSubmitHandler = async (data) => {
    try {
      let res;
      if (id) {
        res = await axiosInstance.put(`books/book/update/${id}`, {
          title: data.title,
          author: data.author,
          genre: data.genre.value,
          published: moment(data.published),
          status: data.status.value
        });
      } else {
        res = await axiosInstance.post('books/create', {
          title: data.title,
          author: data.author,
          genre: data.genre.value,
          published: moment(data.published),
          status: data.status.value
        });
      }
      if (id) {
        updateUser(res.data.data);
      } else {
        addUser(res.data.data);
      }
      toast(res.data.message, {
        type: 'success'
      });
      navigate('/books');
    } catch (error) {
      toast(error?.response?.data?.message ?? 'Something went wrong', {
        type: 'error'
      });
    }
  };
  return {
    control,
    errors,
    id,
    active_custom,
    onSubmitHandler,
    handleSubmit
  };
};
