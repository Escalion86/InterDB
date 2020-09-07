import React from "react"
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu"
import { StatusIcon } from "./icons"
import { statusIconDependencies } from "../db/dependencies"
import { useDispatch } from "react-redux"

const IconMenu = ({
  IconComponent,
  dependencies,
  activeStatus,
  themeStyle,
  style = {},
  eventId = null,
  actionOnSelect = () => {},
}) => {
  const dispatch = useDispatch()
  let menu = []
  for (let key in dependencies) {
    menu.push(
      <MenuOption
        key={key}
        onSelect={
          () =>
            activeStatus === key ? null : dispatch(actionOnSelect(eventId, key))
          //alert(`cardId: ${eventId} (${key})`)
        }
        style={
          activeStatus === key
            ? { backgroundColor: themeStyle.colors.border }
            : null
        }
        children={
          <IconComponent
            status={key}
            size={20}
            showtext={true}
            textcolor={themeStyle.colors.text}
          />
        }
      />
    )
  }

  return (
    <Menu style={style}>
      <MenuTrigger
        children={<IconComponent status={activeStatus} size={24} />}
      />
      <MenuOptions
        customStyles={{
          optionWrapper: {
            padding: 5,
            backgroundColor: themeStyle.colors.background,
          },
        }}
      >
        {menu}
      </MenuOptions>
    </Menu>
  )
}

export default IconMenu
