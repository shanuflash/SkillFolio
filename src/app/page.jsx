"use client";
import styles from "./page.module.css";

import Link from "next/link";
import { BASE_URL } from "@/config";
import style from "@/styles/search.module.css";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Select from "react-select";
import skillData from "@/skillData";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const handleFilter = async (e) => {
    const response = await fetch(BASE_URL + "/api/users", {
      body: JSON.stringify(filter),
      cache: "no-store",
      credentials: "include",
      method: "POST",
    });
    const { userDetail } = await response.json();
    setData(userDetail);
    setLoading(false);
  };

  const handleSearch = async (formData) => {
    const Searchname = formData?.get("name") || "";
    const response = await fetch(BASE_URL + "/api/users?name=" + Searchname, {
      cache: "no-store",
      credentials: "include",
      method: "GET",
    }).then((res) => res.json());
    const { userDetail } = await response;
    setData(userDetail);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className={styles.main}>
      <form className={style.search} action={handleFilter}>
        <input
          className={style.input}
          name="name"
          type="text"
          placeholder="Search name..."
          onChange={(e) => e.target.value == "" && handleSearch()}
        />
        <Select
          options={skillData}
          defaultValue={data?.skills?.map((item) => ({
            value: item,
            label: item,
          }))}
          isMulti
          onChange={(e) => {
            setFilter(e.map((item) => item.value));
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "black",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "black",
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "black",
            }),
            multiValueLabel: (baseStyles, state) => ({
              ...baseStyles,
              color: "white",
            }),
            multiValue: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#3903b8",
            }),
          }}
        />
        <button type="submit" className={style.searchbtn}>
          Search
        </button>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Home;
