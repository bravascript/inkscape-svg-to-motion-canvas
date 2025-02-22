import { initInkscapeSVGToMotionCanvasIO, InkscapeSVGToMotionCanvasIO } from "./InkscapeSVGToMotionCanvasIO.ts";
import { InkscapeSVGConfig } from "./mainConfig/MainConfigSchema";

export type CallbackFn = (path: string) => Promise<void>;

export interface MainCallbacks {
  getOnChangeCallback(svgConfigs: InkscapeSVGConfig[]): CallbackFn;
}

export class _MainCallbacks implements MainCallbacks {
  constructor(public deps: {
    inkscapeSVGToMotionCanvasIO: InkscapeSVGToMotionCanvasIO,
  }) { }

  getOnChangeCallback(svgConfigs: InkscapeSVGConfig[]): CallbackFn {
    return async (path: string) => {
      const matchingConfig = svgConfigs
        .find(svg => svg.input.filePath == path);

      if (matchingConfig == null)
        return;

      await this.deps.inkscapeSVGToMotionCanvasIO
        .generate(matchingConfig);
    };
  }
}

export type InitMainCallbacksFn
  = () => MainCallbacks;

export const initMainCallbacks: InitMainCallbacksFn =
  () => new _MainCallbacks({
    inkscapeSVGToMotionCanvasIO: initInkscapeSVGToMotionCanvasIO(),
  });
