import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddUsers = () => {
  const { register, handleSubmit,formState:{errors}} = useForm();
	const navigate = useNavigate()
  const onSubmit = (data) => {
    axios.post(`http://localhost:4002/users`,data)
	data = {}
	navigate("/")
  };
  
  return (
    <div className="add-user-container">
      <div className="add-user-card">
        <h1>Add New User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
			{errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              {...register("name", { required: "Input Name"})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
			{errors.email && <p style={{color:"red"}}>{errors.email.message}s</p>}
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              {...register("email", { required: "Input Email" })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
			{errors.role && <p style={{color:"red"}}>{errors.role.message}s</p>}
            <select id="role" {...register("role", { required: "Select Role" })}>
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
};
