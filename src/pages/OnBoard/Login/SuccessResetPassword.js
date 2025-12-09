import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle } from 'react-icons/ai';
import AppBackground from '../../../components/layouts/AppBackground';

export const SuccessResetPassword = () => {
  return (
    <Fragment>
      <div className="grid min-h-screen grid-cols-2">
        <AppBackground />
        <div className="flex items-center justify-center min-h-full col-span-1 px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-12 space-y-8 shadow-xl rounded-xl">
            <div className="flex flex-col items-center justify-center">
              <AiFillCheckCircle className="mb-2 text-green-500 text-8xl" />
              <p className="text-2xl text-center font-apercuBold">
                Your password has been successfully changed!
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-sm">
                <Link to="/" className="text-center font-apercuMedium text-blue">
                  Try to log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
