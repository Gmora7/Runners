// "use client";
// import { useAuth } from "./AuthContext";

// export function isAuthenticated(requiredRole) {
//   const { isLoggedIn, userRole } = useAuth();

//   if (!isLoggedIn) {
//     return false;
//   }

//   // Si no se requiere un rol específico, cualquier usuario autenticado tiene acceso.
//   if (!requiredRole) {
//     return true;
//   }

//   return userRole === requiredRole;
// }
