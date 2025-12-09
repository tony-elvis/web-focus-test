import { useEffect, useState } from 'react';
import { DataType, PagingPosition, SortingMode, FilteringMode } from 'ka-table/enums';
import { axiosInstance } from '../utils/axiosInstance';
import { useBookStore } from '../store';
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

export const useBook = () => {
  const { setUser, book, removeUser, changeStatus } = useBookStore();
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
      .get('books/all')
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
    if (book.length > 0) {
      changeTableProps({ ...tableProps, data: book });
    }
  }, [book]);

  const tablePropsInit = {
    columns: [
      { key: '_id', width: 100, style: { textAlign: 'center' } },

      {
        dataType: DataType.String,
        key: 'title',
        width: 100,
        title: 'Title',
        style: { textAlign: 'center' }
      },
      {
        dataType: DataType.String,
        key: 'author',
        width: 100,
        title: 'Author',
        style: { textAlign: 'center' }
      },
      {
        dataType: DataType.String,
        key: 'published',
        width: 100,
        title: 'Published',
        style: { textAlign: 'center' }
      },
      {
        dataType: DataType.String,
        key: 'genre',
        style: { textAlign: 'center' },
        width: 100,
        title: 'Genre'
      },
      {
        dataType: DataType.String,
        key: 'status',
        style: { textAlign: 'center' },
        width: 100,
        title: 'status'
      },

      { key: ':delete', width: 100, style: { textAlign: 'center' }, title: 'Actions' }
    ],
    format: ({ column, value }) => {
      if (column.key === 'published') {
        return value ? `${moment(value).format('MMMM D, YYYY')}` : 'No Expiration Date';
      }
      if (column.key === 'status') {
        return value.toString() == 'true' ? 'Booked' : 'Available';
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
        book.every(() => {
          const payload = action.payload ? action.payload.toLowerCase() : null;
          if (payload) {
            changeTableProps({
              ...tableProps,
              data: book.filter(
                (item) =>
                  item.author.toLowerCase().includes(payload) ||
                  item.published.toLowerCase().includes(payload) ||
                  item.genre.toLowerCase().includes(payload) ||
                  item.title.toLowerCase().includes(payload)
              )
            });
            return false;
          } else {
            changeTableProps({
              ...tableProps,
              data: book
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
      .delete(`books/book/delete/${ids[0]}`)
      .then((res) => {
        toast(res.data.message, {
          type: 'success'
        });
        removeUser(ids);
        setModalIsOpen(false);
        onDispatch(unSelectAll());
        setIdsSelected([]);
        getUsers();
      })
      .catch((error) => {
        toast(error?.response?.data?.message ?? 'Something went wrong', {
          type: 'error'
        });
      });
  };

  const setBooked = (ids) => {
    axiosInstance
      .delete(`books/book/delete/${ids[0]}`)
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

  const disableOrEnable = (ids, userId) => {
    axiosInstance
      .post('books/book', { bookId: ids[0], id: userId })
      .then((res) => {
        toast(res.data.message, {
          type: 'success'
        });
        changeStatus(ids, true);
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

  const deleteBooked = (ids) => {
    axiosInstance
      .post('books/delete', { bookId: ids[0] })
      .then((res) => {
        toast(res.data.message, {
          type: 'success'
        });
        changeStatus(ids, false);
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
      onDispatch,
      setBooked,
      deleteBooked
    }
  };
};
