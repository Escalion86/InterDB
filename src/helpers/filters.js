export const clientsFilter = (clients = [], filter = '') => {
  return clients.filter((item) => {
    const itemName = `${item.surname} ${item.name} ${item.thirdname}`.trim()
    return (
      !filter ||
      itemName.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 ||
      item.phone.indexOf(filter) >= 0 ||
      item.email.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 ||
      item.whatsapp.indexOf(filter) >= 0 ||
      item.viber.indexOf(filter) >= 0 ||
      item.telegram.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >=
        0 ||
      item.instagram.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >=
        0 ||
      item.vk.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 ||
      item.facebook.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0
    )
  })
}

export const servicesFilter = (
  services = [],
  filter = '',
  showNonArchive = true,
  showArchive = true
) => {
  return services.filter((item) => {
    return (
      ((showArchive && item.archive) || (showNonArchive && !item.archive)) &&
      (!filter ||
        item.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0)
    )
  })
}
