"use client";
import styles from "./page.module.css";

import Link from "next/link";
import { BASE_URL } from "@/config";
import style from "@/styles/search.module.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState();

  const handleFetch = async (formData) => {
    const Searchname = formData?.get("name") || "";
    const response = await fetch(BASE_URL + "/api/users?name=" + Searchname, {
      cache: "no-store",
      credentials: "include",
      method: "GET",
    }).then((res) => res.json());
    const { userDetail } = await response;
    setData(userDetail);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className={styles.main}>
      <form className={style.search} action={handleFetch}>
        <input
          className={style.input}
          name="name"
          type="text"
          placeholder="Search name..."
          onChange={(e) => e.target.value == "" && handleFetch()}
        />
        <button type="submit" className={style.searchbtn}>
          Search
        </button>
      </form>
      {data?.map((student) => {
        if (student.name !== "your name") {
          return (
            <Link href={"profile/" + student.user} key={student.id}>
              <div className={styles.card}>
                <img src={student.photo} alt="student Image" />
                <div className={styles.content}>
                  <div className={styles.title}>{student?.name}</div>
                </div>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default Home;
