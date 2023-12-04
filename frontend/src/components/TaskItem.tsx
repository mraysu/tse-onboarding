import React from "react";
import type { Task } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  let textClass = styles.textContainer;
  if (task.isChecked) textClass += " " + styles.checked;

  return (
    <div className={styles.item}>
      {/* render CheckButton here */}
      <CheckButton checked={task.isChecked}></CheckButton>
      <div className={textClass}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
