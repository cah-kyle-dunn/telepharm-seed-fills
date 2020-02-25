const Chance = require('chance')

const seed =
    process.env.CHANCE_SEED ||
    Math.random()
      .toString()
      .substr(2),
  chance = new Chance(seed)

function getRandomScript(opts = {}) {
  return {
    prescriptionNumber: chance.string({
      minLength: 8,
      maxLength: 12,
      numeric: true
    }),
    quantityPrescribed: chance.natural({ min: 10, max: 360 }),
    refillsAuthorized: chance.pickone([0, 1, 2, 3, 12]),
    ...opts
  }
}

const drugs = [
  {
    ndc: '00045049660',
    name: 'Tylenol'
  }
]
function getRandomDrug() {
  return chance.pickone(drugs)
}

function getRandomLocation(opts = {}) {
  return {
    name: chance.string(),
    ncpdp: chance.string(),
    ...opts
  }
}

const patients = [
  {
    externalId: '9192887401028412412455',
    firstName: 'Evelyn',
    lastName: 'Cross',
    dateOfBirth: '1979-11-25'
  }
]
function getRandomPatient() {
  return chance.pickone(patients)
}

function getRandomTransaction(opts = {}) {
  return {
    copay: '5.50',
    ...opts
  }
}

function getRandomFill(opts = {}) {
  return {
    externalId: chance.string({ length: 64 }),
    quantityDispensed: chance.natural({ min: 1, max: 360 }),
    quantityDispensedToDate: 0,
    action: 'Fill',
    script: getRandomScript(),
    drug: getRandomDrug(),
    patient: getRandomPatient(),
    location: getRandomLocation(),
    transaction: getRandomTransaction(),
    metadata: {
      sendingApplication: 'telepharm.seedFillTemplate.1'
    },
    ...opts
  }
}

module.exports = {
  getRandomFill
}
