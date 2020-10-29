import React from 'react'
import ModalSplash from './ModalSplash'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../../theme'
import { Text, View } from 'react-native'

const data = [
  {
    version: '0.3.2',
    date: '29.10.2020',
    added: [
      'Фильтр по месяцам и годам в списке событий с указанием количества событий по месяцам',
      'Всплывающее окно с историей версий при клике на версию на экране "О приложении"',
    ],
    updated: ['Стиль отображения истории версий'],
    fixed: [
      'Цвет текста в списке статусов событий',
      'Некорректное отображение плановой суммы расходов в карточке события',
    ],
    deleted: [
      'Временно удалены статусы событий "Назначена встреча" и "Передано"',
    ],
  },
  {
    version: '0.3.1',
    date: '27.10.2020',
    added: ['Всплывающее окно с историей версий'],
    updated: [
      'День и месяц рождения клиента можно не указывать (по умолчанию не указан)',
      'Фон модальных окон теперь затемнен и сами окна имеют прозрачность',
    ],
    fixed: [
      'Ввод финансовых данных при создании/редактировании услуги был невозможен',
      'Ошибка при нажатии на карточку клиента или услуги в режиме просмотра события',
      'Прочие мелкие исправления',
    ],
    deleted: [
      'Временно удалены статусы событий "назначена встреча" и "Передано"',
    ],
  },
  {
    version: '0.3.0',
    date: '26.10.2020',
    other: ['Первая тестовая версия программы'],
  },
]

const TextDefault = ({ children = null, style = {}, paragraph = 0 }) => {
  const { colors } = useTheme()
  return (
    <Text
      style={{
        textAlign: 'left',
        fontSize: fontSize.small,
        color: colors.text,
        marginLeft: paragraph * 12,
        ...style,
      }}
    >
      {children}
    </Text>
  )
}

const TextTitle = ({ children = null, style = {} }) => {
  return (
    <TextDefault
      style={{
        fontSize: fontSize.medium,
        ...style,
      }}
    >
      {children}
    </TextDefault>
  )
}

const changeLog = data.map((item, index) => {
  return (
    <View key={index} style={{ width: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginTop: index > 0 ? 16 : 0,
        }}
      >
        <TextTitle style={{ fontWeight: 'bold' }}>{item.version}</TextTitle>
        <TextTitle style={{ marginLeft: 6 }}>({item.date})</TextTitle>
      </View>
      {item.added ? <TextDefault>Добавлено:</TextDefault> : null}
      {item.added
        ? item.added.map((addedItem, index) => (
          <TextDefault key={index} paragraph={1}>
              - {addedItem}
          </TextDefault>
        ))
        : null}
      {item.updated ? <TextDefault>Обновлено:</TextDefault> : null}
      {item.updated
        ? item.updated.map((updatedItem, index) => (
          <TextDefault key={index} paragraph={1}>
              - {updatedItem}
          </TextDefault>
        ))
        : null}
      {item.fixed ? <TextDefault>Исправлено:</TextDefault> : null}
      {item.fixed
        ? item.fixed.map((fixedItem, index) => (
          <TextDefault key={index} paragraph={1}>
              - {fixedItem}
          </TextDefault>
        ))
        : null}
      {item.deleted ? <TextDefault>Удалено:</TextDefault> : null}
      {item.deleted
        ? item.deleted.map((deletedItem, index) => (
          <TextDefault key={index} paragraph={1}>
              - {deletedItem}
          </TextDefault>
        ))
        : null}
      {item.other
        ? item.other.map((otherItem, index) => (
          <TextDefault key={index} paragraph={1}>
            {otherItem}
          </TextDefault>
        ))
        : null}
    </View>
  )
})

const ModalChangeLog = ({ onOuterClick, visible }) => (
  <ModalSplash
    title="История версий"
    visible={visible}
    onOuterClick={onOuterClick}
    textSize="small"
  >
    {changeLog}
  </ModalSplash>
)

export default ModalChangeLog
