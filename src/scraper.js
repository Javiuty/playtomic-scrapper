import puppeteer from "puppeteer";


export async function scrape(club) {
  // Esto solo para ejecución sin navegador en local
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   executablePath: '/usr/bin/chromium-browser',
  //   args: ['--no-sandbox', '--disable-setuid-sandbox']
  // })
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()

  const ua = 'Mozilla/8.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'

  await page.setUserAgent(ua)

  await page.goto(club)

  const info = await page.evaluate(() => {
    const date = document.querySelectorAll('.bbq2__drop__toggle__label')[1].textContent ?? ''
    const center = document.querySelectorAll('.link.link--secondary')[2].textContent ?? ''

    return { date, center }
  })

  const freeSlots = await page.$$eval('.bbq2-open', slots => {
    return slots.map(slot => {
      slot.click()

      const court = document.querySelector('.bbq2__duration-picker__resource') ? document.querySelector('.bbq2__duration-picker__resource').textContent : ''
      const time = document.querySelector('.bbq2__duration-picker__time') ? document.querySelector('.bbq2__duration-picker__time').textContent : ''
      const options = [...document.querySelectorAll('.bbq2__duration-picker__option')].length > 0 && [...document.querySelectorAll('.bbq2__duration-picker__option')].map(option => option.textContent).filter(mapOption => mapOption.includes('1 h 30 min'))
      let duration = ''
      let price = ''

      if (options.length > 0) {
        duration = options[0].split('in')[0].replace(/\s+/g, '')
        price = options[0].split('in')[1].replace(/\s+/g, '')
      }

      return ({ court, time, duration, price })

    }).filter(slot => slot.duration !== '' && slot.time > '17:30' && slot.time.length >= 5 && slot.time < '21:30')
  })

  // setTimeout(async () => await browser.close(), 10000)
  await browser.close()

  if (freeSlots.length === 0) return

  return { date: info.date, center: info.center, freeSlots }
}


