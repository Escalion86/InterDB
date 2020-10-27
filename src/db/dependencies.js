export const statusIconDependencies = {
  Заметка: { name: 'md-create', color: '#555555' },
  'Есть вопросы': { name: 'ios-help-circle', color: '#880088' },
  // 'Назначена встреча': { name: 'md-cafe', color: '#cc5511' },
  Принято: { name: 'md-add-circle', color: '#000088' },
  // Передано: { name: 'ios-person', color: '#880088' },
  Отменено: { name: 'ios-remove-circle', color: '#bb0000' },
  Выполнено: { name: 'ios-checkmark-circle', color: '#006600' },
}

// export const financeIconDependencies = {
//   Бесплатное: { name: 'ios-disc', color: '#006600' },
//   'Не оплачено': { name: 'ios-cash', color: '#bb0000' },
//   Авансировано: { name: 'ios-cash', color: '#999900' },
//   Оплачено: { name: 'ios-cash', color: '#006600' },
// }

// export const auditoryIconDependencies = {
//   Взрослые: { name: 'ios-disc', color: '#880088' },
//   Дети: { name: 'ios-disc', color: '#006600' },
//   Подростки: { name: 'ios-disc', color: '#cc5511' },
//   Смешанная: { name: 'ios-disc', color: '#000088' },
// }

// export const eventIconDependencies = {
//   Свадьба: { name: 'ios-disc', color: '#555555', auditory: 'Взрослые' },
//   Юбилей: { name: 'ios-disc', color: '#000088', auditory: 'Взрослые' },
//   Копоратив: { name: 'ios-disc', color: '#880088', auditory: 'Взрослые' },
//   'День рождения': { name: 'ios-disc', color: '#000088', auditory: 'Взрослые' },
//   'День рождения': { name: 'ios-disc', color: '#006600', auditory: 'Дети' },
//   Другое: { name: 'ios-disc', color: '#999900', auditory: 'Взрослые' },
// }

export const iconDependencies = {
  status: statusIconDependencies,
  // finance_status: financeIconDependencies,
  // auditory: auditoryIconDependencies,
  // event: eventIconDependencies,
}

export const contactsIcons = (client) => [
  {
    db_column: 'phone',
    name: 'Позвонить',
    icon: 'phone',
    color: 'green',
    url: `tel:+7${client.phone}`,
    exist: !!client.phone,
  },
  {
    db_column: 'phone',
    name: 'SMS',
    icon: 'sms',
    color: 'orange',
    url: `sms:+7${client.phone}`,
    exist: !!client.phone,
  },
  {
    db_column: 'whatsapp',
    name: 'WhatsApp',
    icon: 'whatsapp',
    color: '#43d854',
    url: `whatsapp://send?phone=7${client.whatsapp}`,
    exist: !!client.whatsapp,
  },
  {
    db_column: 'viber',
    name: 'Viber',
    icon: 'viber',
    color: '#59267c',
    url: `viber://add?number=7${client.viber}`,
    exist: !!client.viber,
  },
  {
    db_column: 'telegram',
    name: 'Telegram',
    icon: 'telegram',
    color: '#0088cc',
    url: `http://t.me/${client.telegram}`,
    exist: !!client.telegram,
  },
  {
    db_column: 'vk',
    name: 'ВКонтакте',
    icon: 'vk',
    color: '#597da3',
    url: `http://vk.com/${client.vk}`,
    exist: !!client.vk,
  },
  {
    db_column: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    color: '#C13584',
    url: `http://instagram.com/${client.instagram}`,
    exist: !!client.instagram,
  },
  {
    db_column: 'facebook',
    name: 'FaceBook',
    icon: 'facebook',
    color: '#3b5998',
    url: `http://vk.com/${client.facebook}`,
    exist: !!client.facebook,
  },
  {
    db_column: 'email',
    name: 'E-Mail',
    icon: 'envelope',
    color: 'red',
    url: `mailto:${client.email}`,
    exist: !!client.email,
  },
]
