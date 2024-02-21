import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RTE from "./RTE";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import dbService from "../appwrite/dbservices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dormform = ({ post }) => {
	const [contentLoading, setContentLoading] = useState(true);

	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.slug || "",
				content: post?.content || "",
				status: post?.status || true,
			},
		});

	useEffect(() => {
		if (post) {
			setValue("title", post.title);
			setValue("content", post.content);
			setValue("status", post.status);
			post.content && post.featuredImg
				? setContentLoading(false)
				: setContentLoading(true);
			console.log(post);
		} else {
			setContentLoading(false);
		}
		// console.log("---------------------------------------");
		// console.log("ye chx => post, loading", post, contentLoading);
		// console.log("ye chx2 => post && loading = ", post && contentLoading);
		// console.log("---------------------------------------");
	}, [post, setValue]);

	const navigate = useNavigate();
	// const userData = useSelector((state) => state.auth.userData);
	const userData = "anonymousUser";

	// const submit = async (data) => {
	// 	console.log("submitted");
	// 	if (post) {
	// 		// let file = null;
	// 		// if (data.image[0]) {
	// 		// 	file = await dbService.uploadFile(data.image[0]); // await the file upload
	// 		// 	if (file) {
	// 		// 		console.log("success ", file, file.$id); // check if file is defined before accessing file.$id
	// 		// 		dbService.delFile(post.featuredImg);
	// 		// 	} else {
	// 		// 		console.log("failed ", file);
	// 		// 	}
	// 		// }

	// 		// const dbPost = await dbService.updatePost(post.$id, {
	// 		// 	...data,
	// 		// 	featuredImg: file ? file.$id : "fdata", // use the uploaded file's id
	// 		// });

	// 		// dbPost ? navigate(`/post/${dbPost.$id}`) : null;
	// 	} else {

	// 		const file1 = await dbService.uploadFile(data.image1[0]);
	// 		const file2 = await dbService.uploadFile(data.image2[0]);
	// 		const file3 = await dbService.uploadFile(data.image3[0]);

	// 		if (file1 && file2 && file3) {
	// 			// const fileId = file.$id;
	// 			// data.featuredImg = fileId;

	//             data.image1 = file1.$id;
	//             data.image2 = file2.$id;
	//             data.image3 = file3.$id;

	// 			const dbPost = await dbService.createPostDorm({
	// 				...data,
	// 				userId: 'anonymousUserid',
	// 				author: 'anonymousUserName',
	//                 date: 'aj di date'
	// 				// userId: userData.$id,
	// 				// author: userData.name,
	// 			});
	// 			// dbPost ? navigate(`/post/${dbPost}`) : null;
	// 			dbPost ? console.log('posted successfully') : null;
	// 		} else {
	// 			console.log("file is not uploaded");
	// 		}
	// 		console.log("yes submitted");
	// 	}
	// };

	const submit = async (data) => {
		console.log("submit triggered");
		try {
			const file1 = await dbService.uploadFile(data.image1[0]);
			const file2 = await dbService.uploadFile(data.image2[0]);
			const file3 = await dbService.uploadFile(data.image3[0]);

			if (file1 && file2 && file3) {
				data.image1 = file1.$id;
				data.image2 = file2.$id;
				data.image3 = file3.$id;

				const dbPost = await dbService.createPostDorm({
					...data,
					userId: "anonymousUserid",
					author: "anonymousUserName",
					date: "aj di date",
				});

				dbPost ? console.log("posted successfully") : null;
			} else {
				console.log("file is not uploaded");
			}
		} catch (error) {
            console.log(error)
        }

		console.log("yes submitted");
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return (
				value
					.trim()
					.toLowerCase()
					// .replace(/^[a-zA-Z\d\s]+/g, "-")
					.replace(/\s/g, "-")
			);
		return "";
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue(
					"slug",
					slugTransform(value.title, { shouldValidate: true })
				);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [watch, slugTransform, setValue]);

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: true })}
				/>
				<Input
					label="Description :"
					placeholder="description"
					className="mb-4"
					{...register("description", { required: true })}
				/>
				<Input
					type="number"
					label="Price :"
					placeholder="150"
					className="mb-4"
					{...register("price", { required: true })}
				/>
				<Input
					label="Phone :"
					placeholder="+923424295275"
					className="mb-4"
					{...register("phone", { required: true })}
				/>
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: true })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
					disabled={post}
				/>
				{/* {contentLoading ? (
					<p>Loading content...</p>
				) : (
					<RTE
						label="Description :"
						name="description"
						control={control}
						defaultValue={getValues("description")}
					/>
				)} */}
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Image 1:"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image1", { required: !post })}
				/>
				<Input
					label="Image 2:"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image2", { required: !post })}
				/>
				<Input
					label="Image 3:"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image3", { required: !post })}
				/>

				{/* {post ? (
					contentLoading ? (
						<p>content is loading...</p>
					) : (
						<div className="w-full mb-4">
							<img
								src={dbService.previewFile(
									post.featuredImg || '"657b1a633744df1ad97b"'
								)}
								alt={post.title}
								className="rounded-lg"
							/>
						</div>
					)
				) : null} */}

				<Select
					options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
					label="Condition: "
					className="mb-4"
					{...register("condition", { required: true })}
				/>
				<Select
					options={["avialable", "sold"]}
					label="Status: "
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button
					type="submit"
					bgColor={post ? "bg-green-500" : undefined}
					className="w-full"
					onClick={() => console.log("clicked...")}
				>
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	);
};

export default Dormform;
