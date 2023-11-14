"use client";
import Header from "@/components/Header/Header";
import NewsCard from "@/components/NewsCard/NewsCard";
import Container from "@/components/Container/Container";
import { useState, useEffect } from "react";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { News } from "@/types";

export default function News() {
	const [news, setNews] = useState<News[]>([]);
	const [isSuscribed, setIsSuscribed] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/news");
			const json = await response.json();
			setNews(json);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const userId = localStorage.getItem("id");
			if (userId == null) return;
			const response = await fetch(`/api/users/${userId}`);
			const { isSuscribed } = await response.json();
			setIsSuscribed(isSuscribed);
		};
		fetchData();
	}, []);

	const handleNotification = async () => {
		try {
			const userId = localStorage.getItem("id");
			const response = await fetch(`/api/users/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ isSuscribed: !isSuscribed }),
			});
			if (!response.ok) {
				return;
			}
			setIsSuscribed((prevIsSuscribed) => !prevIsSuscribed);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen">
			<Header title="Noticias" />
			<Container justifyContent="center" display="block">
				<ToggleButton
					onToggle={handleNotification}
					isChecked={isSuscribed}
				/>
				{news.map((news) => (
					<NewsCard
						key={news._id}
						src={news.src}
						category={news.category}
						title={news.title}
						body={news.body}
						date={news.date}
					/>
				))}
			</Container>
		</div>
	);
}
