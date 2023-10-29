"use client";
import Header from "@/components/Header/Header";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import Container from "@/components/Container/Container";
import CardsContainer from "@/components/CardsContainer/CardsContainer";
import { useState, useEffect } from "react";
import ContactForm from "@/components/ContactForm/ContactForm";
interface Contact {
	_id: number;
	name: string;
	phoneNumber: string;
	occupation: string;
	imageUrl: string;
}

export default function Contacts() {
	const [contacts, setContacts] = useState<Contact[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/contacts");
			const json = await response.json();
			setContacts(json);
		};
		fetchData();
	}, []);

	return (
		<>
			<Header title="Contactos" />
			<Container>
				<CardsContainer>
					{contacts.map((contact) => (
						<ProfileCard
							key={contact._id}
							src={contact.imageUrl}
							occupation={contact.occupation}
							name={contact.name}
							phoneNumber={contact.phoneNumber}
						/>
					))}
				</CardsContainer>
			</Container>
			<Container width="30%" display="block">
				<ContactForm />
			</Container>
		</>
	);
}
