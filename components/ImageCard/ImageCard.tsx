interface ImageCardProps {
	src: string;
	alt: string;
	title?: string;
	description?: string;
}
const ImageCard = ({ src, alt, title, description }: ImageCardProps) => {
	return (
		<>
			<img className="w-full" src={src} alt={alt} />
			{title && description && (
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">{title}</div>
					<p className="text-gray-700 text-base">{description}</p>
				</div>
			)}
		</>
	);
};

export default ImageCard;
