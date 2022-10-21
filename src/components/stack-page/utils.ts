interface IStack {
  push: (item: string) => void;
  pop: () => void;
  peak: () => string | null;
  clear: () => void;
  getSize: () => number;
  getLastIndex: () => number;
  getAllItems: () => string[] | boolean;
}

export class Stack implements IStack {
  private container: string[] = [];

  push = (item: string) => {
    this.container.push(item);
  };

  pop = () => {
    this.container.pop();
  };

  peak = () => {
    if (this.getSize() > 0) {
      return this.container[this.getSize() - 1];
    }
    return null;
  };

  clear = () => {
    if (this.getSize() > 0) {
      this.container = [];
    }
  };

  getSize = () => this.container.length;

  getLastIndex = () => (this.getSize() > 0 ? this.getSize() - 1 : 0);

  getAllItems = () => (this.container ? this.container : false);
}
