import React, { useState, useCallback,useRef,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaVideo, FaToolbox, FaUsers } from "react-icons/fa";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";

import { logout } from "../../../store/actions/authActions";

import "./AdminView.css"; // Asegúrate de que la ruta de importación sea la correcta
import Videos from "./Videos/Videos";
import ManualvideoAccess from "./ManualvideoAccess/ManualvideoAccess"; // Importa el componente ManualvideoAccess
import UserManagement from "./UserManagement/UserManagement";

const AdminView = () => {
  const [currentView, setCurrentView] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  
  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);



  const renderContent = () => {
    switch (currentView) {
      case "profile":
        return (
          <>
            <div className="user-info">
              <h2>Vista de Administrador</h2>
              <p>
                <span>Nombre Completo:</span> {user.fullName}
              </p>
              <p>
                <span>Email:</span> {user.email}
              </p>
              <p>
                <span>ID de Usuario:</span> {user.userId}
              </p>
              <p>
                <span>Usuario Activo:</span> {String(user.userIsActive)}
              </p>
              <p>
                <span>Admin Activo:</span> {String(user.adminIsActive)}
              </p>
              {/* <p>
                <span>Token JWT:</span> {user.jwtToken}
              </p> */}
              {user.errorMessage && (
                <p>
                  <span>Error:</span> {user.errorMessage}
                </p>
              )}
            </div>
          </>
        );
      case "videos":
        return (
          <>
            <Videos />
          </>
        );
      case "manualVideoAccess":
        return (
          <>
            <ManualvideoAccess />
          </>
        );

      case "userManagement": // Caso para UserManagement
        return (
          <>
            <UserManagement />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      
      <div
        className="sidebar" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
       
        <div className="sidebar-icon" onClick={() => setCurrentView("videos")}>
          <FaVideo className="icons" />
          <span className="sidebar-text">Videos</span>
        </div>
        <div
          className="sidebar-icon"
          onClick={() => setCurrentView("manualVideoAccess")}
        >
          <FaToolbox className="icons" />
          <span className="sidebar-text">Acceso Manual a Videos</span>
        </div>
        <div
          className="sidebar-icon"
          onClick={() => setCurrentView("userManagement")}
        >
          <FaUsers className="icons"/>
          <span className="sidebar-text">Gestión de Usuarios</span>
        </div>

        <div 
        
          className="sidebar-icon" onClick={toggleMenu}
          
         
        >
          
          <FaUser  />
          
        <span  className="sidebar-text pro">
        {user.fullName}
            
      </span>
     
        </div>

        {menuOpen && (
      <ul  className={`submenu ${menuOpen ? 'active' : ''}`} >

<li className=" submenu-item last-profile "style={{ alignItems:"flex-start"}} >  {user ? `Bienvenido, ${user.fullName}` : "Cargando..."} <FaUser size={20} style={{marginLeft:'15px', color: 'orange'}}/></li>

      <li  onClick={() => setCurrentView("profile")}  className=" submenu-item"> Ir a perfil</li>

      <li onClick={handleLogout} className=" submenu-item last" style={{display:"flex", alignItems:"flex-start"}}>  Cerrar sesión  <FaPersonWalkingDashedLineArrowRight size={20} style={{marginLeft:'15px'}}/></li>


          </ul>
        )}
      </div>

      
      <div className={isExpanded ? "content-area-expanded" : "content-area"}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminView;
