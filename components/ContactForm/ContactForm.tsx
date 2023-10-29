import { useRef, useState } from "react";
import Alert from "@/components/Alert/Alert";
import Button from "@/components/Button/Button";
export default function ContactForm() {
	const nameRef = useRef<HTMLInputElement>(null);
	const lastnameRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const name = nameRef.current?.value;
		const lastname = lastnameRef.current?.value;
		const phone = phoneRef.current?.value;
		const email = emailRef.current?.value;
		const potentialUserData = {
			name,
			lastname,
			phone,
			email,
		};
		try {
			const response = await fetch("/api/potentialUsers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(potentialUserData),
			});

			if (!response.ok) {
				// const message = await response.json();
				setIsSuccessful(false);
				throw new Error("Error HTTP: " + response.status);
			}
			setIsSuccessful(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAlertClose = () => {
		setIsSuccessful(null);
	};

	return (
		<>
			{isSuccessful != null && (
				<Alert
					message={
						isSuccessful
							? "Gracias por contactarnos."
							: "El usuario o el correo ya existe."
					}
					onClose={handleAlertClose}
					isSuccessful={isSuccessful}
				/>
			)}
			<h1 className="border-b-4 border-green-500 text-3xl m-10">
				Contáctenos
			</h1>
			<form className="m-10" onSubmit={handleSubmit}>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="email"
						name="floating_email"
						id="floating_email"
						className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
						ref={emailRef}
					/>
					<label
						htmlFor="floating_email"
						className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Correo
					</label>
				</div>
				<div className="grid md:grid-cols-2 md:gap-6">
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="floating_first_name"
							id="floating_first_name"
							className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
							ref={nameRef}
						/>
						<label
							htmlFor="floating_first_name"
							className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Nombre
						</label>
					</div>
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="floating_last_name"
							id="floating_last_name"
							className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
							ref={lastnameRef}
						/>
						<label
							htmlFor="floating_last_name"
							className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Apellido
						</label>
					</div>
				</div>
				<div className="grid md:grid-cols-2 md:gap-6">
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="tel"
							pattern="[0-9]{4}-[0-9]{4}"
							name="floating_phone"
							id="floating_phone"
							className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
							ref={phoneRef}
						/>
						<label
							htmlFor="floating_phone"
							className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Teléfono (1234-5678)
						</label>
					</div>
				</div>
				<Button type="submit">Enviar</Button>
			</form>
		</>
	);
}
