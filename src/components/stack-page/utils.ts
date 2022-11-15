interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  toArray: () => T[];

  size: number;
  lastIndex: number;
}

export class Stack<T> implements IStack<T> {
  private _container: T[] = [];

  push = (item: T) => {
    this._container.push(item);
  };

  pop = () => {
    this._container.pop();
  };

  peak = () => {
    return this.size > 0 ? this._container[this.size - 1] : null;
  };

  clear = () => {
    if (this.size > 0) {
      this._container = [];
    }
  };

  toArray = () => this._container;

  get size() {
    return this._container.length;
  }

  get lastIndex() {
    return this.size > 0 ? this.size - 1 : 0;
  }
}
