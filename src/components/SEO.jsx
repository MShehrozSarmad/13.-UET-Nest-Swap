import React from "react";
import { Helmet } from "react-helmet-async";
import dbService from "../appwrite/dbservices";
export default function SEO({ title, desc, description, ogimage, image1, image }) {

	const htmlToPlainText = (html) => {
		var parser = new DOMParser();
		var dom = parser.parseFromString(html, 'text/html');
		return dom.body.textContent || "";
	}

	return (
		<Helmet>
			<title>{title}</title>
			<meta property="og:title" content={title} />
			<meta property="og:description" content={desc || htmlToPlainText(description)} />
			<meta property="og:url" content="https://www.uetnestswap.live" />
			<meta name="description" content={desc || htmlToPlainText(description)} />

			{/* <meta property="og:image" itemprop="image" content={ogimage || dbService.previewFile(image1 || image)} /> */}
			{/* <meta name="twitter:creator" content={name} />
			<meta name="twitter:card" content={type} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} /> */}

			{/* <!-- <meta name="description" --> */}
			{/* // <!-- content="UET Nest Swap is the platform for UET Taxila students to buy, sell, and rent items, post services, and find vehicle rentals within the campus community." /> --> */}
		</Helmet>
	);
}