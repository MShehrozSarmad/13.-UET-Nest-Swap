import React from "react";
import { Helmet } from "react-helmet-async";
import dbService from "../appwrite/dbservices";
export default function SEO({ title, description, ogimage, image1, image }) {

	const htmlToPlainText = (html) => {
		var parser = new DOMParser();
		var dom = parser.parseFromString(html, 'text/html');
		return dom.body.textContent || "";
	}

	return (
		<Helmet>
			<title>{title}</title>
			<meta property="og:title" content={title} />
			<meta property="og:description" content={htmlToPlainText(description)} />
			<meta name="description" content={htmlToPlainText(description)} />
		</Helmet>
	);
}