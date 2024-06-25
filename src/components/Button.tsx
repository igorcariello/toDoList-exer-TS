import {PlusCircle} from '@phosphor-icons/react'
import './Button.module.css'

export function Button({...rest}){
  return(
    <button {...rest}>
      Criar
      <PlusCircle size={16}/>
    </button>
  )
}