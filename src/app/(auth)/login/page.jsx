"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "@/styles/login.module.css";

const Login = () => {
  const router = useRouter();
  const handleSignin = async (formData) => {
    const supabase = createClientComponentClient();
    const email = formData.get("email");
    const password = formData.get("password");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) {
      router.push("/");
    }
  };

  return (
    <div className={styles.Login}>
      <form className={styles.left} data-aos="fade-right" action={handleSignin}>
        <div className={styles.info}>
          <span style={{ fontWeight: "800" }}>Login</span> or Sign up to
          continue...
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
          {/* <div className={styles.action}>
            Don't have an account?
            <Link className={styles["action-button"]} href="/signup">
              Signup
            </Link> */}
          {/* </div> */}
        </div>
      </form>
      <div className={styles.right} data-aos="zoom-in" data-aos-duration="600">
        <div className={styles.container}>
          <div className={styles.logo}>ShowStopper</div>
          <div className={styles["container-text"]}>
            Unlimited movies, TV shows and more. <br />
            Watch anywhere. Cancel anytime.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
