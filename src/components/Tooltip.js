import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Button from '../components/Button'
import { resultTheme } from '../ThemeContext'

const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}) => {
  const { colors } = resultTheme

  // const Button = ({ wrapperStyle, style, ...rest }) => (
  //   <View style={{ ...copilotStyles.button, ...wrapperStyle }}>
  //     <Text
  //       style={{ ...copilotStyles.buttonText, color: colors.accent, ...style }}
  //       {...rest}
  //     />
  //   </View>
  // )

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 16,
        borderRadius: 16,
        backgroundColor: colors.card,
      }}
    >
      <View style={copilotStyles.tooltipContainer}>
        <Text
          testID="stepDescription"
          style={{ ...copilotStyles.tooltipText, color: colors.text }}
        >
          {currentStep.text}
        </Text>
      </View>
      <View style={[copilotStyles.bottomBar]}>
        {!isLastStep ? (
          <Button
            theme={resultTheme}
            size="small"
            textFontSize="small"
            title={labels.skip || 'Пропустить'}
            style={{ marginLeft: 5 }}
            onPress={handleStop}
          />
        ) : null}
        {!isFirstStep ? (
          <Button
            theme={resultTheme}
            size="small"
            textFontSize="small"
            title={labels.previous || 'Пред'}
            style={{ marginLeft: 5 }}
            onPress={handlePrev}
          />
        ) : null}
        {!isLastStep ? (
          <Button
            theme={resultTheme}
            size="small"
            textFontSize="small"
            title={labels.next || 'След'}
            style={{ marginLeft: 5 }}
            onPress={handleNext}
          />
        ) : (
          <Button
            theme={resultTheme}
            size="small"
            textFontSize="small"
            title={labels.finish || 'Завершить'}
            style={{ marginLeft: 5 }}
            onPress={handleStop}
          />
        )}
      </View>
    </View>
  )
}

export default Tooltip

const copilotStyles = StyleSheet.create({
  tooltipText: {},
  tooltipContainer: {
    flex: 1,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: '#27ae60',
  },
  bottomBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
