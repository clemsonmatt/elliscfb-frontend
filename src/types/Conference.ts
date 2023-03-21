import type Team from "./Team";

export default interface Conference {
  id: Number,
  name: String,
  name_short: String,
  teams: Team[],
}
