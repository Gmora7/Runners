"use client";
import logo from "@/public/ccdr-logo.png";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useAuth } from "@/app/AuthContext";

const Navbar = () => {
	const { isLoggedIn, userRole } = useAuth();
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles["navbar-flex"]}>
					<div className={styles.logo}>
						<img
							src={logo.src}
							alt="CCDR"
							className={styles["logo-img"]}
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
							<Link href="/calendario">Calendario</Link>
						</li>
						<li>
							<Link href="#">Atletas</Link>
						</li>
						<li>
							<Link href="#">Inscripciones</Link>
						</li>
						{isLoggedIn && userRole === "admin" ? ( // Mostrar el botón de inicio de sesión solo si el usuario no ha iniciado sesión
							<li>
								<Link href="/menu-administrador">Menu</Link>
							</li>
						) : isLoggedIn && userRole === "user" ? (
							<li>
								<Link href="/menu-atleta">Menu</Link>
							</li>
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
