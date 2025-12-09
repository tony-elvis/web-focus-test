import { useEffect, useState } from 'react';
import { DataType, PagingPosition, SortingMode, FilteringMode } from 'ka-table/enums';
import { axiosInstance } from '../utils/axiosInstance';
import { useUserStore } from '../store';
import moment from 'moment';
import { kaReducer } from 'ka-table';
import { toast } from 'react-toastify';
import { kaPropsUtils } from 'ka-table/utils';

export const SEARCH_DATA = 'SEARCH_DATA';
export const UNSELECT_ALL = 'UNSELECT_ALL';

export const customAction = (text) => {
  return {
    type: SEARCH_DATA,
    payload: text
  };
};

export const unSelectAll = () => {
  return {
    type: UNSELECT_ALL
  };
};

export const useUser = () => {
  const { setUser, user, removeUser } = useUserStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [idsSelected, setIdsSelected] = useState([]);
  const selectOptions = [
    { value: 'disable', label: 'Disable' },
    { value: 'enable', label: 'Enable' },
    { value: 'delete', label: 'Delete' }
  ];
  const getUsers = () => {
    axiosInstance
      .get('users/all')
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        setUser([]);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (user.length > 0) {
      changeTableProps({ ...tableProps, data: user });
    }
  }, [user]);

  const tablePropsInit = {
    columns: [
      { key: '_id', width: 100, style: { textAlign: 'center' } },

      {
        dataType: DataType.String,
        key: 'firstName',
        width: 100,
        title: 'First name',
        style: { textAlign: 'center' }
      },
      {
        dataType: DataType.String,
        key: 'lastName',
        width: 100,
        title: 'last name',
        style: { textAlign: 'center' }
      },
      {
        dataType: DataType.String,
        key: 'email',
        width: 100,
        title: 'Email',
        style: { textAlign: 'center' }
      },
      {
        dataType: DataType.String,
        key: 'role',
        style: { textAlign: 'center' },
        width: 100,
        title: 'Role'
      },

      { key: ':delete', width: 100, style: { textAlign: 'center' }, title: 'Actions' }
    ],
    format: ({ column, value }) => {
      if (column.key === 'percent_off') {
        if (value) {
          return `${value}%`;
        } else {
          return 'N/A';
        }
      }
      if (column.key === 'amount_off') {
        if (value) {
          return `$${value}`;
        } else {
          return 'N/A';
        }
      }
      if (column.dataType === DataType.Date) {
        return value ? `${moment(value).format('MMMM D, YYYY')}` : 'No Expiration Date';
      }
      if (column.key === 'isActive') {
        return value.toString() == 'true' ? 'Active' : 'Expired';
      }
    },
    rowKeyField: 'errandCouponId',
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      pageSizes: [5, 10, 15],
      position: PagingPosition.TopAndBottom
    },
    filteringMode: FilteringMode.HeaderFilter,
    selectedRows: [],
    sortingMode: SortingMode.Single,
    search: ({ searchText, rowData, column }) => {
      if (column.key === 'passed') {
        return (
          (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed)
        );
      }
    }
  };

  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const onDispatch = (action) => {
    switch (action.type) {
      case SEARCH_DATA:
        user.every(() => {
          const payload = action.payload ? action.payload.toLowerCase() : null;
          if (payload) {
            changeTableProps({
              ...tableProps,
              data: user.filter(
                (item) =>
                  item.firstName.toLowerCase().includes(payload) ||
                  item.lastName.toLowerCase().includes(payload)
              )
            });
            return false;
          } else {
            changeTableProps({
              ...tableProps,
              data: user
            });
            return true;
          }
        });
        break;
      case UNSELECT_ALL:
        tableProps.selectedRows = [];
        changeTableProps(tableProps);
        break;
      default:
        changeTableProps((prevState) => kaReducer(prevState, action));
    }
  };

  const onDelete = (ids) => {
    axiosInstance
      .delete(`users/delete/${ids[0]}`)
      .then((res) => {
        toast(res.data.message, {
          type: 'success'
        });
        removeUser(ids);
        setModalIsOpen(false);
        onDispatch(unSelectAll());
        setIdsSelected([]);
      })
      .catch((error) => {
        toast(error?.response?.data?.message ?? 'Something went wrong', {
          type: 'error'
        });
      });
  };

  const disableOrEnable = (ids, isActive) => {
    axiosInstance
      .put('coupon/update-status', { ids, isActive })
      .then((res) => {
        toast(res.data.message, {
          type: 'success'
        });
        setModalIsOpen(false);
        setIdsSelected([]);
        onDispatch(unSelectAll());
      })
      .catch((error) => {
        toast(error?.response?.data?.message ?? 'Something went wrong', {
          type: 'error'
        });
      });
  };

  useEffect(() => {
    if (multipleSelection) {
      const ids = kaPropsUtils.getSelectedData(tableProps).reduce((acc, curr) => {
        acc.push(curr.errandCouponId);
        return acc;
      }, []);
      setIdsSelected(ids);
      setMultipleSelection(false);
    }
  }, [multipleSelection]);

  return {
    state: {
      tableProps,
      modalIsOpen,
      multipleSelection,
      idsSelected,
      selectOptions
    },
    actions: {
      changeTableProps,
      setModalIsOpen,
      setMultipleSelection,
      setIdsSelected,
      onDelete,
      disableOrEnable,
      onDispatch
    }
  };
};
