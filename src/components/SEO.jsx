import React from "react";
import { Helmet } from "react-helmet-async";
import dbService from "../appwrite/dbservices";
export default function SEO({ title, desc, description, ogimage, image1 }) {

	const htmlToPlainText = (html) => {
		var parser = new DOMParser();
		var dom = parser.parseFromString(html, 'text/html');
		return dom.body.textContent || "";
	}

	return (
		<Helmet>
			<title>{title}</title>
			<meta property="og:title" content={title} />
			<meta property="og:image" itemprop="image" content={ogimage || dbService.previewFile(image1)} />
			<meta name="description" content={desc} />
			<meta property="og:description" content={desc} />
			<meta property="og:url" content="https://www.uetnestswap.live" />

			{/* <meta name="twitter:creator" content={name} />
			<meta name="twitter:card" content={type} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} /> */}
		</Helmet>
	);
}