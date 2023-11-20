interface NewsCardProps {
	src: string;
	category: string;
	title: string;
	body: string;
	date: string;
}

export default function NewsCard({
	src,
	category,
	title,
	body,
	date,
}: NewsCardProps) {
	return (
		<div className="relative flex flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-4">
			<div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none shrink-0 rounded-xl bg-clip-border">
				<img
					src={src}
					alt="image"
					className="object-cover w-full h-full"
				/>
			</div>
			<div className="p-6">
				<h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-green-500 uppercase">
					{category}
				</h6>
				<h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
					{title}
				</h4>
				<p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
					{body}
				</p>
				<div className="text-gray-500 text-sm">{date}</div>
			</div>
		</div>
	);
}
