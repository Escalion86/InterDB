import React from 'react'
import ModalSplash from './ModalSplash'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../../theme'
import { Text, View } from 'react-native'

const data = [
  {
    version: '0.4.2',
    date: '--.11.2020',
    updated: [
      'При клике по уведомлению открывается соответствующия страница события или клиента',
      '"Финансы" переименованы в "Транзакции"',
      'Цвет индикатора загрузки',
      'Режим разработчика теперь включается если пользователь авторизирован как разработчик (с этой версии авторизация начинает влиять на контент приложения) ',
    ],
    fixed: ['Множество мелких исправлений'],
  },
  {
    version: '0.4.1',
    date: '12.11.2020',
    title: 'HotFix',
    fixed: [
      'Отображение списка календарей',
      'Создание календаря',
      'Фотокамера при создании клиента/услуги',
      'Стили некоторых компонентов',
      'Отображение информации в оповещениях и синхронизированном календаре',
    ],
  },
  {
    version: '0.4.0',
    date: '12.11.2020',
    title: 'New app name + HotFix',
    updated: [
      'Название приложения теперь "Individual CRM"',
      'Обновлен логотип',
    ],
    fixed: [
      'Авторизация через Google',
      'Ошибка удаления услуги на экране информации услуги',
    ],
    other: ['Мелкие исправления и улучшения'],
  },
  {
    version: '0.3.7',
    date: '10.11.2020',
    added: [
      'Краткий экскурс по программе при первом запуске (также можно запустить из меню настроек)',
      'Возможность копирования карточки события или услуги (долгий тап по карточке или на экране просмотра события/услуги иконка "Копировать")',
      'Функция создания календаря (Настройки => Оповещения и календарь)',
      'Опция настроек "Автозаполнение форм"',
    ],
    updated: [
      'Компонент выбора цвета (при выборе цветовой схемы и создании календаря)',
    ],
    deleted: [
      'Отображение количества событий в заголовке экрана "События"',
      'Отображение количества транзакций в заголовке экрана "Транзакции"',
    ],
    other: [
      'Авторизация временно не работает в связи с изменением политики безопасности Google.',
    ],
  },
  {
    version: '0.3.6',
    date: '06.11.2020',
    added: [
      'Всплывающее меню на экране просмотра клиента при долгом нажатии на иконку контакта',
    ],
    updated: [
      'Проверка БД (в редких случаях при обновлении приложения удалялись данные, теперь этого происходить не будет)',
      'Стиль некоторых элементов',
    ],
  },
  {
    version: '0.3.5',
    date: '05.11.2020',
    updated: ['Фильтр по месяцам и годам в списке событий'],
  },
  {
    version: '0.3.4',
    date: '03.11.2020',
    added: [
      'Поддержка 2ГИС',
      'Поиск услуг и клиентов (для клиентов поиск работает в том числе по контактным данным)',
    ],
    fixed: [
      'Ошибка загрузки при выходе из окна авторизации или ошибке авторизации Google Auth',
    ],
  },
  {
    version: '0.3.3',
    date: '02.11.2020',
    added: ['Авторизация с помощью Google Auth (пока ни на что не влияет)'],
  },
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
    title: 'Тестовый релиз',
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

const TextSubTitle = ({ children = null, style = {} }) => {
  return (
    <TextDefault
      style={{
        marginTop: 6,
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
        {item.version ? (
          <TextTitle style={{ fontWeight: 'bold' }}>{item.version}</TextTitle>
        ) : null}
        {item.date ? (
          <TextTitle style={{ marginLeft: 6 }}>({item.date})</TextTitle>
        ) : null}
        {item.title ? (
          <TextTitle style={{ marginLeft: 6, fontWeight: 'bold' }}>
            {item.title}
          </TextTitle>
        ) : null}
      </View>
      {item.added ? <TextSubTitle>Добавлено:</TextSubTitle> : null}
      {item.added
        ? item.added.map((addedItem, index) => (
          <TextDefault key={index} paragraph={1}>
              - {addedItem}
          </TextDefault>
        ))
        : null}
      {item.updated ? <TextSubTitle>Обновлено:</TextSubTitle> : null}
      {item.updated
        ? item.updated.map((updatedItem, index) => (
          <TextDefault key={index} paragraph={1}>
              - {updatedItem}
          </TextDefault>
        ))
        : null}
      {item.fixed ? <TextSubTitle>Исправлено:</TextSubTitle> : null}
      {item.fixed
        ? item.fixed.map((fixedItem, index) => (
          <TextDefault key={index} paragraph={1}>
              - {fixedItem}
          </TextDefault>
        ))
        : null}
      {item.deleted ? <TextSubTitle>Удалено:</TextSubTitle> : null}
      {item.deleted
        ? item.deleted.map((deletedItem, index) => (
          <TextDefault key={index} paragraph={1}>
              - {deletedItem}
          </TextDefault>
        ))
        : null}
      {item.other ? <TextSubTitle>Прочее:</TextSubTitle> : null}
      {item.other
        ? item.other.map((otherItem, index) => (
          <TextDefault key={index} paragraph={1}>
              - {otherItem}
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
