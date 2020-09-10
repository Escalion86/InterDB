export const statusIconDependencies = {
  Заметка: { name: "md-create", color: "#555555" },
  "Есть вопросы": { name: "ios-help-circle", color: "#880088" },
  "Назначена встреча": { name: "md-cafe", color: "#cc5511" },
  Принято: { name: "md-add-circle", color: "#000088" },
  Передано: { name: "ios-person", color: "#880088" },
  Отменено: { name: "ios-remove-circle", color: "#bb0000" },
  Выполнено: { name: "ios-checkmark-circle", color: "#006600" },
}

export const financeIconDependencies = {
  Бесплатное: { name: "ios-disc", color: "#006600" },
  "Не оплачено": { name: "ios-cash", color: "#bb0000" },
  Авансировано: { name: "ios-cash", color: "#999900" },
  Оплачено: { name: "ios-cash", color: "#006600" },
}

export const auditoryIconDependencies = {
  Взрослые: { name: "ios-disc", color: "#880088" },
  Дети: { name: "ios-disc", color: "#006600" },
  Подростки: { name: "ios-disc", color: "#cc5511" },
  Смешанная: { name: "ios-disc", color: "#000088" },
}

export const eventIconDependencies = {
  Свадьба: { name: "ios-disc", color: "#555555" },
  Юбилей: { name: "ios-disc", color: "#000088" },
  Копоратив: { name: "ios-disc", color: "#880088" },
  "День рождения": { name: "ios-disc", color: "#006600" },
  Другое: { name: "ios-disc", color: "#999900" },
}

export const iconDependencies = {
  status: statusIconDependencies,
  finance_status: financeIconDependencies,
  auditory: auditoryIconDependencies,
  event: eventIconDependencies,
}
