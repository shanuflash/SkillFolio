import styles from "@/styles/nav.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const nav = async () => {
  const handleLogout = async () => {
    "use server";
    cookies().set("token", null);
    redirect("/");
  };

  return (
    <div className={styles.nav}>
      <Link href="/" className={styles.logo}>
        SkillFolio
      </Link>
      <div className={styles.user}>
        <form action={handleLogout}>
          <button className={styles.logout} type="submit">
            Log out
          </button>
        </form>
        <Link href="/profile" className={styles.profile}>
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default nav;
