import { useNavigate, useOutletContext } from "react-router-dom"
import { Axios } from "../../../lib/api"
import type { IContext } from "../../../types"

export const PublicOrPrivate = () => {
	const { account, setAccount } = useOutletContext<IContext>()
	const navigate = useNavigate()
	const handlePublicOrPrivate = () => {
		Axios
			.patch("/account/set")
			.then(response => {
				setAccount({ ...account, isPrivate: response.data.payload })
				navigate("/profile")
			})
	}

	return (
		<div className="flex justify-center mt-6">
			<button
				onClick={handlePublicOrPrivate}
				className="hover:scale-199 transition-transform"
			>
				<img
					src={
						account?.isPrivate
							? import.meta.env.VITE_PRIVATE_PIC
							: import.meta.env.VITE_PUBLIC_PIC
					}
					alt={account?.isPrivate ? "Private Mode" : "Public Mode"}
					className="w-15 h-15 rounded-full border-2 border-purple-500"
				/>
			</button>
		</div>
	)
}
