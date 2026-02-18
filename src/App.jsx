import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Ui/Sidebar';

const App = () => {
  return (
    <div className="relative flex ">
      <Sidebar/>
      <div className="flex-1 flex flex-col bg-linear-to-b from-black to-[rgb(18,18,18)]">
        {/* TODO: ici la top bar */}
        <div className="h-[calc(100vh-64px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40 text-white">
              <Outlet/>
          </div>
        </div>
      </div>
      {/* TODO: ici le player */}
    </div>
  );
};

export default App