import type Game from './Game'
import type Team from './Team'

export default interface GameStat {
  id: Number
  game: Game
  team: Team
  final: Number
  q1: Number
  q2: Number
  q3: Number
  q4: Number
  ot: Number
  rushing_yards: Number
  rushing_attempts: Number
  passing_yards: Number
  passing_attempts: Number
  passing_completions: Number
  turnovers: Number
  penalty_yards: Number
}
