import { degreesToRadians } from "@/features/canvas/utils/utils";

export type CanvasElementType = HTMLCanvasElement;

export type CanvasSize = Pick<CanvasElementType, "width" | "height">;

export class Canvas {
  readonly canvasElement: CanvasElementType;

  constructor(canvasElement: CanvasElementType) {
    this.canvasElement = canvasElement;
  }

  static getContextOfCanvas(
    canvas: CanvasElementType,
  ): CanvasRenderingContext2D {
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("canvas.getContext returned null");
    return ctx;
  }

  static getClearSizeOfCanvas(canvas: CanvasElementType): void {
    canvas.width = 0;
    canvas.height = 0;
  }

  static getCopyCanvas(canvas: CanvasElementType): CanvasElementType {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    Canvas.getContextOfCanvas(tempCanvas).drawImage(canvas, 0, 0);

    return tempCanvas;
  }

  static pasteContentFromOtherCanvas(
    fromCanvas: CanvasElementType,
    toCanvas: CanvasElementType,
  ): void {
    const ctx = Canvas.getContextOfCanvas(toCanvas);
    ctx.drawImage(fromCanvas, 0, 0);
  }

  static roundValue(value: number): number {
    return Math.round(value);
  }

  getContext(): CanvasRenderingContext2D {
    return Canvas.getContextOfCanvas(this.canvasElement);
  }

  getSize(): CanvasSize {
    return {
      width: this.canvasElement.width,
      height: this.canvasElement.height,
    };
  }

  fillCanvas(fillStyle: CanvasFillStrokeStyles["fillStyle"]): void {
    const ctx = this.getContext();
    const size = this.getSize();
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, size.width, size.height);
  }

  drawFilledCircle(params: {
    x: number;
    y: number;
    size: number;
    fillStyle: CanvasFillStrokeStyles["fillStyle"];
  }): void {
    const ctx = this.getContext();
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = params.fillStyle;
    ctx.arc(
      Canvas.roundValue(params.x),
      Canvas.roundValue(params.y),
      Canvas.roundValue(params.size / 2),
      0,
      degreesToRadians(360),
    );
    ctx.fill();

    ctx.restore();
  }

  drawFilledRectangle(params: {
    x: number;
    y: number;
    width: number;
    height: number;
    fillStyle: CanvasFillStrokeStyles["fillStyle"];
  }): void {
    const ctx = this.getContext();
    ctx.save();

    ctx.fillStyle = params.fillStyle;
    ctx.fillRect(
      Canvas.roundValue(params.x),
      Canvas.roundValue(params.y),
      Canvas.roundValue(params.width),
      Canvas.roundValue(params.height),
    );

    ctx.restore();
  }

  drawLine(params: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    lineWidth: number;
    strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
  }): void {
    const ctx = this.getContext();
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = params.strokeStyle;
    ctx.lineWidth = Canvas.roundValue(params.lineWidth);
    ctx.moveTo(
      Canvas.roundValue(params.fromX),
      Canvas.roundValue(params.fromY),
    );
    ctx.lineTo(Canvas.roundValue(params.toX), Canvas.roundValue(params.toY));
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}
