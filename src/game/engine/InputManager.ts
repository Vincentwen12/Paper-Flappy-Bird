// 输入管理：键盘 + 鼠标 + 触屏
export type InputEvent = "flap" | "pause" | "restart";

export type InputHandler = (e: InputEvent) => void;

export class InputManager {
  private handlers = new Set<InputHandler>();
  private target: HTMLElement | null = null;

  attach(target: HTMLElement) {
    this.target = target;
    target.addEventListener("pointerdown", this.onPointer);
    window.addEventListener("keydown", this.onKey);
  }

  detach() {
    if (this.target) {
      this.target.removeEventListener("pointerdown", this.onPointer);
      this.target = null;
    }
    window.removeEventListener("keydown", this.onKey);
  }

  on(h: InputHandler) {
    this.handlers.add(h);
    return () => this.handlers.delete(h);
  }

  private emit(e: InputEvent) {
    this.handlers.forEach((h) => h(e));
  }

  private onKey = (ev: KeyboardEvent) => {
    if (ev.repeat) return;
    if (ev.code === "Space" || ev.code === "ArrowUp" || ev.code === "KeyW") {
      ev.preventDefault();
      this.emit("flap");
    } else if (ev.code === "KeyP" || ev.code === "Escape") {
      this.emit("pause");
    } else if (ev.code === "KeyR") {
      this.emit("restart");
    }
  };

  private onPointer = (_ev: PointerEvent) => {
    this.emit("flap");
  };
}
