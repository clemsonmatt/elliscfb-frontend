import type Team from "./Team";

export default interface Conference {
  id: Number,
  name: String,
  teams: Team[],
}
