import type Season from './Season'

export default interface Week {
  id: Number
  season: Season
  number: Number
  start_date: Date
  end_date: Date
}
