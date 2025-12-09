import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import TextInput from '../../../components/TextInput';
import { AiFillEye } from 'react-icons/ai';
import { axiosInstance } from '../../../utils/axiosInstance';
import capitalizeFirstLetter from '../../../utils/capitalizeFL';
import AppBackground from '../../../components/layouts/AppBackground';

import { useAuthStore } from '../../../store/useAuthStore';

const LoginPage = () => {
  const location = useLocation();
  const { setUser } = useAuthStore();

  let navigate = useNavigate();

  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).required()
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmitHandler = (data) => {
    if (isLoading) return;
    setIsloading(true);
    console.log('Enviando petición de login:', data);
    console.log('URL Base:', import.meta.env.VITE_BACKEND_URL);
    axiosInstance
      .post('/users/log-in', data)
      .then((response) => {
        console.log('Respuesta del servidor:', response);
        setUser(
          response?.data?.token?.accessToken?.data,
          response?.data?.token?.authorizationToken
        );
        localStorage.setItem('token', response?.data?.token?.authorizationToken);

        navigate(`dashboard`);
        setIsloading(false);
      })
      .catch((error) => {
        console.error('Error en login:', error);
        if (error.response?.data?.details) {
          setError(error.response.data.details[0].message);
        } else if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError(error.message || 'Error de conexión con el servidor');
        }
        setIsloading(false);
      });

    setValue('email', '');
    setValue('password', '');
  };

  return (
    <Fragment>
      <div className="grid min-h-screen grid-cols-2">
        <AppBackground />
        <div className="flex items-center justify-center min-h-full col-span-2 px-4 py-12 sm:col-span-1 sm:px-6 lg:px-8">
          <div className="w-full p-12 space-y-8 shadow-xl sm:max-w-md rounded-xl">
            <div>
              <h2 className="mt-6 text-3xl text-center text-label-secondary font-apercuBold">
                Log in
              </h2>
              {error && (
                <p className="text-center normal-case text-text-red">
                  {capitalizeFirstLetter(error)}
                </p>
              )}
              {location.state?.changed && (
                <p className="text-center text-green-500 normal-case">
                  {'Your password has been changed successfully'}
                </p>
              )}
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
              <div>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      onTextChange={onChange}
                      value={value}
                      name="email"
                      placeholder="Type your email"
                      label="Your email"
                      error={errors.email?.message}
                    />
                  )}
                  name="email"
                />

                <div className="mt-2">
                  <Controller
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        onTextChange={onChange}
                        name="password"
                        placeholder="Type your password"
                        label="Password"
                        secure={true}
                        value={value}
                        error={errors.password?.message}
                        rightIcon={<AiFillEye className="w-6 h-6" />}
                      />
                    )}
                    name="password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm text-black border border-transparent rounded-md font-apercuMedium group bg-errand-primary hover:bg-errand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-errand-primary">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  {isLoading ? 'Sign in into your account...' : 'Log In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
