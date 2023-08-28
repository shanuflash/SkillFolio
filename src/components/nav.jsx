import styles from "@/styles/nav.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
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
        <Image
          src="/logo.webp"
          width={300}
          height={50}
          alt="Picture of the author"
        />
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
