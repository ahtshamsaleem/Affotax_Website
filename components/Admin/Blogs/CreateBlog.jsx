"use client";



import { useState, useEffect, useRef } from "react";
import { Alert, Button, Input, message, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";

import { createBlog, UploadImage } from "@/actions/blog";

import { MdOutlineContentCopy } from "react-icons/md";
import { CustomEditor } from "@/lib/Editor";






export default function CreateBlog() {

	

	const [isUrlReadOnly, setIsUrlReadOnly] = useState(false);

	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [isError, setIsError] = useState(false);


	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [imgUrl, setImgUrl] = useState("");

	const [metaTitle, setMetaTitle] = useState("");
	const [metaDescription, setMetaDescription] = useState("");

	const [value, setValue] = useState("");

	const [keywords, setKeywords] = useState([]);

	const [url, setUrl] = useState("");




	const urlInpuRef = useRef();
	const quillRef = useRef();
	const joditRef = useRef();


 
		


	useEffect(() => {
		

		setUrl(window?.location?.origin + "/blog/");
	}, []);






	const props = {
		name: "imgFile",
		customRequest: async (file) => {
			console.log(file);
			const form = new FormData();
			form.append("imgFile", file.file);
			const res = await UploadImage(form);

			setImgUrl(res.url);
			file.onSuccess();

			return;
		},

		multiple: false,

		onChange(info) {
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};





	const submitHandler = async () => {
		setUploadSuccess(false);
		setIsError(false);

		const formData = new FormData();

		formData.append("title", title);
		formData.append("description", description);
		formData.append("metaTitle", metaTitle);
		formData.append("metaDescription", metaDescription);
		formData.append("imgUrl", imgUrl);
		formData.append("content", value);
		formData.append("keywords", keywords);

		const res = await createBlog(formData);

		if (res.success) {
			setUploadSuccess(res.success);

			setTitle("");
			setDescription("");
			setImgUrl("");
			setMetaTitle("");
			setMetaDescription();
			setValue("");
			setKeywords([]);
		} else {
			setIsError(true);
		}
	};





	 





	const urlInputHandler = (e) => {
		setUrl(e.target.value)
	}

	

	const copyIntoClipboard = () => {

		console.log(urlInpuRef.current)
		urlInpuRef.current.select();

		document?.execCommand("copy");
		window?.getSelection().removeAllRanges();

		message.success(`Url Copied!`);
	}








	return (
		<>
			<div className="w-full flex flex-col gap-4 justify-center items-center p-2">
				<div className="w-full flex justify-between items-center gap-12">

				<div className="flex gap-2 w-[70%] ">
				<Input
					ref={urlInpuRef}
					className=" "
					placeholder="The Url of the current Page"
					variant="filled"
					value={url}
					readOnly={isUrlReadOnly}
					onChange={urlInputHandler}
					// onClick={(e) => {
					// 	e.target.select();

					// 	document?.execCommand("copy");
					// 	window?.getSelection().removeAllRanges();

					// 	message.success(`Url Copied!`);
					// }}
				/>

				<button className="   p-3 flex justify-center items-center   rounded-full bg-gray-200 text-black active:scale-90 hover:scale-110 hover:bg-[#50C878] hover:text-white transition-all " onClick={copyIntoClipboard}  > <MdOutlineContentCopy className="text-lg"/> </button>
				</div>

	


				<div className=" flex gap-2 w-[30%] justify-start ">
				<Button style={{ backgroundColor: `${!isUrlReadOnly ? '#50C878' : '#E5E4E2'}`  }}  onClick={() => setIsUrlReadOnly(false)} type="primary"  > Custom </Button>
				<Button style={{ backgroundColor: `${isUrlReadOnly ? '#50C878' : '#E5E4E2'}`  }}  onClick={() => setIsUrlReadOnly(true)} type="primary" > Automatic </Button>
				</div>


				</div>


				<div className="w-full flex gap-8 justify-center items-start ">
					<div className="w-full flex flex-col gap-2 ">
						<label>Title</label>
						<Input
							placeholder="Title of the Blog"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);

								if(isUrlReadOnly) {
									const slug = e.target.value
									.toLocaleLowerCase()
									.trim()
									.replaceAll(" ", "-")
									.replace(/[^\w\-]/g, "");

								const url =
									window?.location?.origin + "/blog/" + slug;
								setUrl(url);
								}
							}}
						/>

						<label>Description</label>
						<TextArea rows={4} placeholder="Write a short description here!" maxLength={300} value={description} onChange={(e) => setDescription(e.target.value)} />

						<label>Select Image</label>
						<Upload {...props}> {" "} <Button icon={<UploadOutlined />}> Click to Upload </Button>{" "} </Upload>
					</div>

					<div className="w-full flex flex-col  gap-2">
						<label>Meta Title</label>
						<Input placeholder="Meta title for the blog" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />

						<label>Meta Description</label>
						<TextArea rows={4} placeholder="Write a short meta description here!" maxLength={300} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />

						<label>Keywords</label>
						<Select mode="tags" style={{ width: "100%" }} placeholder="Keywords" onChange={(value) => { console.log(value); setKeywords(value); }} value={keywords} options={[]} />
					</div>
				</div>

				<div className="w-full flex flex-col  gap-2">
					<label>Content for the blog</label>
					
					<CustomEditor value={value} setValue={setValue} />
					


					<Button className="w-[10%] mt-4" onClick={submitHandler} type="primary" > Add Post </Button>
				</div>

				<div className="w-full flex justify-start mt-16"></div>

				{uploadSuccess && ( <Alert message="New blog is added successfully!" type="success" showIcon closable /> )}
				{isError && ( <Alert message="Failed to add new blog!" type="error" showIcon closable /> )}
			</div>
		</>
	);
}
