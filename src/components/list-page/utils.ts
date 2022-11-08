class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (node: T) => void;
  append: (node: T) => void;
  addByIndex: (node: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => Array<T>;
  listSize: number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private _size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  prepend(node: T) {
    const newNode = new LinkedListNode(node);

    if (this._size === 0) {
      this.head = newNode;
      this.tail = newNode;
      this._size++;
    } else {
      if (this.head) {
        newNode.next = this.head;
        this.head = newNode;
        this._size++;
      }
    }
  }

  append(node: T) {
    const newNode = new LinkedListNode(node);

    if (this._size === 0) {
      this.head = newNode;
      this.tail = newNode;
      this._size++;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
      this._size++;
    }
  }

  addByIndex(node: T, index: number) {
    const newNode = new LinkedListNode(node);

    if(index === 0) {
      if(this._size === 1) {
        this.tail = this.head;
      }
      
      newNode.next = this.head;
      this.head = newNode;
      this._size++;

      return;
    }

    let prev = this.head;
    let current = this.head;
    let i = 0;

    while (i !== index) {
      if (current && current.next) {
        prev = current;
        current = current.next;
      }

      i++;
    }

    if (prev) {
      prev.next = newNode;
    }

    newNode.next = current;
    this._size++;
  }

  deleteByIndex(index: number) {
    if(this._size === 1 && index === 0) {
      this.head = null;
      this.tail = null;
      this._size = 0;

      return;
    }

    let prev = this.head;
    let current = this.head;
    let i = 0;

    while (i !== index) {
      if (current && current.next) {
        prev = current;
        current = current.next;
      }

      i++;
    }

    if (prev && current) {
      if (current === this.head) {
        this.head = this.head.next;
      } else if (current === this.tail) {
        prev.next = null;
        this.tail = prev;
      }
      else {
        prev.next = current.next;
      }
    }

    this._size--;
  }

  deleteHead() {
    if (this._size < 2) {
      this.head = null;
      this.tail = null;
      this._size = 0;
    } else {
      if (this.head && this.head.next) {
        this.head = this.head.next;
        this._size--;
      }
    }
  }

  deleteTail() {
    if (this._size === 1) {
      this.head = null;
      this.tail = null;
      this._size = 0;
    } else {
      let current = this.head;
      let i = 1;

      if (current) {
        while (i !== this._size - 1) {
          if (current.next) {
            current = current.next;
          }

          i++;
        }

        this.tail = current;
        this.tail.next = null;
        this._size--;
      }
    }
  }

  toArray() {
    let res: Array<T> = [];
    let current = this.head;

    if (current) {
      while (current.next) {
        res.push(current.value);
        current = current.next;
      }

      res.push(current.value);
    }

    return res;
  }

  get listSize() {
    return this._size;
  }
}
