"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { BASE_URL } from "@/config";
import style from "@/styles/search.module.css";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Select from "react-select";
import skillData from "@/skillData";
import Image from "next/image";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [isMobile, setisMobile] = useState(false);

  const handleSearch = async (formData) => {
    const Searchname = formData?.get("name") || "";
    const response = await fetch(BASE_URL + `/api/users?name=${Searchname}`, {
      body: JSON.stringify(filter),
      cache: "no-store",
      credentials: "include",
      method: "POST",
    }).then((res) => res.json());
    const { userDetail } = await response;
    setData(userDetail.sort((a, b) => a.name.localeCompare(b.name)));
    setLoading(false);
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setisMobile(true);
    }
    handleSearch();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.college}>
        <div className={styles.title}>
          DEPARTMENT OF INFORMATION TECHNOLOGY ✦ 2020-2024
        </div>
      </div>
      <form className={style.search} action={handleSearch}>
        <input
          className={style.input}
          name="name"
          type="text"
          placeholder="Search name..."
          onChange={(e) => e.target.value == "" && handleSearch()}
        />
        {!isMobile && (
          <Select
            options={skillData}
            defaultValue={
              data?.skills?.map((item) => ({
                value: item,
                label: item,
              })) || null
            }
            isMulti
            onChange={(e) => {
              setFilter(e.map((item) => item.value));
            }}
            placeholder="Search skills..."
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#4c3dbd",
                width: isMobile ? "20vw" : "20vw",
                height: isMobile ? "4vh" : "6vh",
                border: "none",
                borderRadius: "0",
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
              indicatorsContainer: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#3903b8",
                width: isMobile ? "4vw" : null,
                height: isMobile ? "4vw" : null,
              }),
              indicatorSeparator: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#3903b8",
              }),
              placeholder: (baseStyles, state) => ({
                ...baseStyles,
                color: "white",
              }),
            }}
          />
        )}
        <button type="submit" className={style.searchbtn}>
          Search
        </button>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.profiles}>
          {data?.map((student) => {
            if (student.name !== "your name") {
              return (
                <Link href={"profile/" + student._id} key={student._id}>
                  <div className={styles.card}>
                    <img src={student.photo} alt="student Image" />
                    <div className={styles.content}>
                      <div className={styles.title}>{student?.name}</div>
                      <div className={styles.regNo}>
                        {student.regNo === "your Regestration Number" ||
                        student.regNo === "Enter your Regestration Number"
                          ? null
                          : student?.regNo}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
