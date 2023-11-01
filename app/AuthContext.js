"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function UseAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userRole, setUserRole] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		const expirationTime = localStorage.getItem("expirationTime");
		const role = localStorage.getItem("userRole");
		//console.log(role);

		if (token && expirationTime) {
			const currentTime = new Date().getTime();
			if (currentTime < parseInt(expirationTime)) {
				// El token aún no ha caducado
				setIsLoggedIn(true);
				setUserRole(role);
			} else {
				// El token ha caducado, borra el token y la fecha de vencimiento
				localStorage.removeItem("token");
				localStorage.removeItem("expirationTime");
				localStorage.removeItem("userRole");
				localStorage.removeItem("identification");
			}
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole }}
		>
			{children}
		</AuthContext.Provider>
	);
}
