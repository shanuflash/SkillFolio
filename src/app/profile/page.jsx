"use client";
import styles from "@/styles/profile.module.css";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const page = () => {
  const supabase = createClientComponentClient();
  const [data, setData] = useState({});
  const [id, setId] = useState(-1);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    const {
      data: {
        session: {
          user: { id },
        },
      },
    } = await supabase.auth.getSession();
    const {
      data: [{ data: student }],
    } = await supabase.from("student").select("data").eq("userid", id);
    setData(student);
    setId(id);
  };

  const handleChange = (e, name) => {
    setData((prev) => ({ ...prev, [name]: e.target.innerText }));
  };

  const handleChangeObj = (e, name) => {
    const key = name.split("."); //socials linkedin
    setData((prev) => ({
      ...prev,
      [key[0]]: { ...prev[key[0]], [key[1]]: e.target.innerText },
    }));
  };

  const handleChangeObjIndex = (e, name, i) => {
    const key = name.split(".");
    const test = data[key[0]];
    test[i][key[1]] = e.target.innerText;
    setData((prev) => ({ ...prev, [key[0]]: test }));
  };

  const handleEdit = async () => {
    setEdit((prev) => !prev);
    if (edit) {
      const { error } = await supabase
        .from("student")
        .update({ data: data })
        .eq("userid", id);
      console.log(error);
    }
    //TODO: prevent changes if no changes
  };

  return (
    <div className={styles.profile}>
      <div className={styles.head}>
        <div className={styles.photo}>
          <img src="/212220220044.jpg" alt="profile picture" />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>
            {data?.name || "your name"}{" "}
            <span
              className={styles.profession}
              contentEditable={edit}
              dangerouslySetInnerHTML={{
                __html: data?.designation || "your designation",
              }}
              onBlur={(e) => handleChange(e, "designation")}
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
            <div className={styles.item}>
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              {/* <a
                href={"https://www.linkedin.com/in/" + data?.socials?.linkedin}
                target="_blank"
              >
                {data?.socials?.linkedin}
              </a> */}
              <span
                contentEditable={edit}
                dangerouslySetInnerHTML={{
                  __html: data?.socials?.linkedin || "your linkedin",
                }}
                onBlur={(e) => handleChangeObj(e, "socials.linkedin")}
              />
            </div>
            <div className={styles.item}>
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {/* <a
                href={"https://github.com/" + data?.socials?.github}
                target="_blank"
              >
                {data?.socials?.github}
              </a> */}
              <span
                contentEditable={edit}
                dangerouslySetInnerHTML={{
                  __html: data?.socials?.github || "your github",
                }}
                onBlur={(e) => handleChangeObj(e, "socials.github")}
              />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.title}>Education</div>
            {data?.education?.length == 0 && (
              <>No education found! edit profile to add.</>
            )}
            {data?.education?.map((item, index) => (
              <div className={styles.item} key={index}>
                <span
                  contentEditable={edit}
                  dangerouslySetInnerHTML={{
                    __html: item.name || "education name",
                  }}
                  onBlur={(e) =>
                    handleChangeObjIndex(e, "education.name", index)
                  }
                />
                <span
                  contentEditable={edit}
                  dangerouslySetInnerHTML={{
                    __html: item.description || "year and grades",
                  }}
                  onBlur={(e) =>
                    handleChangeObjIndex(e, "education.description", index)
                  }
                />
              </div>
            ))}
            <button
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  education: [
                    ...prev.education,
                    { name: "education name", description: "year and grades" },
                  ],
                }))
              }
              hidden={!edit}
            >
              Add Education
            </button>
          </div>
          <div className={styles.section}>
            <div className={styles.title}>Skills</div>
            <input type="text" value="Work in Progress" />
            {data?.skills?.length == 0 && (
              <>No skills found! edit profile to add.</>
            )}
            {data?.skills?.map((item) => (
              <div className={styles["skill-item-card"]}>{item}</div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <div className={`${styles.section} ${styles.projects}`}>
            <div className={styles.title}>Projects</div>
            {data?.projects?.length == 0 && (
              <>No projetcs found! edit profile to add.</>
            )}
            {data?.projects?.map((item, index) => (
              <div className={styles.item}>
                <span
                  className={styles.name}
                  contentEditable={edit}
                  dangerouslySetInnerHTML={{
                    __html: item.name || "projects name",
                  }}
                  onBlur={(e) =>
                    handleChangeObjIndex(e, "projects.name", index)
                  }
                />
                <span
                  className={styles.description}
                  contentEditable={edit}
                  dangerouslySetInnerHTML={{
                    __html: item.description || "project description",
                  }}
                  onBlur={(e) =>
                    handleChangeObjIndex(e, "projects.description", index)
                  }
                />
                <span
                  className={styles.link}
                  contentEditable={edit}
                  dangerouslySetInnerHTML={{
                    __html: item.link || "project link",
                  }}
                  onBlur={(e) =>
                    handleChangeObjIndex(e, "projects.link", index)
                  }
                />
                {/* <a href={item?.link} target="_blank">
                  {item?.link}
                </a> */}
              </div>
            ))}
            <button
              hidden={!edit}
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  projects: [
                    ...prev.projects,
                    {
                      name: "projects name",
                      description: "project description",
                      link: "project link",
                    },
                  ],
                }))
              }
            >
              Add Project
            </button>
          </div>
          <div className={`${styles.section} ${styles.experience}`}>
            <div className={styles.title}>Experience</div>
            {data?.experience?.length == 0 && (
              <>No experiences found! edit profile to add.</>
            )}
            {data?.experience?.map((item) => (
              <div className={styles.item}>
                <span
                  className={styles.name}
                  contentEditable={edit}
                  dangerouslySetInnerHTML={{
                    __html: item.name || "experience name",
                  }}
                  onBlur={(e) =>
                    handleChangeObjIndex(e, "experience.name", index)
                  }
                />
                <span
                  className={styles.description}
                  contentEditable={edit}
                  dangerouslySetInnerHTML={{
                    __html: item.description || "description",
                  }}
                  onBlur={(e) =>
                    handleChangeObjIndex(e, "experience.description", index)
                  }
                />
              </div>
            ))}
            <button
              hidden={!edit}
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  experience: [
                    ...prev.experience,
                    { name: "experience name", description: "description" },
                  ],
                }))
              }
            >
              Add Experience
            </button>
          </div>
        </div>
      </div>
      <button onClick={() => handleEdit()} className={styles.float}>
        {edit ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default page;
