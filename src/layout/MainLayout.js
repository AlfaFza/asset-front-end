// import Navbar from "../components/common/layout/Navbar";
// import Sidebar from "../components/common/layout/Sidebar";

// function MainLayout({ children }) {
//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//        {/* Sidebar */}
//   <div className="w-64 bg-gray-900 text-white p-5">
//    <Sidebar />
//   </div>

//        {/* Content */}
//   <div className="flex-1">
    
//         {/* Navbar */}
//         <div className="bg-white shadow px-6 py-4">
//         <Navbar />
//         </div>

//         {/* Page */}
//     <div className="p-6">{children}</div>
        
//     </div>

//   </div>

 

    
//   );
// }


import Sidebar from "../components/common/layout/Sidebar"
import Navbar from "../components/common/layout/Navbar";

function MainLayout({ children, role }) {
  return (
    <div className="flex">

      <Sidebar role={role} />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>

    </div>
  );
}

// export default Layout;

export default MainLayout;