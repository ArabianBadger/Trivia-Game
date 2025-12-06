import QuestionsList from "../components/QuestionsList";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin - Manage Questions</h1>
      {user && (
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Logged in as: <strong>{user.username}</strong> ({user.role})
        </p>
      )}
      <QuestionsList />
    </div>
  );
}
