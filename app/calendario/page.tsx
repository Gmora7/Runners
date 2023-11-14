"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import esLocale from "@fullcalendar/core/locales/es";
import { useEffect, useState } from "react";

export default function Calendar() {
	type Event = {
		name: string;
		date: Date;
		time: string;
	};
	const [events, setEvents] = useState<Event[]>([]);

	function combinarFechaYHora(fecha: Date, horaString: string) {
		const [hora, minutos] = horaString.split(":").map(Number);

		const nuevaFecha = new Date(fecha);

		nuevaFecha.setUTCHours(hora);
		nuevaFecha.setUTCMinutes(minutos);

		return nuevaFecha;
	}

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/competences");
			const json = await response.json();
			setEvents(json);
		};
		fetchData();
	}, []);
	return (
		<>
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
				<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
					Eventos
				</span>
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					timeZone="UTC"
					locale={esLocale}
					eventTimeFormat={{
						hour: "numeric",
						minute: "2-digit",
						meridiem: "short",
					}}
					events={events.map((event) => ({
						title: event.name,
						start: combinarFechaYHora(event.date, event.time),
					}))}
				/>
			</div>
		</>
	);
}
