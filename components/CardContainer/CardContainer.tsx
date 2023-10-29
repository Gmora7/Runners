const CardContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="rounded overflow-hidden shadow-lg m-2 bg-white">
			{children}
		</div>
	);
};

export default CardContainer;
