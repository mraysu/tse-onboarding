import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Page, Button } from "src/components";
import { type Task, getTask } from "src/api/tasks";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    // obtain task from id
    getTask(id as string).then((result) => {
      if (result.success) {
        setTask(result.data);
      } else {
        throw result.error;
      }
    });
  }, [id]);

  if (task === null) {
    return (
      <Page>
        <Helmet>
          <title> NoTask | TSE Todos</title>
        </Helmet>
        <div className={styles.title}>
          <p>This task does not exist!</p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Helmet>
        <title>{task.title + " | TSE Todos"}</title>
      </Helmet>
      <Link to="/">Back to Home</Link>

      <div className={styles.headerRow}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>{task.title}</span>
        </div>
        <Button
          kind="primary"
          type="button"
          data-testid="task-edit-button"
          label="Edit Task"
          disabled={false}
          //onClick={}
        />
      </div>
      {/*Description*/}
      <div className={styles.descriptionContainer}>
        <span className={styles.description}>
          {task.description ? task.description : "(No Description)"}
        </span>
      </div>
      {/*Assignee*/}
      <div className={styles.infoRow}>
        <label className={styles.label}>Assignee</label>
        <div className={styles.infoContainer}>
          <span>{task.assignee ? task.assignee._id : "(No Assignee)"}</span>
        </div>
      </div>
      {/*Status*/}
      <div className={styles.infoRow}>
        <label className={styles.label}>Status</label>
        <div className={styles.infoContainer}>
          <span>{task.isChecked ? "Done" : "Not Done"}</span>
        </div>
      </div>
      {/*Date*/}
      <div className={styles.infoRow}>
        <label className={styles.label}>Date Created</label>
        <div className={styles.infoContainer}>
          <span>
            {new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(
              task.dateCreated,
            )}
          </span>
        </div>
      </div>
    </Page>
  );
}
