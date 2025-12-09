import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import ReactInputVerificationCode from 'react-input-verification-code';
import TextInput from '../../../components/TextInput';
import { axiosInstance } from '../../../utils/axiosInstance';
import capitalizeFirstLetter from '../../../utils/capitalizeFL';
import { passwordMatchPatternError } from '../../../utils/validatePassword';
import AppBackground from '../../../components/layouts/AppBackground';

const ResetPasswordPage = () => {
  let navigate = useNavigate();

  const [codeIsSent, setCodeIsSent] = useState(false);
  const [code, setCode] = useState('');
  const [validateCode, setValidateCode] = useState('');
  const [codeEmpty, setCodeEmpty] = useState(false);
  const [wrongCode, setWrontCode] = useState(false);
  const [validCode, setValidCode] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const schema = yup.object().shape({
    email: yup.string().email('Enter a valid email address').required()
  });
  const schemaPassword = yup.object().shape({
    password: yup.string().min(8, passwordMatchPatternError).required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(!validCode ? schema : schemaPassword)
  });

  const onSubmitHandler = (data) => {
    axiosInstance
      .post(`auth/password/forgot`, data)
      .then((response) => {
        if (response.data.status === 'success') {
          setCodeIsSent(true);
        }
      })
      .catch((error) => {
        if (error.response.data.details) {
          setInvalidEmail(error.response.data.details[0].message);
        } else {
          setInvalidEmail(error.response.data.message);
        }
      });
  };

  const verifyCode = () => {
    if (!code) {
      return setCodeEmpty(true);
    } else {
      setCodeEmpty(false);
    }
    const email = getValues('email');

    axiosInstance
      .post(`auth/password/verify-code`, {
        email,
        code: code
      })
      .then((response) => {
        setValidCode(true);
        setValidateCode(response?.data?.data);
      })
      .catch((error) => {
        if (error.response.data.details) {
          setWrontCode(error.response.data.details[0].message);
        } else {
          setWrontCode(error.response.data.message);
        }
      });
  };

  const onChangePassword = (data) => {
    const email = getValues('email');

    axiosInstance
      .post(`auth/password/reset`, {
        email,
        code: validateCode.toString(),
        password: data.password,
        confirmPassword: data.confirmPassword
      })
      .then(() => {
        navigate(`/success-password`);
      })
      .catch((error) => {
        if (error.response.data.details) {
          setPasswordError(error.response.data.details[0].message);
        } else {
          setPasswordError(error.response.data.message);
        }
      });
  };

  return (
    <Fragment>
      <div className="grid min-h-screen grid-cols-2">
        <AppBackground />
        <div className="flex items-center justify-center min-h-full col-span-2 px-4 py-12 sm:col-span-1 sm:px-6 lg:px-8">
          <div className="w-full p-12 space-y-8 shadow-xl sm:max-w-md rounded-xl">
            {!codeIsSent && !validCode ? (
              <Fragment>
                <div>
                  <h2 className="mt-6 text-3xl text-center font-apercuBold text-label-secondary">
                    Reset password
                  </h2>
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
                          placeholder="Write your email"
                          label="Your email"
                          borderError
                          rightIcon={
                            errors.email && (
                              <AiFillExclamationCircle className="w-6 h-6 text-red-600" />
                            )
                          }
                          error={errors.email?.message}
                          containerStyle={{ marginBottom: 0 }}
                        />
                      )}
                      name="email"
                    />
                    {invalidEmail && (
                      <p className="mt-2 normal-case text-text-red">
                        {capitalizeFirstLetter(invalidEmail)}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="relative flex justify-center w-full px-4 py-2 text-sm text-black border border-transparent rounded-md font-apercuMedium group bg-errand-primary hover:bg-errand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-errand-primary">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                      Continue
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-sm">
                      <Link to="/" className="text-center font-apercuMedium text-blue">
                        Try to log in
                      </Link>
                    </div>
                  </div>
                </form>
              </Fragment>
            ) : (
              codeIsSent &&
              !validCode && (
                <div className="flex flex-col items-center w-full">
                  <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-label-secondary">
                      Code verification
                    </h2>
                  </div>

                  <div className="mt-8">
                    <ReactInputVerificationCode
                      onChange={(value) => {
                        const v = parseInt(value).toString();

                        if (v.length === 4) {
                          setCode(value);
                          setCodeEmpty(false);
                        }
                      }}
                    />
                    {codeEmpty && (
                      <p className="mt-2 normal-case text-text-red">
                        {'Verification code is required'}
                      </p>
                    )}
                    {wrongCode && (
                      <p className="mt-2 normal-case text-text-red">
                        {capitalizeFirstLetter(wrongCode)}
                      </p>
                    )}
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={verifyCode}
                      className="relative flex justify-center px-4 py-2 text-sm text-black border border-transparent rounded-md font-apercuMedium group w-96 bg-errand-primary hover:bg-errand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-errand-primary">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                      Verify
                    </button>
                  </div>
                </div>
              )
            )}

            {validCode && (
              <Fragment>
                <div>
                  <h2 className="mt-6 text-3xl font-extrabold text-center text-label-secondary">
                    Reset password
                  </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onChangePassword)}>
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
                          secure={true}
                          placeholder="Write your new password"
                          label="Password"
                          error={errors.password?.message}
                        />
                      )}
                      name="password"
                    />
                  </div>

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
                          secure={true}
                          placeholder="Confirm your new password"
                          label="Confirm password"
                          error={errors.confirmPassword?.message}
                          containerStyle={{ marginBottom: 0 }}
                        />
                      )}
                      name="confirmPassword"
                    />
                    {passwordError !== '' && (
                      <p className="mt-2 normal-case text-text-red">
                        {capitalizeFirstLetter(passwordError)}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="relative flex justify-center w-full px-4 py-2 text-sm text-black border border-transparent rounded-md font-apercuMedium group bg-errand-primary hover:bg-errand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-errand-primary">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                      Reset my password
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-sm">
                      <Link to="/" className="text-center font-apercuMedium text-blue">
                        Try to log in
                      </Link>
                    </div>
                  </div>
                </form>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPasswordPage;
