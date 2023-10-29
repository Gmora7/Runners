"use client";
import Header from "@/components/Header/Header";
import NewsCard from "@/components/NewsCard/NewsCard";
import Container from "@/components/Container/Container";
import { useState, useEffect } from "react";

interface News {
	_id: number;
	src: string;
	category: string;
	title: string;
	body: string;
	date: string;
}

export default function News() {
	const [news, setNews] = useState<News[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/news");
			const json = await response.json();
			setNews(json);
		};
		fetchData();
	}, []);
	return (
		<div className="min-h-screen">
			<Header title="Noticias" />
			<Container justifyContent="center" display="block">
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
