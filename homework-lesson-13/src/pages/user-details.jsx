import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const UserDetails = () => {
	const {id} = useParams()
	const [user,setUser] = useState(null)
	useEffect(() => {
		axios.get(`http://localhost:4002/users/` + id)
		.then(res => setUser(res.data))
	},[id])
	console.log(user)
	return <>
		{user ? <div className="user-details-container">
			<div className="user-card">
				<h1>User Details</h1>
				<h3>User Name: {user.name}</h3>
				<h4>Email: {user.email}</h4>
				<h5>Role: {user.role}</h5>
				<h2>ID: {user.id}</h2>
			</div>
		</div> : <div className="user-details-container">
			<div className="user-card">
				<h1>Not Found</h1>
				
			</div>
		</div>}
	</>
}