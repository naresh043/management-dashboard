// import Sidebar from "./Sidebar";
// import Header from "./Headder";
// import { Outlet } from "react-router-dom";

// export default function Layout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex-1">
//         <Header />
//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


import Sidebar from "./Sidebar";
import Header from "./Headder";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden"> 
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} toggle={toggleSidebar} />

      {/* Main Wrapper */}
      <div className="flex flex-1 flex-col h-full">
        
        {/* Header fixed */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

