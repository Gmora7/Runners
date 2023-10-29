import styles from "./ContainerTitle.module.css";

interface ContainerTitleProps {
	title: string;
	description: string;
}

export default function ContainerTitle({
	title,
	description,
}: ContainerTitleProps) {
	return (
		<div className={styles.mission}>
			<h2>{title}</h2>
			<p>{description}</p>
		</div>
	);
}
