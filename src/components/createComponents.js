import React, { useState, useCallback, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { formatDate, formatTime } from '../helpers/date'
import { EventIcon } from './icons'
import * as ImagePicker from 'expo-image-picker'
import { Switch as SwitchPaper, RadioButton } from 'react-native-paper'
import ModalSplash from './Modals/ModalSplash'
import ModalBottomMenu from './Modals/ModalBottomMenu'
import Button from './Button'
import { Picker } from '@react-native-picker/picker'
import { fontSize } from '../theme'
import { MaskedTextInput, CustomMask } from 'rn-masked-text-input'
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker'

export const TextBlock = ({ children, style = {} }) => {
  const { colors } = useTheme()

  return (
    <Text
      style={{
        flex: 1,
        fontSize: fontSize.medium,
        color: colors.text,
        textAlignVertical: 'center',
        ...style,
      }}
    >
      {children}
    </Text>
  )
}

export const SwitchBlock = ({
  title = '',
  onValueChange = () => {},
  value = null,
}) => {
  return (
    <View
      style={{
        ...styles.row,
        justifyContent: 'space-between',
      }}
    >
      <TextBlock>{title}</TextBlock>
      <SwitchPaper value={value} onValueChange={onValueChange} />
    </View>
  )
}

export const TitleBlock = ({ title = '' }) => {
  return <TextBlock style={styles.title}>{title}</TextBlock>
}

export const RadioBlock = ({
  title = '',
  radios,
  value,
  onValueChange = () => {},
  titleFlex = 2,
  buttonsFlex = 3,
}) => {
  const radioButtons = radios.map((radio) => {
    return (
      <View
        key={radio.value}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <RadioButton
          value={radio.value}
          // label={radio.label}
          // labelStyle={{
          //   // ...styles.text,
          //   fontSize: fontSize.medium,
          //   color: colors.text,
          // }}
        />
        <TextBlock>{radio.label}</TextBlock>
      </View>
    )
  })
  return (
    <View style={{ ...styles.row, height: null }}>
      <TextBlock
        style={{
          flex: titleFlex,
        }}
      >
        {title}
      </TextBlock>
      <View style={{ ...styles.block, flex: buttonsFlex }}>
        <RadioButton.Group onValueChange={onValueChange} value={value}>
          <View style={{ flexDirection: 'column' }}>{radioButtons}</View>
        </RadioButton.Group>
      </View>
    </View>
  )
}

// export const GenderSwitch = ({
//   title = '',
//   onSwitch = () => {},
//   value = false,
// }) => {
//   const { colors } = useTheme()

//   return (
//     <View style={styles.row}>
//       <Text
//         style={{
//           ...styles.text,
//           fontSize: fontSize.medium,
//           color: colors.text,
//         }}
//       >
//         {title}
//       </Text>
//       <View style={styles.block}>
//         <Switch
//           value={value}
//           onValueChange={onSwitch}
//           disabled={false}
//           activeText={'муж'}
//           inActiveText={'жен'}
//           circleSize={30}
//           barHeight={34}
//           circleBorderWidth={3}
//           backgroundActive={'#202088'}
//           backgroundInactive={'#882020'}
//           circleActiveColor={'#2020ff'}
//           circleInActiveColor={'#ff2020'}
//           // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
//           changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
//           innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
//           outerCircleStyle={{}} // style for outer animated circle
//           renderActiveText={true}
//           renderInActiveText={true}
//           switchLeftPx={6} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
//           switchRightPx={6} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
//           switchWidthMultiplier={2.6} // multipled by the `circleSize` prop to calculate total width of the Switch
//           switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
//         />
//       </View>
//     </View>
//   )
// }

export const ColorPickerBlock = ({
  title = '',
  color,
  onColorSelected = () => {},
  titleFlex = 2,
  buttonFlex = 2,
  buttonText = '',
  buttonOnNextRow,
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  const ModalColorPicker = useCallback(
    ({ defaultColor }) => {
      const [newColor, setNewColor] = useState(defaultColor)

      if (defaultColor && newColor !== defaultColor) defaultColor = null

      return (
        <ModalSplash
          title="Выберите цвет"
          visible={modalVisible}
          onOuterClick={() => setModalVisible(false)}
          textSize="medium"
        >
          <View style={{ height: 250 }}>
            <TriangleColorPicker
              color={defaultColor}
              onColorChange={(color) => {
                setNewColor(fromHsv(color))
              }}
              style={{ flex: 1 }}
            />
          </View>
          <Button
            title="Выбрать"
            onPress={() => {
              onColorSelected(newColor)
              setModalVisible(false)
            }}
          />
        </ModalSplash>
      )
    },
    [modalVisible]
  )

  return (
    <>
      {buttonOnNextRow ? (
        <TextBlock style={{ flex: null }}>{title}</TextBlock>
      ) : null}
      <View style={{ ...styles.row, height: null }}>
        <ModalColorPicker defaultColor={color} />
        {!buttonOnNextRow ? (
          <TextBlock
            style={{
              flex: titleFlex,
            }}
          >
            {title}
          </TextBlock>
        ) : null}
        <View style={{ flex: buttonFlex }}>
          <Button
            title={buttonText}
            style={{ backgroundColor: color }}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
    </>
  )
}

// TODO Возможно стоит продумать автоматическое изменение размера картинки до минимума
export const ImagePickerBlock = ({
  title = '',
  image = '',
  onPick = () => {},
  noImageUrl = null,
}) => {
  const { colors, dark } = useTheme()
  if (!noImageUrl) {
    noImageUrl = dark
      ? require('../../assets/no_image_dark.jpg')
      : require('../../assets/no_image.jpg')
  }

  const takePhoto = async () => {
    const img = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    })

    onPick(img.uri === undefined ? '' : img.uri)
  }

  const chooseImage = async () => {
    const img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    })

    onPick(img.uri === undefined ? '' : img.uri)
  }
  const [modalVisible, setModalVisible] = useState(false)

  const ModalChoosePhotoSource = () => (
    <ModalBottomMenu
      title="Загрузка фотографии"
      subtitle="Выберите источник изображения"
      visible={modalVisible}
      onOuterClick={() => setModalVisible(false)}
    >
      <Button
        title="Сделать фотографию"
        onPress={() => {
          setModalVisible(false)
          takePhoto()
        }}
      />
      <Button
        title="Выбрать из галереи"
        onPress={() => {
          setModalVisible(false)
          chooseImage()
        }}
      />
      <Button
        title="Отмена"
        btnDecline
        onPress={() => {
          setModalVisible(false)
        }}
      />
    </ModalBottomMenu>
  )
  const imageDemention =
    (Dimensions.get('window').width / (image === '' ? 8 : 5)) * 3 - 8

  return (
    <View style={{ ...styles.row, height: null }}>
      <ModalChoosePhotoSource />
      <TextBlock
        style={{
          flex: 2,
        }}
      >
        {title}
      </TextBlock>
      <TouchableOpacity
        // style={styles.block}
        onPress={async () => setModalVisible(true)}
      >
        <View style={{ height: imageDemention, width: imageDemention }}>
          <Image
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.card,
              width: '100%',
              height: '100%',
            }}
            source={!image ? noImageUrl : { uri: image }}
            // resizeMethod="scale"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export const TimeInputBlock = ({
  title = '',
  value = '',
  typeValue = 1,
  onChangeText = () => {},
  fieldStyle = {},
  titleFlex = 3,
  inputFlex = 2,
  textAlign = 'center',
  success = false,
}) => {
  const { colors } = useTheme()

  const textColor = success ? colors.success : colors.text

  const [type, setType] = useState(typeValue)
  const realValue = value ? parseInt(value) : 0

  useEffect(() => {
    if (realValue > 0 && realValue % 60 === 0) {
      setType(60)
    }
  }, [])

  if (type === 60 && realValue % 60 > 0) {
    setType(1)
  }
  const textValue = realValue / type

  return (
    <View>
      <View style={styles.row}>
        <TextBlock
          style={{
            flex: titleFlex,
          }}
        >
          {title}
        </TextBlock>
        <View
          style={{
            flex: inputFlex,
            flexDirection: 'row',
            height: '100%',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderColor: colors.border,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderRadius: 5,
              height: '100%',
              ...fieldStyle,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                textAlign: textAlign,
                fontSize: fontSize.medium,
                color: textColor,
                padding: 5,
              }}
              keyboardType="numeric"
              onChangeText={(text) => {
                // setTextValue(text ? parseInt(text) : 0)
                onChangeText((text ? parseInt(text) : 0) * type)
              }}
              placeholder="0"
              placeholderTextColor={colors.text}
              value={String(textValue)}
            />
          </View>
          <DropDownPicker
            items={[
              { label: 'мин', value: 1 },
              { label: 'час', value: 60 },
            ]}
            labelStyle={{
              fontSize: fontSize.medium,
              textAlign: 'left',
              color: colors.text,
            }}
            defaultValue={type}
            // labelStyle={{
            //   fontSize: 16,
            //   textAlign: "left",
            //   color: colors.text,
            // }}
            containerStyle={{ height: '100%', width: 70 }}
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              paddingLeft: 0,
              color: '#fff',
              // ...style,
            }}
            dropDownMaxHeight={350}
            itemStyle={{
              justifyContent: 'flex-start',
              paddingHorizontal: 5,
              color: '#fff',
            }}
            dropDownStyle={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              paddingHorizontal: 0,
              paddingVertical: 0,
              zIndex: 99,
            }}
            // containerStyle={{ padding: 0, margin: 0, paddingHorizontal: 0 }}
            activeItemStyle={{ backgroundColor: colors.active }}
            arrowColor={colors.icon}
            onChangeItem={({ value }) => {
              setType(value)
              onChangeText(textValue * value) // setTextValue(textValue * value)
            }}
          />
        </View>
      </View>
    </View>
  )
}

export const TextInputBlock = ({
  title = '',
  value = '',
  prefix = '',
  postfix = '',
  onChangeText = () => {},
  keyboardType = 'default',
  placeholder = '',
  phoneMask = false,
  multiline = false,
  fieldStyle = {},
  success = false,
  titleFlex = 2,
  inputFlex = 3,
  inputOnNextRow = false,
  textAlign = 'center',
}) => {
  value = value ? value.toString() : ''
  const { colors } = useTheme()
  const textColor = success ? colors.success : colors.text

  const phoneMaskSet = new CustomMask({
    name: 'phoneMask',
    mask: '(000) 000-0000',
    validator: (value) => value === '123456789',
  })

  const multilineStyle = multiline
    ? { height: null, maxHeight: 200, minHeight: 45 }
    : {}

  const onChangeTextFunc = (text) => {
    if (keyboardType === 'numeric') {
      onChangeText(text.replace(/[^\d]/g, ''))
    } else {
      onChangeText(text)
    }
  }

  return (
    <View>
      {inputOnNextRow ? <TextBlock>{title}</TextBlock> : null}
      <View
        style={{
          ...styles.row,
          ...multilineStyle,
        }}
      >
        {!inputOnNextRow ? (
          <TextBlock
            style={{
              flex: titleFlex,
            }}
          >
            {title}
          </TextBlock>
        ) : null}
        <View
          style={{
            flex: inputFlex,
            flexDirection: 'row',
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderRadius: 5,
            height: '100%',
            ...fieldStyle,
          }}
        >
          {prefix ? (
            <View
              style={{
                minWidth: 32,
                height: '100%',
                backgroundColor: colors.active,
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}
            >
              <TextBlock
                style={{
                  textAlign: 'center',
                }}
              >
                {prefix}
              </TextBlock>
            </View>
          ) : null}
          {phoneMask ? (
            <MaskedTextInput
              customMask={phoneMaskSet}
              keyboardType="numeric"
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={textColor}
              style={{
                flex: 1,
                textAlign: textAlign,
                fontSize: fontSize.medium,
                color: textColor,
                padding: 5,
              }}
              value={value}
            />
          ) : (
            <TextInput
              style={{
                flex: 1,
                textAlign: textAlign,
                fontSize: fontSize.medium,
                color: textColor,
                padding: 5,
              }}
              multiline={multiline}
              keyboardType={keyboardType}
              onChangeText={onChangeTextFunc}
              placeholder={placeholder}
              placeholderTextColor={textColor}
              value={value}
            />
          )}
          {postfix ? (
            <View
              style={{
                minWidth: 32,
                height: '100%',
                backgroundColor: colors.active,
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}
            >
              <TextBlock
                style={{
                  textAlign: 'center',
                }}
              >
                {postfix}
              </TextBlock>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  )
}

export const EventRowDropDownPicker = ({
  dependencies,
  name,
  defeultValue = null,
  placeholder = 'Выберите пункт из списка',
  onChangeItem = null,
  style = {},
}) => {
  const { colors } = useTheme()
  const arrayItems = []
  for (const item in dependencies) {
    arrayItems.push({
      label: '',
      value: item,
      icon: () => (
        <EventIcon
          dependencies={dependencies}
          status={item}
          size="tiny"
          showText={true}
          textColor={colors.text}
          style={{ paddingHorizontal: 10 }}
        />
      ),
    })
  }

  return (
    <View style={styles.row}>
      <TextBlock
        style={{
          flex: 2,
        }}
      >
        {name}
      </TextBlock>
      <View style={styles.block}>
        <DropDownPicker
          placeholder={placeholder}
          items={arrayItems}
          defaultValue={defeultValue}
          // labelStyle={{
          //   fontSize: 16,
          //   textAlign: "left",
          //   color: colors.text,
          // }}
          containerStyle={{ height: 44, flex: 1 }}
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            paddingLeft: 0,
            ...style,
          }}
          dropDownMaxHeight={350}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            paddingHorizontal: 0,
            paddingVertical: 0,
            zIndex: 99,
          }}
          // containerStyle={{ padding: 0, margin: 0, paddingHorizontal: 0 }}
          activeItemStyle={{ backgroundColor: colors.active }}
          arrowColor={colors.icon}
          onChangeItem={onChangeItem}
        />
      </View>
    </View>
  )
}

export const BirthdayPicker = ({
  title = 'День рождения',
  day = null,
  month = null,
  year = null,
  onDayChange = () => {},
  onMonthChange = () => {},
  onYearChange = () => {},
}) => {
  // if (!day) day = 1
  // if (!month) month = 0
  // if (!year) year = ''
  // day += ''
  // year += ''
  const { colors } = useTheme()
  const monthsNames = [
    '----',
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ]
  const daysNames = ['--']
  for (let i = 1; i <= 31; i++) {
    daysNames.push(i)
  }

  const yearsNames = ['----']
  for (let i = 2020; i >= 1900; i--) {
    yearsNames.push(i)
  }

  const daysPickerItems = daysNames.map((day, index) => (
    <Picker.Item key={index} label={day + ''} value={index} />
  ))

  const monthsPickerItems = monthsNames.map((month, index) => (
    <Picker.Item
      key={index}
      label={month + ''}
      value={index === 0 ? null : index - 1}
    />
  ))

  const yearsPickerItems = yearsNames.map((year, index) => {
    if (index === 0) {
      return <Picker.Item key={index} label={year} value={null} />
    } else {
      return <Picker.Item key={index} label={year + ''} value={year} />
    }
  })

  const ObjPicker = ({
    items,
    defaultValue = null,
    style = {},
    onValueChange = () => {},
  }) => (
    <View
      style={{
        ...styles.datetime,
        flex: 1,
        fontSize: fontSize.medium,
        backgroundColor: colors.card,
        borderColor: colors.border,
        ...style,
      }}
    >
      <Picker
        selectedValue={defaultValue}
        style={{
          flex: 1,
          color: colors.text,
          backgroundColor: colors.card,
        }}
        onValueChange={onValueChange}
        mode="dropdown"
      >
        {items}
      </Picker>
    </View>
  )

  return (
    <View style={styles.row}>
      <TextBlock style={{ flex: 2 }}>{title}</TextBlock>
      <View style={{ ...styles.datetimecontainer, flex: 3 }}>
        <ObjPicker
          items={daysPickerItems}
          style={{ flex: 2 }}
          defaultValue={day}
          onValueChange={onDayChange}
        />
        <ObjPicker
          items={monthsPickerItems}
          style={{ flex: 5 }}
          defaultValue={month}
          onValueChange={onMonthChange}
        />
        <ObjPicker
          items={yearsPickerItems}
          style={{ flex: 3 }}
          defaultValue={year}
          onValueChange={onYearChange}
        />
      </View>
    </View>
  )
}

export const DateTimePickerBlock = ({
  title = '',
  dateValue = null,
  onChange,
  pickTime = true,
  pickDate = true,
  showWeek = true,
  neutralButton = false,
  inputFlex = 3,
}) => {
  const { colors } = useTheme()
  const [dateTimePickerShow, setDateTimePickerShow] = useState(null)

  return (
    <View style={styles.row}>
      <TextBlock style={{ flex: 2 }}>{title}</TextBlock>
      <View style={{ ...styles.datetimecontainer, flex: inputFlex }}>
        {pickDate ? (
          <TouchableOpacity
            onPress={() => setDateTimePickerShow('eventDateStart')}
            style={{ flex: 4, marginRight: 8 }}
          >
            <TextBlock
              style={{
                ...styles.datetime,
                flex: 2,
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              {dateValue ? formatDate(dateValue, true, showWeek) : 'не выбрана'}
            </TextBlock>
            {dateTimePickerShow === 'eventDateStart' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(dateValue || new Date().setHours(0, 0, 0, 0))}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setDateTimePickerShow(null)
                  if (event.type === 'neutralButtonPressed') {
                    onChange('')
                  } else if (selectedDate) {
                    onChange(Date.parse(selectedDate))
                  }
                }}
                neutralButtonLabel={neutralButton ? 'Очистить' : null}
              />
            ) : null}
          </TouchableOpacity>
        ) : null}
        {pickTime ? (
          <TouchableOpacity
            onPress={() => setDateTimePickerShow('eventTimeStart')}
            style={{ flex: 2 }}
          >
            <TextBlock
              style={{
                ...styles.datetime,
                flex: 2,
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              {dateValue ? formatTime(dateValue, true, true) : 'не выбрана'}
            </TextBlock>
            {dateTimePickerShow === 'eventTimeStart' ? (
              <DateTimePicker
                testID="timeTimePicker"
                value={new Date(dateValue || new Date().setSeconds(0, 0))}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setDateTimePickerShow(null)
                  if (selectedDate) onChange(Date.parse(selectedDate))
                }}
              />
            ) : null}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

export const DropDownPickerBlock = ({
  db = [],
  name = null,
  defeultValue = null,
  placeholder = '[ Выберите пункт меню ]',
  onChangeItem = null,
  zeroItem = null,
  searchable = false,
}) => {
  const { colors } = useTheme()
  let defaultExists = false
  const arrayItems = zeroItem ? [zeroItem] : []
  if (zeroItem && zeroItem.value === defeultValue) {
    defaultExists = true
  }
  db.forEach((data) => {
    if (data.id === defeultValue) {
      defaultExists = true
    }
    if (!data.archive) {
      arrayItems.push({
        label: data.name,
        value: data.id,
        // icon: () => (
        //   <EventIcon
        //     dependencies={dependencies}
        //     status={item}
        //     size={20}
        //     showText={true}
        //     textColor={colors.text}
        //   />
        // ),
      })
    }
  })

  return (
    <View style={styles.row}>
      {name ? (
        <TextBlock
          style={{
            flex: 2,
          }}
        >
          {name}
        </TextBlock>
      ) : null}
      <View style={styles.block}>
        <DropDownPicker
          placeholder={placeholder}
          items={arrayItems}
          defaultValue={defaultExists ? defeultValue : null}
          labelStyle={{
            fontSize: fontSize.medium,
            textAlign: 'left',
            color: colors.text,
          }}
          containerStyle={{ height: 44, flex: 1 }}
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
          dropDownMaxHeight={350}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            paddingVertical: 0,
          }}
          // containerStyle={{ padding: 0, margin: 0, paddingHorizontal: 0 }}
          activeItemStyle={{ backgroundColor: colors.active }}
          arrowColor={colors.text}
          onChangeItem={onChangeItem}
          searchable={searchable}
          searchablePlaceholder="Найти"
          searchablePlaceholderTextColor="gray"
          seachableStyle={{}}
          searchableError={() => <Text>Not Found</Text>}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    // flex: 1,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 3,
    // height: 40,
    fontSize: fontSize.giant,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    height: 45,
  },
  datetime: {
    height: '100%',
    paddingHorizontal: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  datetimecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 5,
    height: 44,
  },
  image: {
    // width: "100%",
    // flex: 1,
    borderRadius: 5,
    // height: "100%",
    borderColor: 'red',
    borderWidth: 3,
  },
  block: {
    flex: 3,
  },

  modal: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  panel: {
    padding: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,

    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})
