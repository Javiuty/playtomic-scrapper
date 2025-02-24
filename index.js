import { CLUBS } from "./src/constants.js";
import { getDates } from "./src/utils.js";
import { scrape } from "./src/scraper.js";
import { html } from './src/templates.js';

import { sendEmail } from "./src/mail.js";

const slots = []
const dates = getDates()
const urls = CLUBS.map(club => dates.map(date => club.replace('0000-00-00', date))).flat()


// await sendEmail()
async function main() {
  for (const url of urls) {
    slots.push(await scrape(url))
  }

  // Quitamos los null y valores falsy
  const cleanSlots = slots.filter(slot => slot)

  await sendEmail(cleanSlots)
}

await main()