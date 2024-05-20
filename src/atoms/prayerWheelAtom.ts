import { atom } from "recoil";

export const angleState = atom<number>({
  key: "angleState",
  default: 0,
});

export const reciteState = atom<number>({
  key: "reciteState",
  default: 0,
});
