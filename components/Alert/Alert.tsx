import { useState } from "react";

interface AlertProps {
	message: string;
	isSuccessful: boolean;
	onClose: () => void;
}

export default function Alert({ isSuccessful, message, onClose }: AlertProps) {
	const [visible, setVisible] = useState(true);
	const handleClose = () => {
		setVisible(false);
		onClose();
	};

	return (
		<>
			{visible && (
				<div
					className="font-regular relative block w-full max-w-screen-md rounded-lg px-4 py-4 text-base text-white"
					style={{
						backgroundColor: `${
							isSuccessful ? "#08a045" : "#da2c38"
						}`,
					}}
					data-dismissible="alert"
				>
					<div className="absolute top-4 left-4">
						{isSuccessful ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								className="mt-px h-6 w-6"
							>
								<path
									fillRule="evenodd"
									d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
									clipRule="evenodd"
								></path>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								className="mt-px h-6 w-6"
							>
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM12 7a1 1 0 00-1 1v5a1 1 0 002 0V8a1 1 0 00-1-1zm0 8a1 1 0 100 2 1 1 0 000-2z"
									clipRule="evenodd"
								/>
							</svg>
						)}
					</div>
					<div className="ml-8 mr-12">
						<h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">
							{isSuccessful ? "¡Éxito!" : "¡Algo salió mal!"}
						</h5>
						<p className="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">
							{message}
						</p>
					</div>
					<div
						data-dismissible-target="alert"
						data-ripple-dark="true"
						className="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
					>
						<div
							role="button"
							className="w-max rounded-lg p-1"
							onClick={handleClose}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								></path>
							</svg>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
