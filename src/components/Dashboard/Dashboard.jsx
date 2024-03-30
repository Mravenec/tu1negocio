import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import UserView from "./UserView/UserView";
import AdminView from "./AdminView/AdminView";
import DesignerView from "./DesignerView/DesignerView";
import "./Dashboard.css";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState(""); // Inicializar con cadena vacía
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.adminIsActive) setViewMode("admin");
    else if (user?.userIsActive) setViewMode("user");
    else setViewMode("");
  }, [user]);

  const renderView = useCallback(() => {
    if (!user) {
      return <p>Cargando...</p>;
    }

    console.log(user);

    switch (viewMode) {
      case "admin":
        return <AdminView />;
      case "designer":
        return <DesignerView />;
      case "user":
        return <UserView />;
      case "":
        return <p>Selecciona un modo de vista</p>;
      default:
        return <p>Modo de vista no reconocido</p>;
    }
  }, [user, viewMode]);

  return (
  
    <div>
      <div className="header">
      <div className="h1-container">
        <h4>{user ? `Bienvenido, ${user.fullName}` : "Cargando..."}</h4>
      </div>
        {user.adminIsActive && (
          <select
            onChange={(e) => setViewMode(e.target.value)}
            value={viewMode}
            className="view-selector"
          >
            <option value="" disabled>
              Selecciona un modo
            </option>
            <option value="admin">Administrador</option>
            <option value="designer">Diseñador</option>
            {user?.userIsActive && <option value="user">Usuario</option>}
          </select>

        )}
        </div>
      <div className="dashboard-container">
      {renderView()}
      </div>
      

    </div>
  );
};

export default Dashboard;
