import styles from "./Map.module.css";
interface MapProps {
	src: string;
}

const Map = ({ src }: MapProps) => {
	return (
		<div className={styles.map}>
			<iframe
				src={src}
				className="h-80 w-full border-0 rounded-lg shadow-lg"
				loading="lazy"
			></iframe>
		</div>
	);
};

export default Map;
