import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import Button from '../Button'
// import GestureRecognizer from 'react-native-swipe-gestures'
import { Ionicons } from '@expo/vector-icons'
import { fontSize } from '../../theme'
import { MODAL_BOTTOM_CONTAINER_MAX_HEIGHT } from '../../constants'

const ModalBottomMenu = ({
  children = null,
  title = '',
  subtitle = '',
  visible = false,
  onOuterClick = () => {},
}) => {
  const { colors } = useTheme()

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        hardwareAccelerated={true}
      >
        <View style={{ flex: 1, opacity: 0.9, backgroundColor: '#000' }} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        hardwareAccelerated={true}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.")
        // }}
      >
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={() => onOuterClick()}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <View
            style={{
              ...styles.panel,
              backgroundColor: colors.modal,
              borderColor: colors.border,
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', right: 18, top: 5 }}
              onPress={() => {
                onOuterClick()
              }}
            >
              <Ionicons name="ios-close" size={36} color={colors.text} />
            </TouchableOpacity>
            <View
              style={{
                width: '20%',
                height: 7,
                borderColor: colors.border,
                borderWidth: 1,
                backgroundColor: colors.active,
                borderRadius: 5,
                alignSelf: 'center',
                marginBottom: 6,
              }}
            />
            <View
              style={{
                alignItems: 'center',
                marginBottom: 10,
                minHeight: 12,
              }}
            >
              {title ? (
                <Text
                  style={{
                    ...styles.panelTitle,
                    fontSize: fontSize.giant,
                    fontWeight: 'bold',
                    color: colors.text,
                  }}
                >
                  {title}
                </Text>
              ) : null}
              {subtitle ? (
                <Text
                  style={{
                    ...styles.panelSubtitle,
                    fontSize: fontSize.small,
                    color: colors.text,
                  }}
                >
                  {subtitle}
                </Text>
              ) : null}
            </View>
            <View style={{ maxHeight: MODAL_BOTTOM_CONTAINER_MAX_HEIGHT }}>
              {children}
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export const ModalBottomMenuYesNo = ({
  title = '',
  subtitle = '',
  onAccept = () => {},
  opener = () => {},
  children = null,
  btnTitleConfirm = 'Да',
  btnTitleDecline = 'Нет',
  visible = false,
  closer = null,
}) => {
  return (
    <View>
      {children ? (
        <TouchableOpacity
          onPress={() => {
            opener()
          }}
        >
          {children}
        </TouchableOpacity>
      ) : null}
      <ModalBottomMenu
        title={title}
        subtitle={subtitle}
        visible={visible}
        onOuterClick={() => {
          closer()
        }}
      >
        <Button
          title={btnTitleConfirm}
          btnDecline={false}
          onPress={() => {
            closer()
            onAccept()
          }}
        />
        <Button
          title={btnTitleDecline}
          btnDecline={true}
          onPress={() => {
            closer()
          }}
        />
      </ModalBottomMenu>
    </View>
  )
}

export default ModalBottomMenu

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  panel: {
    padding: 5,
    paddingTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderRightWidth: 3,
    // maxHeight: 500,
    opacity: 0.9,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelTitle: {
    // height: 35,
    textAlign: 'center',
  },
  panelSubtitle: {
    // color: "gray",
    textAlign: 'center',
    // marginBottom: 10,
  },
})
