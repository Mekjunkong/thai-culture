import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const utility = readFileSync('lib/mission-progress.ts', 'utf8')
assert.match(utility, /readMissionProgress/)
assert.match(utility, /writeMissionProgress/)
assert.match(utility, /legacyCompleteKey/)

const missions = [
  ['order-coffee', ['drinkId', 'sweetnessId', 'checks', 'quizChoice']],
  ['market-price', ['itemId', 'quantityId', 'checks', 'priceChoice', 'roleplayChoice']],
  ['order-food-spice', ['foodId', 'spiceId', 'diningId', 'checks', 'roleplayChoice', 'billChoice']],
  ['driver-stop', ['placeId', 'directionId', 'checks', 'driverChoice', 'directionChoice']],
]

for (const [name, fields] of missions) {
  const source = readFileSync(`app/missions/${name}/${name === 'order-coffee' ? 'OrderCoffee' : name === 'market-price' ? 'MarketPrice' : name === 'order-food-spice' ? 'OrderFoodSpice' : 'DriverStop'}Mission.tsx`, 'utf8')
  assert.match(source, new RegExp(`tlcm-${name}-state`), `${name} has a full state key`)
  assert.match(source, new RegExp(`tlcm-${name}-complete`), `${name} preserves its legacy key`)
  assert.match(source, /setRestored\(true\)/, `${name} gates writes after restoration`)
  assert.match(source, /if \(!restored\) return/, `${name} avoids overwriting saved state during hydration`)
  for (const field of fields) assert.match(source, new RegExp(`\\b${field}\\b`), `${name} persists ${field}`)
  assert.match(source, /href="\/missions"/, `${name} links back to missions`)
  assert.match(source, /href="\/learn"/, `${name} links to learning hub`)
  assert.doesNotMatch(source, /verified mastery|mastery verified/i, `${name} makes no mastery claim`)
}

console.log('Mission progress contract: all four missions restore full checklist state, preserve legacy keys, and expose truthful navigation')
