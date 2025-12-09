import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultPicture from '../../assets/images/defaultPicture.svg';
import { useAuthStore } from '../../store';

const SidebarLayout = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  let menuList;
  if (user?.role === 'Librarian') {
    menuList = [
      { name: 'Overview', path: 'dashboard' },
      { name: 'Users', path: 'users' },
      { name: 'Books', path: 'books' }
    ];
  } else {
    menuList = [
      { name: 'Overview', path: 'dashboard' },
      { name: 'Books', path: 'books' }
    ];
  }

  const logOut = async () => {
    try {
      setLoading(true);
      logout();
      navigate('/', {
        replace: true
      });
    } catch (error) {
      toast(error?.response?.data?.message || 'Something went wrong', {
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside className="fixed top-0 bottom-0 left-0 flex flex-col overflow-y-auto transition-transform duration-150 ease-in transform -translate-x-full bg-fixed sidebar w-80 md:shadow md:translate-x-0 bg-side-background">
      <div className="flex items-center justify-center py-4 mt-5 sidebar-header">
        <div>
          <img src={DefaultPicture} alt="profile" className="w-12 h-12 rounded-full" />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl text-white font-apercuBold">{user?.userName}</h1>
          <p className="text-white">
            <span className="font-apercuRegular">Admin</span>
          </p>
        </div>
      </div>
      <div className="flex-grow py-6 sidebar-content">
        <ul className="flex flex-col w-full">
          {menuList.map((item) => (
            <li key={item.name} className="my-px mt-5">
              <Link
                to={`/${item.path}`}
                className="flex flex-row items-center justify-start h-10 px-3 pl-8 text-gray-300 hover:bg-gray-100 hover:text-white"
                style={{
                  backgroundColor: window.location.pathname.includes(`/${item.path}`)
                    ? '#8DE8FD'
                    : '#454545',
                  color: window.location.pathname.includes(`/${item.path}`) ? 'black' : '#A4A6B3'
                }}>
                <span className="flex items-center justify-center text-lg text-gray-400"></span>
                <span className="text-center font-apercuMedium">{item.name} </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-shrink-0 mx-8 mb-10">
        <button
          type="button"
          onClick={logOut}
          className="flex flex-row items-center w-full justify-center h-13 pt-10 pb-3  text-gray-300 border-t border-t-[#A4A6B3]  hover:bg-gray-100 hover:text-white"
          style={{
            backgroundColor: '#454545',
            color: '#fff'
          }}
          disabled={loading}>
          <span className="text-lg text-center font-apercuMedium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarLayout;
