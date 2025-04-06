import React from "react";
import "./AddUserForm.css";
import { NPButtonPrimary } from "@/modules/buttons";
import axiosClient from "@/util/axiosClient";

const AddUserForm = ({ refreshUsers }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");
    setLoading(true);

    try {
      const payload = { username, email, password };
      await axiosClient.post("/example_users/create_user", payload);
      setUsername("");
      setEmail("");
      setPassword("");
      setSuccess("Operation successful");
      refreshUsers();
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>

      <NPButtonPrimary type="submit" disabled={loading}>
        {loading ? "Adding…" : "Add User"}
      </NPButtonPrimary>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default AddUserForm;
