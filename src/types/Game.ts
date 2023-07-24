import type Team from './Team'

export default interface Game {
  id: Number
  home_team: Team
  away_team: Team
  winning_team: Team
  date: Date
  time: String
  location: String
  spread: Number
  predicted_winning_team: Team
  conference_championship: Boolean
  bowl_name: String
  pickem: Boolean
  canceled: Boolean
  network: String
  home_team_score: Number
  away_team_score: Number
}
