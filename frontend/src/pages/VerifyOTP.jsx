import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  
  const email = location.state?.email;

  if (!email) {
    navigate("/register");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResending(true);

    try {
      await api.post("/auth/resend-otp", { email });
      alert("OTP has been resent to your email");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Verify Your Email</h2>
        <p style={styles.subtitle}>
          Enter the code sent to <strong>{email}</strong>
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            required
            maxLength="6"
            style={styles.otpInput}
          />

          <button type="submit" disabled={loading || otp.length !== 6} style={styles.button}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div style={styles.resendContainer}>
          <p>Didn't get the code?</p>
          <button 
            onClick={handleResend} 
            disabled={resending}
            style={styles.resendBtn}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  box: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    marginBottom: "20px",
    fontSize: "14px",
  },
  otpInput: {
    width: "100%",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "2px solid #ddd",
    fontSize: "24px",
    textAlign: "center",
    letterSpacing: "10px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#ffebee",
    color: "#c62828",
    borderRadius: "5px",
  },
  resendContainer: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  resendBtn: {
    backgroundColor: "transparent",
    color: "#007bff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    textDecoration: "underline",
  },
};
