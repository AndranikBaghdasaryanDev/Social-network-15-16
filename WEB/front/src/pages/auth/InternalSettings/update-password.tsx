import { useForm, type SubmitHandler } from "react-hook-form"
import type { IResponse, IUpdatePassword } from "../../../types"
import { Axios } from "../../../lib/api"
import { useState } from "react"

export const UpdatePassword = () => {
	const {register,handleSubmit,formState:{errors},reset} = useForm<IUpdatePassword>()
	const [success,setSucces] = useState(null)
	const [fail,setFail] = useState(null)
	const handleSave:SubmitHandler<IResponse | unknown> = (data) => {
		Axios
		.patch('/update/password',data)
		.then(response => {
			 setSucces(response.data.message)
			 setFail(null)
		})
		.catch(response => {
			setFail(response.response.data.message)
		})
	}
	return (
		<>
			<h1 className="text-xl font-semibold text-purple-400 mb-4">
				Update Password
			</h1>

			{success && (
				<p className="mb-4 text-sm text-green-500 font-medium bg-green-900 bg-opacity-30 px-4 py-2 rounded-lg">
					{success}
				</p>
			)}
			{fail && (
				<p className="mb-4 text-sm text-red-500 font-medium bg-red-900 bg-opacity-30 px-4 py-2 rounded-lg">
					{fail}
				</p>
			)}
			<form onSubmit={handleSubmit(handleSave)} className="space-y-4">
				{/* Old password */}
				<div>
					{errors.oldPassword && (
						<p className="mt-1 text-sm text-red-500 font-medium">
							{errors.oldPassword.message}
						</p>
					)}
					<label className="block text-gray-300 text-sm mb-1">Old Password</label>
					<input
						{...register("oldPassword",{required:"Please inout your Old Password"})}
						type="text"
						placeholder="Enter new login"
						className="w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				{/* New Password */}
				<div>
					{errors.newPassword && (
						<p className="mt-1 text-sm text-red-500 font-medium">
							{errors.newPassword.message}
						</p>
					)}
					<label className="block text-gray-300 text-sm mb-1">New Password</label>
					<input
						{...register("newPassword",{required:"Please input your New Password"})}
						type="password"
						placeholder="Enter your password"
						className="w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
				>
					Save
				</button>
			</form>
		</>
	)
}
