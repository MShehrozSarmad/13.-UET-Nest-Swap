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
import { toast } from "react-toastify";

const Rentalform = ({ post }) => {
	const navigate = useNavigate();
	const [error, seterror] = useState("");
	const [imagePreviews, setImagePreviews] = useState({
		image1: null,
		image2: null,
	});

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
			rent: post?.rent || "",
			slug: post?.$id || "",
			phone: post?.phone || "",
			description: post?.description || "",
			status: post?.status || "available",
		},
	});

	const userData = useSelector((state) => state.authslc.userData);

	const getcurrent = async () => {
		const data = await authService.getCurrentUser();
		console.log(data);
		return data;
	};

	const getDate = () => {
		const date = new Date();
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
		const year = date.getFullYear();
		return day + "/" + month + "/" + year;
	};

	const submit = async (data) => {
		console.log("triggered");
		console.log(data);

		if (data.description.trim() === "") {
			toast.warning("Description cant be empty!");
			return;
		}

		if (post) {
			try {
				const postUpdate = await dbService.updatePostDorm(post.$id, {
					...data,
					date: getDate(),
				});
				toast.success("Updated successfully");
				navigate(`/rental/${post.$id}`);
			} catch (error) {
				console.log(error);
				toast.error(error.response.message);
			}
		} else {
			try {
				const file1 = await dbService.uploadFile(data.image1[0]);
				const file2 = await dbService.uploadFile(data.image2[0]);

				if (file1 && file2) {
					data.image1 = file1.$id;
					data.image2 = file2.$id;

					try {
						const dbPost = await dbService.createPostRental({
							...data,
							userId: userData.$id,
							author: userData.name,
							date: getDate(),
						});
						toast.success("Deal Posted Successfully.");
					} catch (error) {
						console.log({ error });
						toast.error(
							error.type == "document_already_exists"
								? "Use different slug"
								: error.response.message
						);
					}
					// dbPost ? navigate(`/dormdeal/${data.slug}`) : null;
				} else {
					console.log("file is not uploaded");
					toast.error("Failed to upload Images, Try Again");
				}
			} catch (error) {
				toast.error(error.message);
			}
		}
		console.log("exiting submit");
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return value.trim().toLowerCase().replace(/\s/g, "-");
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

	const handleFileChange = (e, imageNumber) => {
		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			let reader = new FileReader();
			reader.onload = function (e) {
				setImagePreviews((prev) => ({
					...prev,
					[`image${imageNumber}`]: e.target.result,
				}));
			};
			reader.readAsDataURL(img);
		}
	};

	return (
		<div className=" w-[95%] max-w-5xl border-2 p-6 my-6 shadow-md mx-auto rounded-md">
			<h1 className=" text-purple-500 text-center text-2xl font-semibold m-4 ">
				Rental Form
			</h1>
			<h2 className="text-red-600 text-md  mb-4">
				* All Input Fields are Required
			</h2>
			<form
				onSubmit={handleSubmit(submit)}
				className="mt-8 border2 border-red-500"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 [&>*]:border2 [&>*]:border-blue-500">
					<div>
						<Input
							label="Title :"
							placeholder="Title"
							className="mb-4 border-[1px] border-gray-200 rounded-md p-1 w-full"
							{...register("title", { required: true })}
							disabled={post}
						/>
						<Input
							label="Slug :"
							placeholder="Slug"
							className="mb-4 border-[1px] border-gray-200 rounded-md p-1 w-full"
							{...register("slug", { required: true })}
							onInput={(e) => {
								setValue(
									"slug",
									slugTransform(e.currentTarget.value),
									{
										shouldValidate: true,
									}
								);
							}}
							disabled={post}
						/>

						<Input
							label="Rent :"
							type="number"
							placeholder="150"
							className="mb-4 border-[1px] border-gray-200 rounded-md p-1 w-full"
							{...register("rent", { required: true })}
						/>
						<Input
							label="Whatsapp No :"
							type="number"
							placeholder="923424295275"
							className="mb-4 border-[1px] border-gray-200 rounded-md p-1 w-full"
							{...register("phone", { required: true })}
						/>
						<Input
							label="Image 1:"
							type="file"
							className="mb-4 w-full"
							accept="image/png, image/jpg, image/jpeg, image/gif"
							{...register("image1", { required: !post })}
							disabled={post}
							onChange={(e) => handleFileChange(e, 1)}
						/>

						<Input
							label="Image 2:"
							type="file"
							className="mb-4 w-full"
							accept="image/png, image/jpg, image/jpeg, image/gif w-full border-4 border-red-500"
							{...register("image2", { required: !post })}
							disabled={post}
							onChange={(e) => handleFileChange(e, 2)}
						/>

						<div className=" border2 border-red-400 [&>*]:border2 [&>*]:max-w-[33%] [&>*]:aspect-square [&>*]:object-contain flex flex-row">
							{imagePreviews.image1 && (
								<img
									src={imagePreviews.image1}
									alt="preview"
									className="w-full h-auto mb-4"
								/>
							)}
							{imagePreviews.image2 && (
								<img
									src={imagePreviews.image2}
									alt="preview"
									className="w-full h-auto mb-4"
								/>
							)}
						</div>
					</div>

					<div>
						{/* <Controller
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
										field.onChange(
											parseInt(e.target.value)
										);
									}}
									disabled={post}
								/>
							)}
						/> */}

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
						<Button
							type="submit"
							children={post ? "Update Deal" : "Post Deal"}
							className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
						/>
						{error && <p className="text-red-500">{error}</p>}
					</div>
				</div>
			</form>
		</div>
	);
};

export default Rentalform;