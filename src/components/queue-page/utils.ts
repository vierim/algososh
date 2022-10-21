interface IQueue {
  insert: (item: string) => void;
  remove: () => void;

  isEmpty: () => boolean;
  isFull: () => boolean;
  getHeadPosition: () => number;
  getTailPosition: () => number;
  // clear: () => void;
  // getSize: () => number;
  // getLastIndex: () => number;
  getAllItems: () => Array<string | null>;
}

export class Queue implements IQueue {
  private container: Array<string | null> = [];
  private head = 0;
  private tail = 0;

  private readonly size: number = 0;
  private length = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  insert = (item: string) => {
    if (this.isFull()) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail] = item;

    this.tail++;

    this.length++;
  };

  remove = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head] = null;
    this.head++;
    this.length--;
  };

  isEmpty = () => {
    return this.length === 0 && this.head < this.size - 1;
  };

  isFull = () => {
    return this.length === this.size - 1;
  };

  getHeadPosition = () => {
    // if(this.length === 0 && this.head === 0) {
    //   return false;
    // }

    return this.head;
  }

  getTailPosition = () => {
    // if(this.length === 0 && this.tail === 0) {
    //   return false;
    // }

    return this.tail;
  }

  // clear = () => {
  //   if (this.getSize() > 0) {
  //     this.container = [];
  //   }
  // };

  //getSize = () => this.container.length;

  //getLastIndex = () => (this.getSize() > 0 ? this.getSize() - 1 : 0);

  getAllItems = () => this.container;
}
