
	return (
		<div className="flex justify-center items-center h-screen">
			<form
				onSubmit={handleSubmit(login)}
				className="bg-gradient-to-r from-blue-900 to-blue-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md text-white"
			>
				{/* Form content */}
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-bold mb-2"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Enter your email"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						{...register("email", {
							required: true,
							validate: {
								matchPattern: (value) =>
									/\.uettaxila\.edu\.pk$/.test(value) ||
									"Only in-campus deals allowed, Use UET assigned email",
							},
						})}
					/>
					{errors.email && (
						<p className="text-red-500 text-xs italic">
							{errors.email.message}
						</p>
					)}
				</div>
				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-sm font-bold mb-2"
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						placeholder="Enter your password"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						{...register("password", { required: true })}
					/>
				</div>
				<p className="text-gray-400 text-xs italic mb-4">
					By signing in, you agree to our{" "}
					<Link
						to={"/terms"}
						target="_blank"
						className="text-blue-300"
					>
						Terms & Conditions
					</Link>
				</p>
				<Button
					type="submit"
					disabled={btnStat}
					className={`${
						btnStat
							? "bg-blue-200"
							: "bg-blue-500 hover:bg-blue-700"
					} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
				>
					Sign In
				</Button>
				{error && (
					<p className="text-red-500 text-xs italic mt-4">{error}</p>
				)}
				<div className="text-gray-400 text-sm mt-4">
					<p>
						Don't have an account?{" "}
						<Link to={"/signup"} className="text-blue-300">
							Sign up here
						</Link>
					</p>
				</div>
			</form>
		</div>
	);