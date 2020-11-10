import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { fontSize } from '../../theme'

const ModalSplash = ({
  children = null,
  title = '',
  subtitle = '',
  visible = false,
  onOuterClick = () => {},
}) => {
  const { colors } = useTheme()

  return (
    <Modal
      animationType="fade"
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

            {subtitle || children ? (
              <ScrollView style={{ width: '100%', maxHeight: 425 }}>
                {subtitle ? (
                  <Text
                    style={{
                      ...styles.panelSubtitle,
                      fontSize: fontSize.medium,
                      color: colors.text,
                    }}
                  >
                    {subtitle}
                  </Text>
                ) : null}
                {children}
              </ScrollView>
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => onOuterClick()}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  )
}

export default ModalSplash

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    height: '100%',
    opacity: 0.9,
    backgroundColor: '#000',
  },
  panel: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
    borderRadius: 20,
    borderWidth: 3,
    maxHeight: 500,
    opacity: 0.9,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelTitle: {
    height: 35,
    textAlign: 'center',
  },
  panelSubtitle: {
    // color: "gray",
    textAlign: 'left',
    width: '100%',
    // marginBottom: 10,
  },
})
