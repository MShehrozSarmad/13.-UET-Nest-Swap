import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller, get } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import RTE from "./RTE";
import Select from "./Select";
import dbService from "../appwrite/dbservices";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/authservices";
import { toast } from "react-toastify";
import { setrntlflg } from "../store/preloadSlc";
import Frominfo from "./Frominfo";
import AdsenseCmpnt from "./AdsenseCmpnt";

const Rentalform = ({ post }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [btnStat, setbtnStat] = useState(false);
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
			time: post ? extractAmountAndTime(post.rent).tm : "",
			amount: post ? extractAmountAndTime(post.rent).amnt : "",
			slug: post?.$id || "",
			phone: post?.phone || "",
			description: post?.description || "",
			status: post?.status || "available",
		},
	});

	function extractAmountAndTime(str) {
		const amountMatch = str.match(/(\d+)PKR/);
		const timeMatch = str.match(/(\d+(\.\d+)?)hr/);

		const amnt = amountMatch ? parseFloat(amountMatch[1]) : null;
		const tm = timeMatch ? parseFloat(timeMatch[1]) : null;

		return { amnt, tm };
	}

	const userData = useSelector((state) => state.authslc.userData);

	const getcurrent = async () => {
		const data = await authService.getCurrentUser();
		// console.log(data);
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
		// console.log("triggered");
		setbtnStat(true);
		// console.log(data);

		if (data.description.trim() === "") {
			toast.warning("Description cant be empty!");
			setbtnStat(false);
			return;
		}

		if (post) {
			try {
				const postUpdate = await dbService.updatePostRental(post.$id, {
					...data,
					rent: data.amount + "PKR / " + data.time + "hr",
					date: getDate(),
				});
				toast.success("Updated successfully");
				dispatch(setrntlflg());
				navigate(`/rental/${post.$id}`);
			} catch (error) {
				// console.log(error);
				toast.error(error.response.message);
				setbtnStat(false);
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
							rent: data.amount + "PKR / " + data.time + "hr",
							userId: userData.$id,
							author: userData.name,
							date: getDate(),
						});
						toast.success("Deal Posted Successfully.");
						dispatch(setrntlflg());
						navigate("/rentals");
					} catch (error) {
						// console.log({ error });
						toast.error(
							error.type == "document_already_exists"
								? "Use different slug"
								: error.response.message
						);
						setbtnStat(false);
					}
					// dbPost ? navigate(`/dormdeal/${data.slug}`) : null;
				} else {
					// console.log("file is not uploaded");
					toast.error("Failed to upload Images, Try Again");
					setbtnStat(false);
				}
			} catch (error) {
				toast.error(error.message);
				setbtnStat(false);
			}
		}
		// console.log("exiting submit");
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
			if (img.size > 2 * 1024 * 1024) {
				toast.error("File size exceeds 2MB");
				e.target.value = null; // Reset the input value
				return;
			} else {
				let reader = new FileReader();
				reader.onload = function (e) {
					setImagePreviews((prev) => ({
						...prev,
						[`image${imageNumber}`]: e.target.result,
					}));
				};
				reader.readAsDataURL(img);
			}
		}
	};

	return (
		<>
			<div className="bg-[#023179] w-[95%] max-w-5xl text-white p-6 my-6 shadow-md mx-auto rounded-md">
				<h1 className=" text-center text-2xl font-bold m-4 ">
					Rental Form
				</h1>
				<h2 className="text-[#ff0e0e] text-md  mb-4">
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
								className="mb-4 border-[1px] border-gray-200 rounded-md px-2 py-1 w-full"
								{...register("title", { required: true })}
								disabled={post}
							/>
							<Input
								label="Slug :"
								placeholder="Slug"
								className="mb-4 border-[1px] border-gray-200 rounded-md px-2 py-1 w-full"
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
								<label className="">Rent: </label>
								<div className="border2 flex gap-3 p2">
									<Input
										label="Amount(PKR) "
										type="number"
										placeholder="300"
										lblClass="text-sm text-xs"
										className="mb-4 border-[1px] border-gray-200 rounded-md px-2 py-1 w-full"
										{...register("amount", { required: true })}
									/>
									<Input
										label="Time(hour)"
										type="number"
										placeholder="1"
										step="any"
										lblClass="text-sm text-xs"
										className="mb-4 border-[1px] border-gray-200 rounded-md px-2 py-1 w-full"
										{...register("time", { required: true })}
									/>
								</div>
							</div>

							<Input
								label="Whatsapp No :"
								type="number"
								placeholder="923424295275"
								className="mb-4 border-[1px] border-gray-200 rounded-md px-2 py-1 w-full"
								{...register("phone", { required: true })}
							/>
							<Frominfo />

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
							<Controller
								control={control}
								name="status"
								rules={{ required: true }}
								render={({ field }) => (
									<Select
										options={["available", "unavailable"]}
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
								disabled={btnStat}
								children={post ? "Update Deal" : "Rent Out"}
								className={`mt-4 text-white font-bold py-2 px-4 rounded w-full
							${btnStat ? "bg-[#547acd]" : "bg-blue-600 hover:bg-blue-700"}
							`}
							/>
							{error && <p className="text-red-500">{error}</p>}
						</div>
					</div>
				</form>
			</div>
			<AdsenseCmpnt />
		</>
	);
};

export default Rentalform;
