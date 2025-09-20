import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export const Users = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		axios.get("http://localhost:4002/users")
			.then(users => setUsers(users.data))
	}, [])

	return (
		<div className="users-container">
			<h2 className="users-heading">Users</h2>
			<table className="custom-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Details</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>
								<Link to={`/users/${user.id}`} className="details-link">
									View
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
