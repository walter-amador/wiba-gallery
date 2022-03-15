import { Icon } from '@iconify/react'
import React from 'react'

const SideBarItem = ({desc, func, icon}) => {
  return (
    <li
        onClick={func}
        className={`flex flex-row items-center hover:bg-slate-200 transform transition-all duration-150 cursor-pointer rounded-md px-2 py-5 space-x-2 w-full h-8`}
    >
        {icon && <Icon icon={icon} />}
        <span>{desc}</span>
    </li>
  )
}

export default SideBarItem;