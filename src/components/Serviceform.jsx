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

const Serviceform = ({ post }) => {
	const navigate = useNavigate();
	const [error, seterror] = useState("");
	const [imagePreviews, setImagePreviews] = useState({
		image1: null,
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
			amount: post ? extractAmountAndItem(post.charges).amnt : "",
			item: post ? extractAmountAndItem(post.charges).itm : "",
			slug: post?.$id || "",
			phone: post?.phone || "",
			description: post?.description || "",
			status: post?.status || "available",
		},
	});

    function extractAmountAndItem(str) {
        const amountMatch = str.match(/(\d+)PKR/);
        const itemMatch = str.match(/PKR \/ (.+)/);
    
        const amnt = amountMatch ? parseFloat(amountMatch[1]) : null;
        const itm = itemMatch ? itemMatch[1] : null;
    
        return { amnt, itm };
    }

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
				const postUpdate = await dbService.updatePostService(post.$id, {
					...data,
					charges: data.amount + "PKR / " + data.item,
					date: getDate(),
				});
				toast.success("Updated successfully");
				navigate(`/service/${post.$id}`);
			} catch (error) {
				console.log(error);
				toast.error(error.response.message);
			}
		} else {
			try {
				const file1 = await dbService.uploadFile(data.image[0]);

				if (file1) {
					data.image = file1.$id;

					try {
						const dbPost = await dbService.createPostService({
							...data,
                            charges: data.amount + "PKR / " + data.item,
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
				Service Form
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

						<div>
							<label className="">Charges: </label>
							<div className="border2 flex gap-3 p2">
								<Input
									label="Amount(PKR) "
									type="number"
									placeholder="7000"
									lblClass="text-sm text-xs"
									className="mb-4 border-[1px] border-gray-200 rounded-md p-1 w-full"
									{...register("amount", { required: true })}
								/>
								<Input
									label="Service"
									type="text"
									placeholder="1 month tution"
									lblClass="text-sm text-xs"
									className="mb-4 border-[1px] border-gray-200 rounded-md p-1 w-full"
									{...register("item", { required: true })}
								/>
							</div>
						</div>

						<Input
							label="Whatsapp No :"
							type="number"
							placeholder="923424295275"
							className="mb-4 border-[1px] border-gray-200 rounded-md p-1 w-full"
							{...register("phone", { required: true })}
						/>
						<Input
							label="Image:"
							type="file"
							className="mb-4 w-full"
							accept="image/png, image/jpg, image/jpeg, image/gif"
							{...register("image", { required: !post })}
							disabled={post}
							onChange={(e) => handleFileChange(e, 1)}
						/>

						<div className=" border2 border-red-400 [&>*]:border2 [&>*]:max-w-[33%] [&>*]:aspect-square [&>*]:object-contain flex flex-row">
							{imagePreviews.image1 && (
								<img
									src={imagePreviews.image1}
									alt="preview"
									className="w-full h-auto mb-4"
								/>
							)}
						</div>
					</div>

					<div>
						<Controller
							control={control}
							name="status"
							rules={{ required: true }}
							render={({ field }) => (
								<Select
									options={["avialable", "unavailable"]}
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

export default Serviceform;
