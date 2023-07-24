// "use client";
// import { BASE_URL } from "@/config";
// import styles from "@/styles/login.module.css";
// import { useState } from "react";

const Login = () => {
  // const [credentials, setCredentials] = useState({
  //   Email: "",
  //   Password: "",
  // });
  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch(BASE_URL + "/api/login", {
  //     cache: "no-store",
  //     credentials: "include",
  //     method: "POST",
  //     body: JSON.stringify({
  //       Email: credentials.Email,
  //       Password: credentials.Password,
  //     }),
  //   });
  // };

  return (
    <>Disabled</>
    // <div className={styles.Login}>
    //   <form className={styles.left} onSubmit={(e) => handleSignup(e)}>
    //     <div className={styles.info}>
    //       <span style={{ fontWeight: "800" }}>Sign Up </span> to continue...
    //     </div>
    //     <div className={styles["input-master"]}>
    //       <div className={styles["input-container"]}>
    //         <label htmlFor="email">Email</label>
    //         <input
    //           name="email"
    //           type="email"
    //           className={`${styles.input} ${styles["input-misc"]}`}
    //           onChange={(e) =>
    //             setCredentials({ ...credentials, Email: e.target.value })
    //           }
    //           placeholder="Enter email"
    //         />
    //       </div>
    //       <div className={styles["input-container"]}>
    //         <label htmlFor="password">Password</label>
    //         <input
    //           name="password"
    //           type="password"
    //           className={`${styles.input} ${styles["input-misc"]}`}
    //           onChange={(e) =>
    //             setCredentials({ ...credentials, Password: e.target.value })
    //           }
    //           placeholder="Enter password"
    //         />
    //       </div>
    //     </div>
    //     <div className={styles["button-container"]}>
    //       <button className={styles.signup} type="submit">
    //         Login
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Login;
