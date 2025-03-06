export const getDates = () => {
  const dates = []

  for (let i = 0; i < 7; i++) {
    const day = new Date()
    day.setDate(day.getDate() + i)

    const month = day.toLocaleDateString('es-Es').split('/')

    month[0] = month[0].padStart(2, '0')
    month[1] = month[1].padStart(2, '0')

    dates.push(month.reverse().join('-'))
  }

  return dates
}
