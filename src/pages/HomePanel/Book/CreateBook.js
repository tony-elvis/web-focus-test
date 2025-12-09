import React from 'react';
import { Controller } from 'react-hook-form';
import SidebarLayout from '../../../components/layouts/SidebarMenu';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import { useCreateBook } from '../../../hooks/useCreateBook';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useWatch } from 'react-hook-form';

const CreateBook = () => {
  const { control, errors, id, handleSubmit, onSubmitHandler } = useCreateBook();
  const notExpired = useWatch({
    control,
    name: 'notExpired',
    defaultValue: false
  });
  return (
    <>
      <SidebarLayout />
      <div className="flex flex-row min-h-screen ml-64 text-gray-800 bg-white-100 md:ml-80">
        <main className="flex flex-col flex-grow w-full overflow-x-auto transition-all duration-150 ease-in main -ml-80 md:ml-0">
          <div className="flex flex-col flex-grow p-4 overflow-x-auto main-content">
            <div className="w-10/12 ml-10 lg:ml-10">
              <div className="flex">
                <h2 className="mt-6 text-3xl text-left text-black font-apercuBold">
                  {id ? 'Edit' : 'Create'} Book
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
                          placeholder="Type title"
                          label="Title"
                          error={errors.title?.message}
                        />
                      )}
                      name="title"
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
                          placeholder="Type author"
                          label="Author"
                          error={errors.author?.message}
                        />
                      )}
                      name="author"
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
                              value: 'Thriller',
                              label: 'Thriller'
                            },
                            {
                              value: 'Mystery',
                              label: 'Mystery'
                            }
                          ]}
                          value={value}
                          label="Genre"
                          onChange={onChange}
                          placeholder="Select a Genre"
                          error={errors.genre?.message}
                        />
                      )}
                      name="genre"
                    />
                  </div>
                  <div className="col-span-1" />
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
                              value: 'true',
                              label: 'available'
                            },
                            {
                              value: 'false',
                              label: 'unavailable'
                            }
                          ]}
                          value={value}
                          label="Status"
                          onChange={onChange}
                          placeholder="Select a status"
                          error={errors.status?.message}
                        />
                      )}
                      name="status"
                    />
                  </div>
                  <div className="col-span-1" />
                  <div className="col-span-1">
                    <label className="block mb-2 font-apercuBold text-label-secondary">Published</label>
                    <Controller
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <DatePicker
                            selected={value}
                            onChange={onChange}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="published"
                            showMonthDropdown
                            disabled={notExpired}
                            showYearDropdown
                            minDate={new Date()}
                            dropdownMode="select"
                            wrapperClassName="w-full"
                            className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md text-label-secondary font-apercuRegular focus:outline-none focus:border-errand-primary focus:z-10 sm:text-sm"
                          />
                          {errors?.published?.message && (
                            <p className="mt-1 normal-case text-text-red">
                              {errors?.published?.message}
                            </p>
                          )}
                        </>
                      )}
                      name="published"
                    />
                  </div>
                  <div className="col-span-1" />
                </div>

                <div>
                  <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm text-black border border-transparent rounded-md md:w-1/2 lg:w-1/6 font-apercuMedium group bg-errand-primary hover:bg-errand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-errand-primary">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                    {id ? 'Edit' : 'Create'} Book
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

export default CreateBook;
