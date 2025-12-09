import React from 'react';

import SidebarLayout from '../../../components/layouts/SidebarMenu';

const HomePanel = () => {
  return (
    <>
      <SidebarLayout />
      <div className="flex flex-row min-h-screen ml-64 text-gray-800 bg-white-100 md:ml-80">
        <SidebarLayout />
        <main className="flex flex-col flex-grow w-full mt-10 -ml-64 transition-all duration-150 ease-in main md:ml-0">
          <h1 className="text-3xl text-center font-apercuBold ">Welcome to the home panel</h1>
        </main>
      </div>
    </>
  );
};

export default HomePanel;
