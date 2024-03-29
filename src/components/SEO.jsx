import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({ title, description, name, type, ogimage, image1 }) {

	const htmlToPlainText = (html) => {
		var parser = new DOMParser();
		var dom = parser.parseFromString(html, 'text/html');
		return dom.body.textContent || "";
	}

	return (
		<Helmet>
			<title>{title}</title>
			<meta property="og:title" content={title} />
			<meta property="og:type" content='website' />
			<meta property="og:image" itemprop="image" content={ogimage || image1} />
			<meta name="description" content={htmlToPlainText(description)} />
			<meta property="og:description" content={htmlToPlainText(description)} />
			{/* <meta name="twitter:creator" content={name} />
			<meta name="twitter:card" content={type} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} /> */}
		</Helmet>
	);
}