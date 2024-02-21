import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller, get } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import RTE from "./RTE";
import Select from "./Select";
import dbService from "../appwrite/dbservices";
import { useSelector } from "react-redux";
import authService from "../appwrite/authservices";

const Dormform = ({ post }) => {
	const navigate = useNavigate();
	const [error, seterror] = useState("");
	// const [uData, setUdata] = useState(null)
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: post?.title || "",
			slug: post?.slug || "",
			description: post?.description || "",
			status: post?.status || "available",
			condition: post?.condition || 7,
		},
	});

	const userData = useSelector((state) => state.authslc.userData);
	console.log(userData);

	const getcurrent = async () => {
		const data = await authService.getCurrentUser();
		console.log(data);
		return data
	}

	const getDate = () => {
		let date = new Date();
		let day = String(date.getDate()).padStart(2, "0");
		let month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
		let year = date.getFullYear();
		return day + "/" + month + "/" + year;
	}
	
	const submit = async (data) => {
		console.log("triggered");
		console.log(data);
		if (data.description.trim() === "") {
			alert("description cant be empty");
			return;
		}
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
					// userId: "anonymousUserid",
					userId: userData.$id,
					// author: "anonymousUserName",
					author: userData.name,
					date: getDate(),
				});

				dbPost ? console.log("posted successfully", dbPost) : null;
			} else {
				console.log("file is not uploaded");
			}
		} catch (error) {
			console.log(error);
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
		<div>
			<h2>All Fields are Required</h2>
			<form onSubmit={handleSubmit(submit)}>
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: true })}
				/>

				<Input
					label="Price :"
					type="number"
					placeholder="150"
					className="mb-4"
					{...register("price", {
						required: true,
					})}
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
				<Input
					label="Whatsapp No :"
					type="number"
					placeholder="+923424295275"
					className="mb-4"
					{...register("phone", { required: true })}
				/>

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

				<Controller
					control={control}
					name="condition"
					rules={{ required: true }}
					render={({ field }) => (
						<Select
							options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
							label="Condition: "
							className="mb-4"
							{...field}
							onChange={(e) => {
								field.onChange(parseInt(e.target.value));
							}}
						/>
					)}
				/>

				<Controller
					control={control}
					name="status"
					rules={{ required: true }}
					render={({ field }) => (
						<Select
							options={["avialable", "sold"]}
							label="Status: "
							className="mb-4"
							{...field}
							disabled={!post}
						/>
					)}
				/>

				<RTE
					label="Description :"
					name="description"
					control={control}
					defaultValue={getValues("description")}
					rules={{ required: true }}
				/>
				<Button type="submit" children="Post Deal" />
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default Dormform;
