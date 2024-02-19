import React, { useEffect, useState } from "react";
import dbService from "../appwrite/dbservices";
import { useParams } from "react-router-dom";

const DormDeals = () => {
	const [posts, setPosts] = useState([]);

  const path = useParams();

	const getData = async () => {
		await dbService.getPostsDorms().then((data) => {
			setPosts(data.documents);
		});
	};
	useEffect(() => {
		getData();
	}, []);
  
	const data = {
    slug: 'createTestdorm',
		title: 'test deal 2',
		userId: 'anonymous',
		status: true,
		author: 'useranonymous',
		date: 'today',
		price: 150,
		condition: 10,
		description: '<p>chapri content here</p>',
		image1: 'peliphoto',
		image2: '2uiphoto',
		image3: '3ri photo',
		phone: '+923424295275',
	};

	const postDeal = async (data) => {
    console.log('run!')
		const res = await dbService.createPostDorm(data).then(console.log('data posted successfully.  ==>'));
    console.log(res);
	};
  
  console.log(path);
	console.log(posts);
	return (
		<>
			<div>DormDeals</div>
			<button onClick={() => postDeal(data)}>Create Post</button>
		</>
	);
};

export default DormDeals;
