import Button from "@/components/Button/Button";

interface AdministratorOptionProps {
	title: string;
	description: string;
	buttonLabel: string;
	onClick: () => void;
}

export default function AdministratorOption({
	title,
	description,
	buttonLabel,
	onClick,
}: AdministratorOptionProps) {
	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="p-4">
				<h2 className="text-lg font-bold text-gray-800">{title}</h2>
				<p className="text-gray-600 mt-2">{description}</p>
			</div>
			<div className="p-4 bg-gray-100">
				<Button onClick={onClick}>{buttonLabel}</Button>
			</div>
		</div>
	);
}
