import styles from "./Container.module.css";

export default function CardContainer({
	children,
	width = "80%",
	display = "flex",
	justifyContent,
}: {
	children: React.ReactNode;
	width?: string;
	display?: string;
	justifyContent?: string;
}) {
	return (
		<div
			className={styles.container}
			style={{ width, display, justifyContent }}
		>
			{children}
		</div>
	);
}
