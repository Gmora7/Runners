import styles from "./Header.module.css";

interface HeaderProps {
	title: string;
}

const Header = ({ title }: HeaderProps) => {
	return (
		<header className={styles["site-header"]}>
			<h1 className={styles["site-title"]}>{title}</h1>
		</header>
	);
};

export default Header;
