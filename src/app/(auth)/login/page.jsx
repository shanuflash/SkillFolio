"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import styles from "@/styles/login.module.css";

const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleSignin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data, error);
    if (data) {
      await supabase.from("student").insert({
        userid: data.user.id,
        data: {
          name: data.user.user_metadata.first_name || "",
          designation: "",
          description: "",
          address: "",
          phone: "",
          email: "",
          dob: "",
          socials: {
            linkedin: "",
            github: "",
          },
          education: [],
          skills: [],
          experience: [],
          projects: [],
          photo:
            "https://jvnstfpaokvohgpmuewa.supabase.co/storage/v1/object/public/images/default.svg",
        },
      });
      router.push("/profile");
    }
  };

  return (
    <div className={styles.Login}>
      <form className={styles.left} action={handleSignin}>
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
