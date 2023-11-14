"use client";
import logo from "@/public/ccdr-logo.png";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useAuth } from "@/app/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
const Navbar = () => {
	const { isLoggedIn, setIsLoggedIn, userRole, setUserRole } = useAuth();
	const router = useRouter();
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		localStorage.removeItem("userRole");
		localStorage.removeItem("identification");
		localStorage.removeItem("id");
		setIsLoggedIn(false);
		setUserRole("");
		router.push("/");
	};
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles["navbar-flex"]}>
					<div className={styles.logo}>
						<Image
							src={logo}
							alt="CCDR"
							className={styles["logo-img"]}
							width={200}
							height={100}
							priority
						/>
					</div>
					<ul className={styles["navbar-links"]}>
						<li>
							<Link href="/">Inicio</Link>
						</li>
						<li>
							<Link href="/noticias">Noticias</Link>
						</li>
						<li>
							<Link href="/contactos">Contactos</Link>
						</li>
						<li>
							<Link href="/disciplinas">Disciplinas</Link>
						</li>
						<li>
							<Link href="/calendario">Eventos</Link>
						</li>
						{isLoggedIn && userRole === "admin" ? ( // Mostrar el botón de inicio de sesión solo si el usuario no ha iniciado sesión
							<>
								<li>
									<Link href="/menu-administrador">Menu</Link>
								</li>
								<li>
									<Link href="/" onClick={handleLogout}>
										Logout
									</Link>
								</li>
							</>
						) : isLoggedIn && userRole === "user" ? (
							<>
								<li>
									<Link href="/menu-atleta">Menu</Link>
								</li>
								<li>
									<Link href="/" onClick={handleLogout}>
										Logout
									</Link>
								</li>
							</>
						) : (
							<li>
								<Link href="/login">Iniciar sesión</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
