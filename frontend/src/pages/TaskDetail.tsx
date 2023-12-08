import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Page, Button, UserTag, TaskForm } from "src/components";
import { type Task, getTask } from "src/api/tasks";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setEditing] = useState<boolean>(false);

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
      {isEditing ? (
        <TaskForm
          mode="edit"
          task={task}
          onSubmit={(newTask) => {
            setEditing(false);
            setTask(newTask);
          }}
        />
      ) : (
        <>
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
              onClick={() => setEditing(true)}
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
              {task.assignee ? (
                <UserTag className={styles.userTag} user={task.assignee}></UserTag>
              ) : (
                "(No Assignee)"
              )}
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
        </>
      )}
    </Page>
  );
}
