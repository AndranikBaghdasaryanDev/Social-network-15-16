import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { IResponse, IUser } from "../../types";

export const Layout = () => {
	const [account,setAccount] = useState<IUser | null>(null)
	const navigate = useNavigate()
	useEffect(() => {
		Axios.get<IResponse>("/verify")
			.then(response => {
				setAccount(response.data.payload as IUser)
			})
			.catch(() => {
				navigate("/login")
			})
	},[])
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
			<header className="border-b border-gray-700">
				<nav className="flex items-center justify-between px-6 py-4">
					<h1 className="text-3xl font-bold text-purple-400">Social network</h1>
					<ul className="flex space-x-6 text-lg">
						<li>
							<NavLink
								to=""
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/followers"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								Followers
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/posts"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "null"
								}
							>
								Posts
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/followings"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								Followings
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/settings"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								Settings
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>

			<main className="p-6">
				<Outlet context={{account,setAccount}}/>
			</main>
		</div>
	);
};
