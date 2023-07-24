"use client";
import styles from "@/styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config";

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    Email: "",
    Password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(BASE_URL + "/api/login", {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        Email: credentials.Email,
        Password: credentials.Password,
      }),
    });
    const data = await response.json();
    if (data.message == "User Found") {
      router.push("/profile");
    }
  };

  return (
    <div className={styles.Login}>
      <form className={styles.left} onSubmit={(e) => handleLogin(e)}>
        <div className={styles.info}>
          <span style={{ fontWeight: "800" }}>Login</span> to continue...
        </div>
        <div className={styles["input-master"]}>
          <div className={styles["input-container"]}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              className={`${styles.input} ${styles["input-misc"]}`}
              onChange={(e) =>
                setCredentials({ ...credentials, Email: e.target.value })
              }
              placeholder="Enter email"
            />
          </div>
          <div className={styles["input-container"]}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className={`${styles.input} ${styles["input-misc"]}`}
              onChange={(e) =>
                setCredentials({ ...credentials, Password: e.target.value })
              }
              placeholder="Enter password"
            />
          </div>
        </div>
        <div className={styles["button-container"]}>
          <button className={styles.signup} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
