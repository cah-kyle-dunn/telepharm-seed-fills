const got = require('got'),
  { getRandomFill } = require('./random')

require('dotenv').config()

const baseUrl =
  process.env.TELEPHARM_BASE_URL || 'https://dev.telepharm.io/api/v1'
function seedFill(fill = getRandomFill()) {
  return got.post(
    `${baseUrl}/locations/${process.env.TELEPHARM_LOCATION_ID}/fills`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TELEPHARM_API_TOKEN}`
      },
      json: fill
    }
  )
}

async function seedFills(count = 5) {
  console.log(`Seeding ${count} fill(s) into TelePharm...`)
  let createdCount = 0
  while (createdCount < count) {
    console.log(`${createdCount + 1}/${count}`)
    await seedFill()
    createdCount++
  }
  console.log(`Complete.`)
}

;(async function() {
  await seedFills()
})()
