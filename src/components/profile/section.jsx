"use client";
import styles from "@/styles/profile.module.css";
import _ from "lodash";

const section = ({
  setData,
  handleChangeObjIndex,
  handleDelete,
  data,
  edit,
  name,
}) => {
  const createNew = () => {
    switch (name) {
      case "projects":
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
        }));
        break;
      case "experience":
        setData((prev) => ({
          ...prev,
          experience: [
            ...prev.experience,
            { name: "experience name", description: "description" },
          ],
        }));
        break;
      case "certificates":
        setData((prev) => ({
          ...prev,
          certificates: [
            ...prev.certificates,
            { name: "certificate name", description: "certificate url" },
          ],
        }));
        break;
      case "education":
        setData((prev) => ({
          ...prev,
          education: [
            ...prev.education,
            { name: "education name", description: "year and grades" },
          ],
        }));
        break;
      case "languages":
        setData((prev) => ({
          ...prev,
          languages: [
            ...prev.languages,
            { name: "Languages name", description: "[Read, Write, Speak]" },
          ],
        }));
        break;

      default:
        break;
    }
  };
  return (
    <div className={`${styles.section} ${styles[name.toLowerCase()]}`}>
      <div className={styles.title}>{name}</div>
      {!data || data.length === 0 ? (
        <div className={styles.empty}>
          No {name} found! edit profile to add.
        </div>
      ) : null}
      {data?.map((item, index) => (
        <div className={styles.item} key={index}>
          <span
            className={styles.name}
            contentEditable={edit}
            dangerouslySetInnerHTML={{
              __html: item.name || `${name} name`,
            }}
            onBlur={(e) => handleChangeObjIndex(e, `${name}.name`, index)}
          />
          <span
            className={styles.description}
            contentEditable={edit}
            dangerouslySetInnerHTML={{
              __html: item.description || `${name} description`,
            }}
            onBlur={(e) =>
              handleChangeObjIndex(e, `${name}.description`, index)
            }
          />
          {edit && (
            <button
              className={styles.delete}
              onClick={() => handleDelete(index, name.toLowerCase())}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <button hidden={!edit} onClick={() => createNew()}>
        Add {name}
      </button>
    </div>
  );
};

export default section;
