import styles from "./page.module.css";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const Home = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("student").select("*");
  return (
    <div className={styles.main}>
      {data.map((student) => {
        return (
          <Link href={"profile/" + student.userid}>
            <div className={styles.card}>
              <img src={student.img} alt="" />
              <div className={styles.content}>
                <div className={styles.title}>{student.data.name}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
