import React, { useState } from "react";
import type { Task } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";
import { updateTask } from "src/api/tasks";
import { Link } from "react-router-dom";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = () => {
    setLoading(true);
    updateTask({
      ...task,
      isChecked: !task.isChecked,
      assignee: task.assignee && task.assignee._id,
    }).then((result) => {
      setLoading(false);
      if (result.success) {
        setTask(result.data);
      } else {
        alert(result.error);
      }
    });
  };

  let textClass = styles.textContainer;
  if (task.isChecked) textClass += " " + styles.checked;

  return (
    <div className={styles.item}>
      {/* render CheckButton here */}
      <CheckButton
        checked={task.isChecked}
        onPress={handleToggleCheck}
        disabled={isLoading}
      ></CheckButton>
      <div className={textClass}>
        <span className={styles.title}>
          <Link to={`/task/${task._id}`}>{task.title}</Link>
        </span>

        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
      {/*User Tag*/}
      <UserTag className={styles.userTag} user={task.assignee}></UserTag>
    </div>
  );
}
