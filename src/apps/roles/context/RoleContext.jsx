import { createContext, useContext } from "react";
import { useFetchRoles } from "../hooks/useFetchRoles";


const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const role = useFetchRoles();

  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
};

export const useRoleContext = () => useContext(RoleContext);
