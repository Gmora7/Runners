"use client";

import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Button from "@/components/Button/Button";
import { useEffect, useState } from "react";
import { Contact, Question, Answer, SubmitResponse } from "@/types";
import Alert from "@/components/Alert/Alert";

const StyledRating = styled(Rating)(({ theme }) => ({
	"& .MuiRating-iconEmpty .MuiSvgIcon-root": {
		color: theme.palette.action.disabled,
	},
}));

const customIcons: {
	[index: string]: {
		icon: React.ReactElement;
		label: string;
	};
} = {
	1: {
		icon: <SentimentVeryDissatisfiedIcon color="error" />,
		label: "Very Dissatisfied",
	},
	2: {
		icon: <SentimentDissatisfiedIcon color="error" />,
		label: "Dissatisfied",
	},
	3: {
		icon: <SentimentSatisfiedIcon color="warning" />,
		label: "Neutral",
	},
	4: {
		icon: <SentimentSatisfiedAltIcon color="success" />,
		label: "Satisfied",
	},
	5: {
		icon: <SentimentVerySatisfiedIcon color="success" />,
		label: "Very Satisfied",
	},
};

function IconContainer(props: IconContainerProps) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}

interface Ratings {
	[key: string]: number;
}

const ratingsInitialState: Ratings = {
	question1: 0,
	question2: 0,
	question3: 0,
	question4: 0,
};

export default function TrainerEvaluation() {
	const [ratings, setRatings] = useState<Ratings>(ratingsInitialState);
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [contactID, setContactID] = useState<string>("");
	const [submitResponse, setSubmitResponse] = useState<SubmitResponse | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/contacts");
			const json = await response.json();
			setContacts(json);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchQuestions = async () => {
			const response = await fetch("/api/questions");
			const json = await response.json();
			setQuestions(json);
		};
		fetchQuestions();
	}, []);

	const handleAlertClose = () => {
		setSubmitResponse(null);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (questions.length === 0) {
			setSubmitResponse({
				isSuccessful: false,
				message: "No hay preguntas disponibles.",
			});
			return;
		}
		const ratingsArray = Object.values(ratings);
		const allRatingsNonZero = ratingsArray.every((rating) => rating !== 0);

		if (!allRatingsNonZero) {
			setSubmitResponse({
				isSuccessful: false,
				message: "Todas las preguntas deben ser respondidas.",
			});
			return;
		}

		const selectedContactExists = contacts.some(
			(contact) => contact._id === contactID
		);

		if (!selectedContactExists) {
			setSubmitResponse({
				isSuccessful: false,
				message: "Un contacto válido debe ser seleccionado.",
			});
			return;
		}
		let index = 0;
		for (const rating of ratingsArray) {
			try {
				const response = await fetch("/api/answers", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						contactID,
						rating,
					}),
				});
				if (!response.ok) {
					const error = await response.json();
					throw new Error(error);
				}
				const newAnswer: Answer = await response.json();
				const { _id: answerId } = newAnswer;
				const response2 = await fetch(
					`/api/questions/${questions[index++]._id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ answerId }),
					}
				);
				if (!response2.ok) {
					const error = await response2.json();
					throw new Error(error);
				}
				setSubmitResponse({
					isSuccessful: true,
					message: "Evaluación enviada con éxito.",
				});
			} catch (error) {
				if (error instanceof Error) {
					setSubmitResponse({
						isSuccessful: false,
						message: error.message,
					});
					break; // This will break the loop
				}
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
					<div className="max-w-md mx-auto">
						{submitResponse != null && (
							<Alert
								message={submitResponse.message}
								onClose={handleAlertClose}
								isSuccessful={submitResponse.isSuccessful}
							/>
						)}
						<h2 className="leading-relaxed text-3xl font-bold">
							Evaluación del Entrenador
						</h2>
						<form>
							<div className="divide-y divide-gray-200">
								<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
									<div className="flex flex-col">
										<label className="leading-loose">
											Entrenador{" "}
											<span className="text-red-600">
												*
											</span>
										</label>
										<select
											className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
											required
											defaultValue=""
											onChange={(e) =>
												setContactID(e.target.value)
											}
										>
											<option value="" disabled>
												Select a contact
											</option>
											{contacts.map((contact) => (
												<option
													key={contact._id}
													value={contact._id}
												>
													{contact.name}
												</option>
											))}
										</select>
									</div>
									{questions.map((question, index) => (
										<div
											className="flex flex-col mt-2 mb-4"
											key={index}
										>
											<div className="flex items-center">
												<label className="mr-1">
													{question.question}{" "}
													<span className="text-red-600">
														*
													</span>
												</label>
											</div>
											<div className="flex items-center">
												<StyledRating
													name="highlight-selected-only"
													defaultValue={0}
													IconContainerComponent={
														IconContainer
													}
													getLabelText={(
														value: number
													) =>
														customIcons[value].label
													}
													highlightSelectedOnly
													onChange={(
														event,
														newValue
													) => {
														setRatings(
															(prevRatings) => {
																const newRatings: Ratings =
																	{
																		...prevRatings,
																	};

																if (
																	newValue !==
																	null
																) {
																	newRatings[
																		`question${
																			index +
																			1
																		}`
																	] =
																		newValue;
																}
																return newRatings;
															}
														);
													}}
												/>
											</div>
										</div>
									))}
								</div>
								<Button
									type="submit"
									className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
									onClick={handleSubmit}
								>
									Enviar
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
