import { useRef, useState } from "react"
import { Axios } from "../../../lib/api"
import { useNavigate, useOutletContext } from "react-router-dom"
import type { IContext } from "../../../types"

export const ImagePicker = () => {
	const {account,setAccount} = useOutletContext<IContext>()
	const picInput = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const [preview,setPreview] = useState("")
	const handlePreview = () => {
		if(picInput.current?.files){
			const file = picInput.current.files[0]
			/* Nayel ays classy FileReader*/
			const reader = new FileReader()
			reader.onload = () => {
				setPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}
	const handleUpload = () => {
		if (picInput.current?.files){
			const file = picInput.current.files[0]
			const form = new FormData()
			form.append("picture",file)

			Axios
			.patch("/profile/upload",form)
			.then(response => {
				console.log(response.data.payload)
				setAccount({...account,picture:response.data.payload})
				navigate("/profile")
			})
		}
	}
	return <div className="mb-6">
		<h3 className="text-lg font-semibold text-purple-400 mb-2">Upload Image</h3>

		<button
			type="button"
			className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
			onClick={() => picInput.current?.click()}
		>
			Choose a Picture
		</button>

		<input
			type="file"
			accept="image/*"
			className="hidden"
			ref={picInput}
			onChange={handlePreview}
		/>
		{preview && (
			<div className="mt-4 p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-sm">
				<p className="text-sm text-gray-300 font-medium mb-2">Preview:</p>

				<div className="w-full max-w-xs mx-auto mb-4">
					<img
						src={preview}
						alt="Selected preview"
						className="w-full rounded-md object-cover border border-gray-700"
					/>
				</div>

				<div className="flex gap-3">
					<button

						className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
						onClick={handleUpload}
					>
						Upload
					</button>

					<button

						className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
						onClick={() => setPreview("")}
					>
						Cancel
					</button>
				</div>
			</div>
		)}

	</div>
}