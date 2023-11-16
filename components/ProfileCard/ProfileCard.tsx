import Image from "next/image";

interface ProfileCardProps {
	src: string;
	name: string;
	occupation: string;
	phoneNumber: string;
}

const ProfileCard = ({
	src,
	name,
	occupation,
	phoneNumber,
}: ProfileCardProps) => {
	return (
		<div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-4 sm:w-80 md:w-96 items-center ">
			<div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
				<Image
					src={src}
					alt="profile-picture"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-6 text-center">
				<h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
					{name}
				</h4>
				<p className="block bg-gradient-to-tr from-green-600 to-green-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
					{occupation}
				</p>
				<p className="block bg-gradient-to-tr from-green-600 to-green-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
					{`Teléfono: ${phoneNumber}`}
				</p>
			</div>
		</div>
	);
};
export default ProfileCard;
