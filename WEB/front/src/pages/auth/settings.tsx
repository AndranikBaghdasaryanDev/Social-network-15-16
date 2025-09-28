import { ImagePicker } from "./InternalSettings/image-picker"
import { PublicOrPrivate } from "./InternalSettings/privateOrPublic"
import { UpdateLogin } from "./InternalSettings/update-login"
import { UpdatePassword } from "./InternalSettings/update-password"

export const Settings = () => {
	return (
		<div className="min-h-screenbg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
			<div className="max-w-5xl mx-auto">
				{/* Page Title */}
				<h1 className="text-3xl font-bold text-purple-400 mb-8 border-b border-gray-800 pb-3">
					Settings
				</h1>

				{/* Two-column layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Update Login */}
					<section className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
						<UpdateLogin />
					</section>

					{/* Update Password */}
					<section className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">

						<UpdatePassword />
					</section>
					<section className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">

						<ImagePicker />
					</section>
					<section className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">

						<PublicOrPrivate />
					</section>
				</div>
			</div>
		</div>
	)
}
