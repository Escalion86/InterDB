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
  title = '',
  text = '',
  visible = false,
  onOuterClick = () => {},
  textSize = 'medium',
  children = null,
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
      <TouchableWithoutFeedback onPress={() => onOuterClick()}>
        <View
          style={styles.modal}
          // onPressOut={() => {
          //   onOuterClick()
          // }}
        >
          <TouchableWithoutFeedback onPress={null}>
            <View
              style={{
                ...styles.panel,
                backgroundColor: colors.modal,
                borderColor: colors.border,
              }}
              // onSwipePerformed={(action) => {
              //   if (action === "down") onOuterClick()
              // }}
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

                {text || children ? (
                  <ScrollView style={{ width: '100%', maxHeight: 425 }}>
                    {text ? (
                      <Text
                        style={{
                          ...styles.panelSubtitle,
                          fontSize: fontSize[textSize],
                          color: colors.text,
                        }}
                      >
                        {text}
                      </Text>
                    ) : null}
                    {children}
                  </ScrollView>
                ) : null}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
