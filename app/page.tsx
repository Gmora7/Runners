import Header from "@/components/Header/Header";
import img1 from "@/public/front-page.jpg";
import Container from "@/components/Container/Container";
import Map from "@/components/Map/Map";
import ImageCard from "@/components/ImageCard/ImageCard";
import ContainerTitle from "@/components/ContainerTitle/ContainerTitle";
import CardContainer from "@/components/CardContainer/CardContainer";
import CardsContainer from "@/components/CardsContainer/CardsContainer";
interface CardInfo {
	title: string;
	description: string;
	imageUrl: string;
	alt: string;
	id: number;
}

interface CardsInfo extends Array<CardInfo> {}

const MISSIONCARDSINFO: CardsInfo = [
	{
		title: "Disciplina",
		description:
			"La disciplina es esencial para maximizar el rendimiento, prevenir lesiones y lograr metas en el atletismo.",
		imageUrl: img1.src,
		alt: "Disciplina",
		id: 1,
	},
	{
		title: "Dedicación",
		description:
			"La dedicación es la clave para alcanzar el éxito en el atletismo.",
		imageUrl: img1.src,
		alt: "Dedicación",
		id: 2,
	},
	{
		title: "Compromiso",
		description:
			"El compromiso es la base de la confianza y la confianza es la base del éxito.",
		imageUrl: img1.src,
		alt: "Compromiso",
		id: 3,
	},
];

export default function Home() {
	return (
		<>
			<Header title="Runners San José" />
			<Container>
				<ContainerTitle
					title="Misión"
					description="Nuestra misión es fomentar un desarrollo integral de cada
				individuo, no solo en el ámbito deportivo, sino también en su
				vida cotidiana y profesional. Nos comprometemos a brindar un
				espacio en línea que inspire, eduque y empodere a nuestros
				atletas y miembros, alentándolos a alcanzar sus metas y
				aspiraciones personales y deportivas."
				/>
				<CardsContainer>
					{MISSIONCARDSINFO.map((cardInfo) => (
						<CardContainer key={cardInfo.id}>
							<ImageCard {...cardInfo} src={cardInfo.imageUrl} />
						</CardContainer>
					))}
				</CardsContainer>
			</Container>
			<Container>
				<ContainerTitle
					title="Ubicación"
					description="Contamos con las mejores instalacionespara explotar tu máximo potencial. Vení al BN Arena, en Hatillo 2."
				/>
				<Map src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15720.619123098602!2d-84.1040888!3d9.9210644!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e36735d71357%3A0xc29eed838a10e42e!2sBN%20Arena!5e0!3m2!1ses-419!2scr!4v1693881189331!5m2!1ses-419!2scr" />
			</Container>
		</>
	);
}
