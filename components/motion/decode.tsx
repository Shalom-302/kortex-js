import { brand } from "@/components/brand/brand-name";
import { ScrambleText } from "./scramble-text";

const HAS_BRAND = /\bK(ORTEX|ortex)\b/;

/** Label text that decodes into view. Text carrying the circuit-K brand name is left as is. */
export function decode(text: string) {
  return HAS_BRAND.test(text) ? brand(text) : <ScrambleText text={text} />;
}
