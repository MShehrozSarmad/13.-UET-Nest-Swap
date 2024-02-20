import React, { useEffect, useState } from "react";
import dbService from "../appwrite/dbservices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DormDeals = () => {
  
	// const data = {
    // slug: 'createTestdorm',
	// 	title: 'test deal 2',
	// 	userId: 'anonymous',
	// 	status: true,
	// 	author: 'useranonymous',
	// 	date: 'today',
	// 	price: 150,
	// 	condition: 10,
	// 	description: '<p>chapri content here</p>',
	// 	image1: 'peliphoto',
	// 	image2: '2uiphoto',
	// 	image3: '3ri photo',
	// 	phone: '+923424295275',
	// };

	// const postDeal = async (data) => {
    // console.log('run!')
	// 	const res = await dbService.createPostDorm(data).then(console.log('data posted successfully.  ==>'));
    // console.log(res);
	// };

  const dorms = useSelector(state => state.dormslc);

	return (
		<>
			<div>DormDeals</div>
			<button onClick={() => console.log(dorms)}>get Posts</button>
		</>
	);
};

export default DormDeals;
