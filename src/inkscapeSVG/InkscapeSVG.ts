import { Element as InkscapeSVGElement } from "./element/Element";
import { initInkscapeSVGParser } from "./InkscapeSVGParser";

export interface ViewBox {
  minX: number;
  minY: number;
  height: number;
  width: number;
}

export interface InkscapeSVGFields {
  elements: InkscapeSVGElement[];
  width: number;
  height: number;
  viewBox: ViewBox;
}

export interface InkscapeSVG extends InkscapeSVGFields {
}

export class _InkscapeSVG implements InkscapeSVG {
  // these defaults are necessary because typescript
  // doesn't play nice with Object.assign
  elements: InkscapeSVGElement[] = [];
  width: number = 0;
  height: number = 0;
  viewBox: ViewBox = {
    minX: 0, minY: 0,
    height: 0, width: 0,
  };

  constructor(init: InkscapeSVGFields) {
    Object.assign(this, init);
  }
}

export type InitInkscapeSVGFn = (init: InkscapeSVGFields) => InkscapeSVG;

export const initInkscapeSVG: InitInkscapeSVGFn
  = (init: InkscapeSVGFields) => new _InkscapeSVG(init);

/* c8 ignore start */
export function parseToInkscapeSVG(
  svgStr: string): InkscapeSVG {
  const inkscapeSVGParser = initInkscapeSVGParser();
  return inkscapeSVGParser.parse(svgStr);
}
/* c8 ignore stop */
