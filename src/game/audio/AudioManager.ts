import { getSynth } from "./synth";

export const Audio = {
  resume() {
    getSynth().resume();
  },
  flap() {
    getSynth().flap();
  },
  score() {
    getSynth().score();
  },
  pickup() {
    getSynth().pickup();
  },
  die() {
    getSynth().die();
  },
  shield() {
    getSynth().shield();
  },
  startMusic() {
    getSynth().startMusic();
  },
  stopMusic() {
    getSynth().stopMusic();
  },
  setMaster(v: number) {
    getSynth().setMaster(v);
  },
};
