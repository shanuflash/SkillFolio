import styles from "@/styles/nav.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const nav = async () => {
  const { value } = cookies().get("token") || {};
  const handleLogout = async () => {
    "use server";
    cookies().set("token", null);
    redirect("/login");
  };

  return (
    <div className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <span>SkillFolio</span>
        <span style={{ fontSize: "1rem" }}>by</span>
        <img
          style={{ height: "auto", width: "175px" }}
          src="/logo.png"
          alt="Picture of the author"
        />
        {/* <img
          style={{ height: "auto", width: "175px" }}
          src="/logo.png"
          alt="Picture of the author"
        />
        <span>{"✦"} SkillFolio</span> */}
      </Link>
      <div className={styles.user}>
        <form action={handleLogout}>
          <button className={styles.logout} type="submit">
            {value && "Log out"}
          </button>
        </form>
        <Link
          href={`
          ${value ? "/profile" : "/login"}
        `}
          className={styles.profile}
        >
          {value ? "My Profile" : "Login"}
        </Link>
      </div>
    </div>
  );
};

export default nav;
