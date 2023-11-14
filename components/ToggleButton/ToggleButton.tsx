interface ToggleComponentProps {
	onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isChecked: boolean;
}

const ToggleComponent = ({ onToggle, isChecked }: ToggleComponentProps) => {
	return (
		<div>
			<link
				rel="stylesheet"
				href="https://unpkg.com/@themesberg/flowbite@1.1.0/dist/flowbite.min.css"
			/>
			<label
				htmlFor="toggle-example"
				className="flex items-center cursor-pointer relative mb-4"
			>
				<input
					type="checkbox"
					id="toggle-example"
					className="sr-only"
					onChange={onToggle}
					checked={isChecked}
				/>
				<div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
				<span className="ml-3 text-gray-900 text-sm font-medium">
					Recibir notificaciones
				</span>
			</label>
		</div>
	);
};

export default ToggleComponent;
