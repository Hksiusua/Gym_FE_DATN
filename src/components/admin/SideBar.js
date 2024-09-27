// import React from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// import "./SideBar.scss";
// import "./Admin.scss";
// const SideBar = () => {
//   const [collapsed, setCollapsed] = React.useState(false);

//   return (
//     <div
//       className="admin-sidebar"
//       style={{ display: "flex", height: "100vh", minHeight: "400px" }}
//     >
//       <Sidebar collapsed={collapsed} className="sideBar-content">
//         <Menu>
//           <MenuItem>
//             <Link to="/admins" className="nav-link">
//               DashBoard
//             </Link>
//           </MenuItem>

//           <MenuItem>
//             <Link to="/admins/manage-users" className="nav-link">
//               Manager
//             </Link>
//           </MenuItem>
//         </Menu>
//       </Sidebar>
//       <main className="button-content">
//         <div>
//           <button
//             className="sb-button"
//             onClick={() => setCollapsed(!collapsed)}
//           >
//             (=)
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SideBar;

import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./SideBar.scss";
import "./Admin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div
      className="admin-sidebar"
      style={{ display: "flex", height: "100vh", minHeight: "400px" }}
    >
      <Sidebar collapsed={collapsed} className="sideBar-content">
        <Menu>
          <MenuItem>
            <Link to="/admins" className="nav-link">
              DashBoard
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admins/manage-users" className="nav-link">
              Manager
            </Link>
          </MenuItem>
        </Menu>
      </Sidebar>
      <main className="button-content">
        <div>
          <button
            className="sb-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              className="fa-solid fa-circle-chevron-left"
            />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SideBar;
