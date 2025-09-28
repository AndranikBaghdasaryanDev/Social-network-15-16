import { useNavigate, useOutletContext } from "react-router-dom";
import type { IContext } from "../../types";
import { Axios } from "../../lib/api";


export const Profile = () => {
	const { account } = useOutletContext<IContext>()
	const navigate = useNavigate()
	const handleLogout = () => {
		Axios.post("/logout")
		.then(() => navigate("/login"))
	}
	console.log(account)
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
			<div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-8 flex flex-col items-center space-y-4">
				<img
					src={account?.picture ? import.meta.env.VITE_BASE + account.picture: import.meta.env.VITE_DEFAULT_PIC}
					alt="John Smith"
					className="w-28 h-28 rounded-full border-4 border-purple-600 shadow-md"
				/>
				<h2 className="text-2xl font-bold text-white">{account?.name} {account?.surname}</h2>
				<p className="text-sm text-gray-400">{account?.name}{account?.surname}</p>
				{account?.isPrivate ? (
					<p className="inline-block px-3 py-1 text-sm font-medium text-red-400 bg-red-900 bg-opacity-30 rounded-full">
						Private
					</p>
				) : (
					<p className="inline-block px-3 py-1 text-sm font-medium text-green-400 bg-green-900 bg-opacity-30 rounded-full">
						Public
					</p>
				)}

				<div className="mt-6 w-full">
					<div className="bg-gray-800 rounded-md p-4 text-gray-300 space-y-2">
						<p><span className="font-semibold text-gray-200">Email:</span> john.smith@example.com</p>
						<p><span className="font-semibold text-gray-200">Joined:</span> January 1, 2023</p>
						<p><span className="font-semibold text-gray-200">Bio:</span> Just another React developer trying to make the web a better place.</p>
					</div>
				</div>

				<button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
					Edit Profile
				</button>
				<button onClick={handleLogout} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
					Log out
				</button>
			</div>
		</div>
	);
};
