import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "@/styles/login.module.css";

const Login = async () => {
  const handleSignup = async (formData) => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(name, email, password);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: name,
        },
      },
    });
    console.log(data, error);
    if (!error) {
      const { error } = await supabase.from("student").insert({
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
      console.log(error);
      redirect("/");
    }
  };

  return (
    <div className={styles.Login}>
      <form className={styles.left} action={handleSignup}>
        <div className={styles.info}>
          <span style={{ fontWeight: "800" }}>Sign Up </span> to continue...
        </div>
        <div className={styles["input-master"]}>
          <div className={styles["input-container"]}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="name"
              className={`${styles.input} ${styles["input-misc"]}`}
              placeholder="Enter name"
            />
          </div>
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
