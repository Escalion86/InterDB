import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Text } from 'react-native'
import ModalBottomMenu from './ModalBottomMenu'
import { TextInputBlock } from '../createComponents'
import Button from '../Button'

export const ModalFinanceIncome = ({
  onAddFinance,
  onOuterClick,
  incomeFact,
  incomePlan,
}) => {
  const { colors } = useTheme()
  const incomeLeft = incomePlan - incomeFact > 0 ? incomePlan - incomeFact : 0
  const [income, setIncome] = useState(incomeLeft)
  const [comment, setComment] = useState('')
  return (
    <ModalBottomMenu
      title="Поступление средств"
      subtitle="Сумма полученная с события"
      visible={true}
      onOuterClick={onOuterClick}
    >
      <Text style={{ color: colors.text }}>
        Стоимость услуги: {incomePlan} руб
      </Text>
      <Text style={{ color: colors.text }}>Получено: {incomeFact} руб</Text>
      <Text style={{ color: colors.text }}>
        Остаток: {incomePlan - incomeFact} руб
      </Text>
      <TextInputBlock
        title="Новое поступление"
        value={income}
        onChangeText={(text) => setIncome(text)}
        keyboardType="numeric"
        placeholder="0"
        postfix="&#8381;"
        inputFlex={2}
      />
      <TextInputBlock
        title="Комментарий"
        value={comment}
        onChangeText={(text) => setComment(text)}
        multiline={true}
        inputOnNextRow={true}
        textAlign="left"
      />
      <Button
        title="Внести"
        onPress={() => {
          onAddFinance(income, comment)
          onOuterClick()
        }}
      />
      <Button title="Отмена" btnDecline={true} onPress={onOuterClick} />
    </ModalBottomMenu>
  )
}

export const ModalFinanceOutcome = ({
  onAddFinance,
  onOuterClick,
  outcomeFact,
  outcomePlan,
}) => {
  const { colors } = useTheme()
  const outcomeLeft =
    outcomePlan - outcomeFact > 0 ? outcomePlan - outcomeFact : 0
  const [outcome, setOutcome] = useState(outcomeLeft)
  const [comment, setComment] = useState('')
  return (
    <ModalBottomMenu
      title="Расходование средств"
      subtitle="Сумма израсходованная на событие"
      visible={true}
      onOuterClick={onOuterClick}
    >
      <Text style={{ color: colors.text }}>
        Сумма затрат: {outcomePlan} руб
      </Text>
      <Text style={{ color: colors.text }}>
        Израсходовано: {outcomeFact} руб
      </Text>
      <Text style={{ color: colors.text }}>
        Остаток: {outcomePlan - outcomeFact} руб
      </Text>
      <TextInputBlock
        title="Новые расходы"
        value={outcome}
        onChangeText={(text) => setOutcome(text)}
        keyboardType="numeric"
        placeholder="0"
        postfix="&#8381;"
        inputFlex={2}
      />
      <TextInputBlock
        title="Комментарий"
        value={comment}
        onChangeText={(text) => setComment(text)}
        multiline={true}
        inputOnNextRow={true}
        textAlign="left"
      />
      <Button
        title="Внести"
        onPress={() => {
          onAddFinance(outcome, comment)
          onOuterClick()
        }}
      />
      <Button title="Отмена" btnDecline={true} onPress={onOuterClick} />
    </ModalBottomMenu>
  )
}
