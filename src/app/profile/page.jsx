"use client";
import styles from "@/styles/profile.module.css";
import Section from "@/components/profile/section";
import { useEffect, useState } from "react";
import _ from "lodash";
import { BASE_URL } from "@/config";
import userId from "@/components/userId";
import { toast } from "react-toastify";
import skillData from "@/skillData";
import Select from "react-select";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [id, setId] = useState(-1);
  const [photo, setPhoto] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    if (photo) {
      uploadImg();
    }
  }, [edit == false]);

  const uploadImg = async () => {
    const formData = new FormData();
    formData.append("file", photo);
    setPhoto(null);
    const response = fetch(BASE_URL + `/api/users/image/${id}`, {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: formData,
    });
    toast.promise(response, {
      pending: "Uploading image...",
      success: "Image Uploaded!",
      error: "Upload Failed!",
    });
    const { secure_url } =
      (await response.then((response) => response.json())) || {};

    if (secure_url) {
      setData((prev) => ({
        ...prev,
        photo: secure_url,
      }));
    }
  };

  const handleData = async () => {
    const id = await userId();
    setId(id);
    const response = await fetch(BASE_URL + `/api/users/${id}`, {
      cache: "no-store",
      credentials: "include",
      method: "GET",
    });
    var res = await response.json();
    if (response.status == 404) {
      const response = await fetch(BASE_URL + `/api/users/${id}`, {
        cache: "no-store",
        credentials: "include",
        method: "POST",
      });
      res = await response.json();
    } else if (response.status > 499) {
      toast.error(res.message);
    }
    setData(res.userDetail);
    setOriginalData(JSON.parse(JSON.stringify(res.userDetail)));
    setLoading(false);
  };

  const handleChange = (e, name) => {
    setData((prev) => ({
      ...prev,
      [name]: e.target.innerText.replace(/(<([^>]+)>)/gi, ""),
    }));
  };

  const handleChangeObj = (e, name) => {
    const key = name.split(".");
    setData((prev) => ({
      ...prev,
      [key[0]]: {
        ...prev[key[0]],
        [key[1]]: e.target.innerText.replace(/(<([^>]+)>)/gi, ""),
      },
    }));
  };

  const handleChangeObjIndex = (e, name, i) => {
    const key = name.split(".");
    const test = data[key[0]];
    test[i][key[1]] = e.target.innerText.replace(/(<([^>]+)>)/gi, "");
    setData((prev) => ({ ...prev, [key[0]]: test }));
  };

  const handleEdit = async () => {
    setEdit((prev) => !prev);
    if (edit && _.isEqual(data, originalData) == false) {
      const response = await fetch(BASE_URL + `/api/users/${id}`, {
        cache: "no-store",
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(data),
      });
      const { message } = await response.json();
      if (response.status == 200) {
        toast(message, { autoClose: 1500 });
        setOriginalData(JSON.parse(JSON.stringify(data)));
      } else if (response.status > 499) {
        toast.error(message);
      }
    }
  };

  const handleDelete = (index, name) => {
    setData((prev) => ({
      ...prev,
      [name]: prev[name].filter((item, i) => i != index),
    }));
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <div className={styles.text}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.disclaimer}>
        Use the edit button to edit your profile. Don't forget to save!
      </div>
      <div className={styles.head}>
        <div className={styles.photo}>
          {data?.photo ? (
            <img src={data?.photo} alt="profile picture" />
          ) : (
            <div className={styles.uploadimg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="233.33"
                height="300"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 22q-.825 0-1.413-.588T2 20v-4h2v4h4v2H4ZM2 8V4q0-.825.588-1.413T4 2h4v2H4v4H2Zm14 14v-2h4v-4h2v4q0 .825-.588 1.413T20 22h-4Zm4-14V4h-4V2h4q.825 0 1.413.588T22 4v4h-2Zm-8 4q-1.275 0-2.138-.863T9 9q0-1.25.863-2.125T12 6q1.25 0 2.125.875T15 9q0 1.275-.875 2.138T12 12Zm-6 6v-1.9q0-.525.263-.988t.712-.737q1.15-.675 2.413-1.025T12 13q1.35 0 2.613.35t2.412 1.025q.45.275.713.738T18 16.1V18H6Z"
                />
              </svg>
            </div>
          )}
          {edit && (
            <div className={styles.upimg}>
              <button className={styles.uploadinput}>
                <label
                  style={{
                    cursor: "pointer",
                  }}
                  htmlFor="img"
                >
                  Upload Image
                </label>
              </button>
              <input
                hidden
                type="file"
                name="img"
                id="img"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.name}>
            <span
              className={styles.name}
              contentEditable={edit}
              dangerouslySetInnerHTML={{
                __html: data?.name || "your name",
              }}
              onBlur={(e) => handleChange(e, "name")}
            />{" "}
            <span
              className={styles.profession}
              contentEditable={edit}
              dangerouslySetInnerHTML={{
                __html: data?.designation || "your designation",
              }}
              onBlur={(e) => handleChange(e, "designation")}
            />
            <div
              className={styles.regNo}
              contentEditable={edit}
              dangerouslySetInnerHTML={{
                __html: data?.regNo || "Enter your Regestration Number",
              }}
              onBlur={(e) => handleChange(e, "regNo")}
            />
          </div>
          <div
            className={styles.description}
            contentEditable={edit}
            dangerouslySetInnerHTML={{
              __html: data?.description || "your description",
            }}
            onBlur={(e) => handleChange(e, "description")}
          />
          <div className={styles.contact}>
            <div className={styles.item}>
              Address:{" "}
              <span
                contentEditable={edit}
                dangerouslySetInnerHTML={{
                  __html: data?.address || "your address",
                }}
                onBlur={(e) => handleChange(e, "address")}
              />
            </div>
            <div className={styles.item}>
              Phone:{" "}
              <span
                contentEditable={edit}
                dangerouslySetInnerHTML={{
                  __html: data?.phone || "your phone",
                }}
                onBlur={(e) => handleChange(e, "phone")}
              />
            </div>
            <div className={styles.item}>
              Email:{" "}
              <span
                contentEditable={edit}
                dangerouslySetInnerHTML={{
                  __html: data?.email || "your email",
                }}
                onBlur={(e) => handleChange(e, "email")}
              />
            </div>
            <div className={styles.item}>
              Date of Birth:{" "}
              <span
                contentEditable={edit}
                dangerouslySetInnerHTML={{
                  __html: data?.dob || "your dob",
                }}
                onBlur={(e) => handleChange(e, "dob")}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={`${styles.section} ${styles.social}`}>
            <div className={styles.title}>Socials</div>
            <a
              target="_blank"
              href={
                edit
                  ? null
                  : "https://www.linkedin.com/in/" + data?.socials?.linkedin
              }
              className={styles.item}
            >
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span
                contentEditable={edit}
                dangerouslySetInnerHTML={{
                  __html: data?.socials?.linkedin || "your linkedin",
                }}
                onBlur={(e) => handleChangeObj(e, "socials.linkedin")}
              />
            </a>
            <a
              target="_blank"
              href={edit ? null : "https://github.com/" + data?.socials?.github}
              className={styles.item}
            >
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span
                contentEditable={edit}
                dangerouslySetInnerHTML={{
                  __html: data?.socials?.github || "your github",
                }}
                onBlur={(e) => handleChangeObj(e, "socials.github")}
              />
            </a>
          </div>
          <Section
            name="education"
            data={data?.education}
            {...{ setData, handleChangeObjIndex, handleDelete, edit }}
          />
          <div className={`${styles.section} ${styles.skills}`}>
            <div className={styles.title}>Skills</div>
            {edit && (
              <Select
                options={skillData}
                defaultValue={data?.skills?.map((item) => ({
                  value: item,
                  label: item,
                }))}
                isMulti
                isDisabled={!edit}
                onChange={(e) => {
                  setData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        skills: e.map((item) => item.value),
                      })
                  );
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
            )}
            {data?.skills?.length == 0 && (
              <>No skills found! edit profile to add.</>
            )}
            <div className={styles["skill-item-card-container"]}>
              {data?.skills?.map((item, index) => (
                <div key={index} className={styles["skill-item-card"]}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Section
            name="projects"
            data={data?.projects}
            {...{ setData, handleChangeObjIndex, handleDelete, edit }}
          />
          <Section
            name="experience"
            data={data?.experience}
            {...{ setData, handleChangeObjIndex, handleDelete, edit }}
          />
          <Section
            name="certificates"
            data={data?.certificates}
            {...{ setData, handleChangeObjIndex, handleDelete, edit }}
          />
          <Section
            name="languages"
            data={data?.languages}
            {...{ setData, handleChangeObjIndex, handleDelete, edit }}
          />
        </div>
      </div>
      <button onClick={() => handleEdit()} className={styles.float}>
        {edit ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default page;
