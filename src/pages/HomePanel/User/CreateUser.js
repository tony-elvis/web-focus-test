import React from 'react';
import { Controller } from 'react-hook-form';
import SidebarLayout from '../../../components/layouts/SidebarMenu';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import { useCreateUser } from '../../../hooks/useCreateUser';

const CreateUser = () => {
  const { control, errors, id, handleSubmit, onSubmitHandler } = useCreateUser();
  return (
    <>
      <SidebarLayout />
      <div className="flex flex-row min-h-screen ml-64 text-gray-800 bg-white-100 md:ml-80">
        <main className="flex flex-col flex-grow w-full overflow-x-auto transition-all duration-150 ease-in main -ml-80 md:ml-0">
          <div className="flex flex-col flex-grow p-4 overflow-x-auto main-content">
            <div className="w-10/12 ml-10 lg:ml-10">
              <div className="flex">
                <h2 className="mt-6 text-3xl text-left text-black font-apercuBold">
                  {id ? 'Edit' : 'Create'} user
                </h2>
              </div>

              <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-x-10">
                  <div className="col-span-1">
                    <Controller
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          onTextChange={onChange}
                          value={value}
                          placeholder="Type first name"
                          label="Fist name"
                          error={errors.firstName?.message}
                        />
                      )}
                      name="firstName"
                    />
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1">
                    <Controller
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          onTextChange={onChange}
                          value={value}
                          placeholder="Type last name"
                          label="Last name"
                          error={errors.lastName?.message}
                        />
                      )}
                      name="lastName"
                    />
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1 ">
                    <Controller
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          onTextChange={onChange}
                          value={value}
                          placeholder="Email"
                          label="Email"
                          error={errors.email?.message}
                        />
                      )}
                      name="email"
                    />
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1">
                    <Controller
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field: { onChange, value } }) => (
                        <SelectInput
                          options={[
                            {
                              value: 'Librarian',
                              label: 'Librarian'
                            },
                            {
                              value: 'Student',
                              label: 'Student'
                            }
                          ]}
                          value={value}
                          label="Role"
                          onChange={onChange}
                          placeholder="Select a role"
                          error={errors.role?.message}
                        />
                      )}
                      name="role"
                    />
                  </div>
                  <div className="col-span-1" />
                  <div className="col-span-1 ">
                    <Controller
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          onTextChange={onChange}
                          value={value}
                          secure
                          placeholder="Password"
                          label="Password"
                          error={errors.password?.message}
                        />
                      )}
                      name="password"
                    />
                  </div>
                  <div className="col-span-1" />
                </div>

                <div>
                  <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm text-black border border-transparent rounded-md md:w-1/2 lg:w-1/6 font-apercuMedium group bg-errand-primary hover:bg-errand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-errand-primary">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                    {id ? 'Edit' : 'Create'} user
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateUser;
