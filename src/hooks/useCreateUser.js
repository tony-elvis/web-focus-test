import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usersSchema } from '../schemas';
import { useUserStore } from '../store';
import { axiosInstance } from '../utils/axiosInstance';
import { useEffect } from 'react';

export const useCreateUser = () => {
  const { addUser, updateUser } = useUserStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(usersSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    }
  });

  const active_custom = useWatch({
    control,
    name: 'role'
  });

  const getUsersById = () => {
    axiosInstance
      .get(`/users/byId/${id}`)
      .then((res) => {
        const { data } = res.data;
        setValue('firstName', data?.firstName ?? '');
        setValue('lastName', data?.lastName ?? '');
        setValue('email', data?.email ?? '');
        setValue('password', '');
        setValue('role', data?.role ?? '');
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
        res = await axiosInstance.put(`users/update/${id}`, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: data.role.value
        });
      } else {
        res = await axiosInstance.post('users/create', {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: data.role.value
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
      navigate('/users');
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
