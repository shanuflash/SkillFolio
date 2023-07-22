import styles from "./page.module.css";
import Link from "next/link";

const Home = async () => {
  const response = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
    credentials: "include",
    method: "GET",
  });
  const { userDetail: data } = await response.json();
  return (
    <div className={styles.main}>
      {data.map((student) => {
        return (
          <Link href={"profile/" + student.user}>
            <div className={styles.card}>
              <img src={student.img} alt="" />
              <div className={styles.content}>
                <div className={styles.title}>{student?.name}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
