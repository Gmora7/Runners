"use client";
import styles from "./Button.module.css";

interface ButtonProps {
	type?: "button" | "reset" | "submit";
	children: React.ReactNode;
	onClick?: (arg?: any) => void;
	className?: string;
}

const Button = ({ type, children, onClick, className }: ButtonProps) => {
	const buttonClassName = className ? className : styles.button;

	return (
		<button className={buttonClassName} type={type} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
