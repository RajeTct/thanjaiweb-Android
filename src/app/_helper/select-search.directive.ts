import { Directive, ElementRef, HostListener, Output, Input, EventEmitter } from '@angular/core';


@Directive({
  selector: '[appSelectSearch]'
})
export class SelectSearchDirective {
  keystroke = '';
  timer: any;

  private _collection: any;
  @Output() collectionChange = new EventEmitter();
  private _selection: any;
  @Output() selectionChange = new EventEmitter();
  
  @Output() timeoutEnd = new EventEmitter();

  @Input() get selection() {
    return this._selection;
  }
  set selection(value: any) {
    this._selection = value;
    this.selectionChange.emit(value);
  }

  @Input() get collection() {
    return this._collection;
  }
  set collection(value: any) {
    this._collection = value;
    this.collectionChange.emit(value);
  }

  @Input() property: string;
  @Input() delay?= 1000;

  constructor() {
  }

  @HostListener('keyup', ['$event']) onKeyUp($event:any) {
    const code = $event.keyCode;

    if (code >= KEYS.A && code <= KEYS.Z) {
      this.search($event.key);
    } 
    // else if (code === KEYS.UP) {
    //   this.moveUp();
    // } else if (code === KEYS.DOWN) {
    //   this.moveDown();
    // }
  }
  
  @HostListener('focusout') onFocusOut() {
    // this.clear();
  }

  search(key: string) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.keystroke += key;

    this.selection = this.collection
      .find((i: { [x: string]: string; }) => i[this.property].toUpperCase().startsWith(this.keystroke.toUpperCase()));

    this.clear();
  }

  moveUp() {
    const i = this.collection.findIndex((i: any) => i === this.selection);
    if (i > 0) {
      this.selection = this.collection[i - 1];
    } else if (i === 0) {
      this.selection = this.collection[this.collection.length - 1];
    }
  }

  moveDown() {
    const i = this.collection.findIndex((i: any) => i === this.selection);
    const lastItem = this.collection.length - 1;

    if (i < lastItem) {
      this.selection = this.collection[i + 1];
    } else if (i === lastItem) {
      this.selection = this.collection[0];
    }
  }

  clear() {
    this.timer = setTimeout(() => {
      this.keystroke = '';

      clearTimeout(this.timer);
      this.timeoutEnd.emit();
    }, this.delay);
  }
}

enum KEYS {
  A = 65,
  Z = 90,
  UP = 38,
  DOWN = 40,
  ESC = 27,
  ENTER = 13
}

export class SelectSearch {
  public static clearDefaultEvent() {
    document.addEventListener('keydown', e => {
      const code = e.keyCode;
      console.log(e.keyCode)
      if ((e.target as any).nodeName === 'MAT-SELECT') {
        if(code >= KEYS.A && code <= KEYS.Z)
          e.stopImmediatePropagation();
      }
    }, true);
  }
}