"use client";
import { useState } from "react";
import style from "@/styles/search.module.css";

const search = () => {
  const [Searchname, setSearchname] = useState();
  const handleSearch = () =>{
    console.log(Searchname);
  }
  return (
    <section className={style.search}>
      <input
        className={style.input}
        type="text"
        value={Searchname}
        onChange={(e) => setSearchname(e.target.value)}
      />
      <button className={style.searchbtn} onClick={handleSearch}>Search</button>
    </section>
  );
};

export default search;
