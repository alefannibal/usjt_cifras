import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({id, name, autor, handleRemove}) {
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Autor:</span> {autor}
      </p>
      <div className={styles.project_card_actions}>
        <Link to='/'>
          <BsPencil /> EDITAR
        </Link>
        <button>
          <BsFillTrashFill /> EXCLUIR
        </button>
      </div>
    </div>
  )
}

export default ProjectCard