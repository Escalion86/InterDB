import React from "react"
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  // renderers,
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
  // const { Popover } = renderers
  // const { SlideInMenu } = renderers
  const dispatch = useDispatch()
  let menu = []
  for (let key in dependencies) {
    menu.push(
      <MenuOption
        key={key}
        onSelect={() =>
          activeStatus === key ? null : dispatch(actionOnSelect(eventId, key))
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
    <Menu

    // renderer={SlideInMenu}
    // rendererProps={{ preferredPlacement: "bottom" }}
    >
      <MenuTrigger
        // style={{ marginLeft: 20 }}
        children={<IconComponent status={activeStatus} size={24} />}
      />
      <MenuOptions
        // style={{  }}

        customStyles={{
          optionsContainer: {
            // marginLeft: 40,
            width: 220,
          },
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
