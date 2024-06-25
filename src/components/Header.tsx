import styles from "./Header.module.css"

import todoLogo from "../assets/rocket.svg"

export function Header(){
  return(
    <div className={styles.header}>
      <header className={styles.logo}>
        <img src={todoLogo} alt="" /> 
        <strong>to<span>do</span></strong>
      </header>
    </div>
  )
}