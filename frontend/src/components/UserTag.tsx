import React from "react";
import styles from "src/components/UserTag.module.css";
import { User } from "src/api/users";

export interface UserTagProps extends Omit<React.ComponentProps<"body">, "type"> {
  user?: User | null;
  className?: string;
}

export function UserTag({ user, className }: UserTagProps) {
  let wrapperClass = styles.wrapper;
  if (className) {
    wrapperClass += ` ${className}`;
  }

  return (
    <div className={wrapperClass}>
      {user ? (
        <>
          {/* Profile Picture*/}
          <img src={user.profilePictureURL ? user.profilePictureURL : "/userDefault.svg"}></img>
          {/* User Name*/}
          <div className={styles.textContainer}>
            <span>{user.name}</span>
          </div>
        </>
      ) : (
        <>
          <span>Not Assigned</span>
        </>
      )}
    </div>
  );
}
