import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, label, defaultValue }) => {
	return (
		<div className="w-full">
			{label && <label className="mb-1 inline-block pl-1">{label}</label>}
			
			<Controller
				name={name || "description"}
				control={control}
				render={({ field: { onChange } }) => (
					<Editor
						apiKey='tiuh2q97tz38fz5tljyqww3quf7dm7h9vsh7qu1hb9p0jfgl'
						initialValue={defaultValue}
						init={{
							branding: false,
							height: 500,
							menubar: true,
							plugins: [
								"image",
								"advlist",
								"autolink",
								"lists",
								"link",
								"image",
								"charmap",
								"preview",
								"anchor",
								"searchreplace",
								"visualblocks",
								"code",
								"fullscreen",
								"insertdatetime",
								"media",
								"table",
								"code",
								"help",
								"wordcount",
								"anchor",
							],
							toolbar:
								"undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
							content_style:
								"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						}}
                        onEditorChange={onChange}
					/>
				)}
			/>
		</div>
	);
};

export default RTE;
