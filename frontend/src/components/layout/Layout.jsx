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
    <div className="flex">
      <Sidebar open={sidebarOpen} toggle={toggleSidebar} />

      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
