import styles from "./page.module.css";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const Home = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("student").select("*");
  return (
    <div className={styles.main}>
      {data.map((student) => {
        return (
          <div className={styles.card}>
            <img src={student.img} alt="" />
            <div className={styles.content}>
              <div className={styles.title}>{student.data.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
