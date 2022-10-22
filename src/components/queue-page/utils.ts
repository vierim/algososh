interface IQueue {
  insert: (item: string) => void;
  remove: () => void;
  peak: () => string | null;
  clear: () => void;
  isEmpty: () => boolean;
  isFull: () => boolean;
  getHeadPosition: () => number;
  getTailPosition: () => number;
  getSize: () => number;
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
      throw new Error('Maximum length exceeded');
    }

    if (!this.isEmpty()) {
      this.tail++;
    }

    this.container[this.tail] = item;
    this.length++;
  };

  remove = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    this.container[this.head] = null;
    this.length--;

    if (this.head !== this.size - 1) {
      if (this.head !== this.tail) {
        this.head++;
      }
    } else {
      this.tail++;
    }
  };

  peak = () => this.container[this.head];

  clear = () => {
    this.container = Array(this.size).fill(null);

    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  isEmpty = () => this.length === 0;

  isFull = () => this.tail >= this.size - 1;

  getHeadPosition = () => this.head;

  getTailPosition = () => this.tail;

  getSize = () => this.size;

  getAllItems = () => this.container;
}
