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
}

export class LinkedList<T> implements ILinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  prepend(node: T) {
    const newNode = new LinkedListNode(node);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    } else {
      if (this.head) {
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
      }
    }
  }

  append(node: T) {
    const newNode = new LinkedListNode(node);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
      this.size++;
    }
  }

  addByIndex(node: T, index: number) {
    let prev = this.head;
    let current = this.head;
    let i = 0;

    while (i < index) {
      if (current && current.next) {
        prev = current;
        current = current.next;
      }
      
      i++;
    }

    const newNode = new LinkedListNode(
      node,
      current && current.next ? current.next : undefined
    );

    if(prev) {
      prev.next = newNode;
    }

    newNode.next = current;
    
    this.size++;
  }

  deleteByIndex(index: number) {
    let prev = this.head;
    let current = this.head;
    let i = 0;

    while (i < index) {
      if (current && current.next) {
        prev = current;
        current = current.next;
      }
      
      i++;
    }

    if(prev && current) {
      prev.next = current.next;
    }
    
    this.size--;
  }

  deleteHead() {
    if (this.size < 2) {
      this.head = null;
      this.tail = null;
      this.size = 0;
    } else {
      if (this.head && this.head.next) {
        this.head = this.head.next;
        this.size--;
      }
    }
  }

  deleteTail() {
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
    } else {
      let current = this.head;
      let i = 1;

      if (current) {
        while (i !== this.size - 1) {
          if (current.next) {
            current = current.next;
          }

          i++;
        }

        this.tail = current;
        this.tail.next = null;
        this.size--;
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
}
