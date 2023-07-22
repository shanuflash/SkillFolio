import styles from "@/styles/login.module.css";

const Login = async () => {
  const handleLogin = async (formData) => {
    "use server";
    const Email = formData.get("email");
    const Password = formData.get("password");
    const response = await fetch("http://localhost:3000/auth/login", {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        Email: Email,
        Password: Password,
      }),
    });
    const data = await response.json();
  };

  return (
    <div className={styles.Login}>
      <form className={styles.left} action={handleLogin}>
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
              placeholder="Enter email"
            />
          </div>
          <div className={styles["input-container"]}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className={`${styles.input} ${styles["input-misc"]}`}
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
