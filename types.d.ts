export interface News {
	_id: string;
	src: string;
	category: string;
	title: string;
	body: string;
	date: string;
}

export interface User {
	name: string;
	lastname: string;
	rol: boolean;
	identification: string;
	birth: Date;
	phone: string;
	location: string;
	email: string;
	password: string;
	isSuscribed: boolean;
}

export interface Contact {
	_id: string;
	name: string;
	phone: string;
	occupation: string;
	imageUrl: string;
}

export interface PotentialUser {
	_id: string;
	name: string;
	lastname: string;
	email: string;
	phone: number;
}

export interface Answer {
	_id: string;
	contact: Contact;
	rating: number;
}

export interface Question {
	_id: string;
	question: string;
	answers: Answer[];
}

export interface SubmitResponse {
	isSuccessful: boolean;
	message: string;
}
