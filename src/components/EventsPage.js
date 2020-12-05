import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { ModalFinanceIncome, ModalFinanceOutcome } from '../components/Modals'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import { EventCard } from '../components/Cards'
import { addFinance } from '../store/actions/finance'
import areEqual from '../helpers/areEqual'

const EventsPage = ({
  data,
  navigation,
  onDelete,
  setModal,
  dispatch,
  theme,
  sorting,
  onScroll,
  onScrollUp,
  onScrollDown,
  month = '',
  style = { flex: 1 },
}) => {
  const { colors } = theme

  if (!data) {
    return (
      <View
        style={{
          ...style,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={{ color: colors.text }}>{month}</Text>
      </View>
    )
  }

  const events = data

  switch (sorting) {
    case 'dateASC':
      events.sort((a, b) => (a.date > b.date ? 1 : -1))
      break
    case 'dateDESC':
      events.sort((a, b) => (a.date < b.date ? 1 : -1))
      break
    default:
      events.sort((a, b) => (a.date > b.date ? 1 : -1))
  }

  return (
    <View style={style}>
      <MainFlatListWithFab
        data={events}
        textIfNoData="Событий нет"
        type="events"
        onScroll={onScroll}
        navigation={navigation}
        onScrollUp={onScrollUp}
        onScrollDown={onScrollDown}
        renderItem={({ item }) => (
          <EventCard
            navigation={navigation}
            event={item}
            onDelete={() => onDelete(item)}
            financeIncome={(incomeLeft) => {
              // showModalFinanceEventIncome(item, incomeLeft)
              setModal(
                <ModalFinanceIncome
                  onOuterClick={() => setModal(null)}
                  incomeFact={item.finance_price - incomeLeft}
                  incomePlan={item.finance_price}
                  onAddFinance={(income, comment, date) =>
                    dispatch(
                      addFinance({
                        event: item.id,
                        type: 'income',
                        sum: income,
                        comment,
                        date: date,
                      })
                    )
                  }
                />
              )
            }}
            financeOutcome={(outcomeLeft) => {
              const outcomePlan =
                item.finance_road +
                item.finance_organizator +
                item.finance_assistants +
                item.finance_consumables
              setModal(
                <ModalFinanceOutcome
                  onOuterClick={() => setModal(null)}
                  outcomeFact={outcomePlan - outcomeLeft}
                  outcomePlan={outcomePlan}
                  onAddFinance={(outcome, comment, date) =>
                    dispatch(
                      addFinance({
                        event: item.id,
                        type: 'outcome',
                        sum: outcome,
                        comment,
                        date: date,
                      })
                    )
                  }
                />
              )
            }}
            havePopupMenu
          />
        )}
        fabVisible={false}
      />
    </View>
  )
}

export default React.memo(EventsPage, areEqual)
