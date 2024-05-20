import { atom } from "recoil";

export const angleState = atom<number>({
  key: "angleState",
  default: 0,
});
