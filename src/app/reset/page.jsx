"use client";
import styles from "@/styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config";
import { toast } from "react-toastify";

const reset = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    Email: "",
    Password: "",
    newPassword: "",
  });
  const handleReset = async (e) => {
    e.preventDefault();
    const response = await fetch(BASE_URL + "/api/reset", {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        Email: credentials.Email,
        Password: credentials.Password,
        newPassword: credentials.newPassword,
      }),
    });
    const data = await response.json();
    if (response.status > 399 && response.status < 499) {
      toast.error(data?.message, { autoClose: 3000 });
    } else {
      toast(data?.message, { autoClose: 1000 });
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <div className={styles.Login}>
      <form className={styles.left} onSubmit={(e) => handleReset(e)}>
        <div className={styles.info}>
          <span style={{ fontWeight: "800" }}>Login</span> to continue...
        </div>
        <div className={styles["input-master"]}>
          <div className={styles["input-container"]}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
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
              onChange={(e) =>
                setCredentials({ ...credentials, Password: e.target.value })
              }
              placeholder="Enter password"
            />
          </div>
          <div className={styles["input-container"]}>
            <label htmlFor="password">New Password</label>
            <input
              name="newpassword"
              type="password"
              onChange={(e) =>
                setCredentials({ ...credentials, newPassword: e.target.value })
              }
              placeholder="New password"
            />
          </div>
        </div>
        <div className={styles["button-container"]}>
          <button className={styles.signup} type="submit">
            Password Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default reset;
