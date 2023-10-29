import styles from "./CardsContainer.module.css";

interface Props {
	children: React.ReactNode;
}

const CardsContainer = ({ children }: Props) => {
	return <div className={styles.cards}>{children}</div>;
};

export default CardsContainer;
