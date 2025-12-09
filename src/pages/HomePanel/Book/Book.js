import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { deselectRow, selectRow, selectRowsRange, updatePageSize } from 'ka-table/actionCreators';
import { useNavigate } from 'react-router-dom';
import { Table } from 'ka-table';
import SidebarLayout from '../../../components/layouts/SidebarMenu';
import TextInput from '../../../components/TextInput';
import '../tables.css';
import { customAction, useBook } from '../../../hooks/useBook';
import { ConfirmModal } from '../../../components/modal/ConfirmModal';
import { useAuthStore } from '../../../store';
const Books = () => {
  let navigate = useNavigate();
  const [type, setType] = useState('this user');
  const [category, setCategory] = useState('delete');
  const {
    state: { tableProps, idsSelected, modalIsOpen },
    actions: {
      setModalIsOpen,
      onDelete,
      setMultipleSelection,
      setIdsSelected,
      disableOrEnable,
      deleteBooked,
      onDispatch
    }
  } = useBook();
  const { user } = useAuthStore();
  console.log(user);
  const PageSizeSelector = ({ pageSize, pageSizes, dispatch }) => (
    <div className="flex flex-row items-center">
      <h3>Items per page:</h3>
      <select
        className="pt-2 pb-2 pl-3 pr-3 ml-5 rounded-md form-control"
        value={pageSize}
        onChange={(event) => {
          dispatch(updatePageSize(Number(event.currentTarget.value)));
        }}>
        {pageSizes?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );

  const onActionChange = (value, rowData) => {
    setType('this user');
    if (value === 'delete' && user.role === 'Librarian') {
      setIdsSelected([rowData._id]);
      setCategory('delete');
      setModalIsOpen(true);
    } else if (value === 'edit' && user.role === 'Librarian') {
      navigate(`edit/${rowData._id}`);
    } else if (value === 'setBook') {
      setIdsSelected([rowData._id]);
      setCategory('setBook');
      setModalIsOpen(true);
    } else if (value === 'setAvailable' && user.role === 'Librarian') {
      setIdsSelected([rowData._id]);
      setCategory('setAvailable');
      setModalIsOpen(true);
    }
  };

  const CustomActionCell = ({ value, rowData }) => (
    <select
      className="px-3 py-1 border rounded-xl form-control"
      value={value}
      onChange={(event) => {
        onActionChange(event.currentTarget.value, rowData);
      }}>
      <option key={1} value={'action'} selected disabled hidden>
        Action
      </option>
      {user.role === 'Librarian' ? (
        <>
          <option key={2} value={'edit'}>
            Edit
          </option>
          <option key={3} value={'delete'}>
            Delete
          </option>
          <option key={5} value={'setAvailable'}>
            Set available
          </option>
        </>
      ) : null}

      <option key={4} value={'setBook'}>
        set book
      </option>
    </select>
  );

  const CustomStatusCell = ({ value }) => {
    return (
      <div
        style={{
          backgroundColor: value.toString() === 'true' ? '#DCFDD4' : '#FDD4D4',
          borderRadius: 10,
          color: value.toString() === 'true' ? '#4FAC16' : '#AC1616'
        }}>
        {value.toString() === 'true' ? 'Active' : 'Expired'}
      </div>
    );
  };

  const SelectionCell = ({ rowKeyValue, dispatch, isSelectedRow, selectedRows, rowData }) => {
    return (
      <div className="flex">
        <input
          type="checkbox"
          checked={isSelectedRow}
          onChange={(event) => {
            if (event.nativeEvent.shiftKey) {
              dispatch(selectRowsRange(rowKeyValue, [...selectedRows].pop()));
              setMultipleSelection(true);
            } else if (event.currentTarget.checked) {
              dispatch(selectRow(rowKeyValue));
              setIdsSelected([...idsSelected, rowKeyValue]);
            } else {
              dispatch(deselectRow(rowKeyValue));
              setIdsSelected(idsSelected.filter((id) => id !== rowKeyValue));
            }
          }}
        />
        <p className="ml-2 font-bold">{rowData?.name}</p>
      </div>
    );
  };

  const SelectionHeader = () => {
    return (
      <div className="flex">
        <p className="ml-2 font-bold">Id</p>
      </div>
    );
  };

  return (
    <>
      <SidebarLayout />
      <div className="flex flex-row min-h-screen ml-64 text-gray-800 bg-white-100 md:ml-80">
        <main className="flex flex-col flex-grow w-full mt-10 -ml-64 overflow-x-auto transition-all duration-150 ease-in main md:ml-0">
          <h2 className="mt-6 ml-4 text-3xl text-left text-black font-apercuBold">Books</h2>
          <div className="flex flex-col flex-grow p-4 overflow-x-auto main-content">
            <div className="lg:flex lg:flex-row gap-x-7">
              <TextInput
                placeholder={'Search'}
                leftIcon={<BsSearch className="w-6 h-6" />}
                inputStyle={{ width: '100%' }}
                containerStyle={{ width: '100%' }}
                onTextChange={(event) => onDispatch(customAction(event))}
              />
              {user.role === 'Librarian' ? (
                <button
                  onClick={() => {
                    navigate(`new`);
                  }}
                  className="flex items-center justify-center h-10 px-10 py-1 mx-auto cursor-pointer shrink-0 bg-errand-primary hover:bg-errand-primary-hover rounded-2xl lg:mt-2">
                  <p className="text-black font-apercuBold">Create Book</p>
                </button>
              ) : null}
            </div>

            <div className="mt-5">
              <Table
                {...tableProps}
                style={{ marginTop: 200 }}
                childComponents={{
                  pagingSizes: {
                    content: (props) => <PageSizeSelector {...props} />
                  },
                  noDataRow: {
                    content: () => 'No Data Found'
                  },
                  cellText: {
                    content: (props) => {
                      switch (props.column.key) {
                        case 'isActive':
                          return <CustomStatusCell {...props} />;
                        case ':delete':
                          return <CustomActionCell {...props} />;
                        case 'errandCouponId':
                          return <SelectionCell {...props} />;
                      }
                    }
                  },
                  filterRowCell: {
                    content: (props) => {
                      if (props.column.key === '_id') {
                        return <></>;
                      }
                    }
                  },
                  headCell: {
                    content: (props) => {
                      if (props.column.key === '_id') {
                        return (
                          <SelectionHeader
                            {...props}
                            // areAllRowsSelected={kaPropsUtils.areAllVisibleRowsSelected(tableProps)}
                          />
                        );
                      }
                    }
                  },
                  headFilterButton: {
                    content: ({ column: { key } }) =>
                      key === ':delete' || key === 'coupon' || (key === '_id' && <></>)
                  }
                }}
                dispatch={onDispatch}
              />
            </div>
          </div>
        </main>
        <ConfirmModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          type={type}
          onAccept={() => {
            if (category === 'delete' && user.role === 'Librarian') {
              onDelete(idsSelected);
            } else if (category === 'disable' && user.role === 'Librarian') {
              disableOrEnable(idsSelected, false);
            } else if (category === 'setBook') {
              disableOrEnable(idsSelected, user.id);
            } else if (category === 'setAvailable' && user.role === 'Librarian') {
              deleteBooked(idsSelected);
            }
          }}
          category={category}
        />
      </div>
    </>
  );
};

export default Books;
