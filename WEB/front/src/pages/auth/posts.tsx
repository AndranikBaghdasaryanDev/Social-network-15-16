import { useEffect, useRef, useState } from "react"
import type { IPosts, IPreviewPost } from "../../types"
import { Axios } from "../../lib/api"

export const Posts = () => {
	const [posts, setPosts] = useState<IPosts | null>()
	const [preview, setPreview] = useState(null)
	const [title, setTitle] = useState("")
	let picinput = useRef<HTMLInputElement>(null)
	const handlePreview = () => {
		if (picinput.current?.files) {
			const file = picinput.current.files[0]
			const reader = new FileReader()
			reader.onload = () => {
				setPreview({ image: reader.result as string, text: title })
			}
			reader.readAsDataURL(file)
		}
	}
	useEffect(() => {
		Axios
			.get("/posts")
			.then(response => {
				console.log(response.data.payload)
				setPosts(response.data.payload)
			})
	},[])
	const handleUpload = () => {
		if (picinput.current?.files) {
			const file = picinput.current.files[0]
			const form = new FormData()

			form.append("photo", file)
			form.append("content", title)

			Axios.post("/posts", form).then(response => {
				console.log(response.data.payload)
				setPreview(null)
				setTitle("")
				setPosts([...posts,{...response.data.payload}])
			})
		}
	}

	return (
		<div className="max-w-3xl mx-auto py-10 px-4 text-white">
			<h3 className="text-4xl font-bold mb-10 text-purple-400 text-center">
				Posts
			</h3>

			{/* --- Post Input Section and Image--- */}
			<div className="bg-gray-800 border border-gray-700 p-6 rounded-lg mb-12">
				<h4 className="text-xl font-semibold text-purple-300 mb-4">Create a Post</h4>

				<label className="block mb-2 text-sm text-gray-300">Post Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter title..."
					className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>
				<button type="button" className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors" onClick={() => picinput.current?.click()} > Choose a Picture for Post </button>
				<input type="file" ref={picinput} className="hidden" onChange={handlePreview}/>
			</div>
			{/*---preview---*/}
			{preview && (
				<div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md mb-8">
					{preview.image && (
						<img
							src={preview.image}
							alt="Preview"
							className="w-full h-full object-cover"
						/>
					)}
					<div className="flex gap-4 mt-4">
						<button
							type="button"
							className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
							onClick={handleUpload}
						>
							Upload
						</button>

						<button
							type="button"
							className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
							onClick={() => {
								setPreview(null)
								setTitle("")
								picinput = useRef<HTMLInputElement>(null)
							}}
						>
							Cancel
						</button>
					</div>

				</div>
			)}




			{/* --- Post Display Section --- */}
			{posts?.length === 0 ? (
				<p className="text-center text-gray-400">No posts available yet.</p>
			) : (
				<div className="space-y-9">
					{posts?.map((post) => (
						
						<div key={post.id}
							className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md transition hover:shadow-lg"
						>
							{post.picture && (
								<img
									src={import.meta.env.VITE_BASE + post.picture}
									alt="Post Image"
									className="w-40 h-40 object-cover"
								/>
							)}
							<div className="p-4">
								<p className="text-lg text-gray-100">{post.title}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
