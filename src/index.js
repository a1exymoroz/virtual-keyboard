class VirtualKeyboard {
  constructor(rootNode) {
    this.rootNode = rootNode;
    this.language = 'eng';
    this.capsLock = false;
    this.keysPressed = {};
    this.inputNode = null;
    this.keyboardNode = null;
    this.isInputFocus = false;

    this.initKeyboardLayout();
    this.initKeyBoard();
    this.initKeyBoardEvents();
  }

  initKeyBoard() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    this.inputNode = document.createElement('textarea');
    this.inputNode.addEventListener('focus', () => {
      this.isInputFocus = true;
    });
    this.inputNode.addEventListener('blur', () => {
      this.isInputFocus = false;
    });
    this.inputNode.classList.add('wrapper__input');
    wrapper.append(this.inputNode);

    this.keyboardNode = document.createElement('div');
    this.keyboardNode.classList.add('keyboard');
    this.keyboardNode.append(this.createKeyboard());
    wrapper.append(this.keyboardNode);

    this.rootNode.append(wrapper);
  }

  createKeyboard() {
    const fragment = document.createDocumentFragment();
    this.keyboardLayout.forEach((item, index) => {
      const keyElement = document.createElement('button');

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.dataset.index = `${index}`;
      keyElement.dataset.key = `${item.key}`;
      keyElement.classList.add(...item.classes);
      let text;
      switch (item.key) {
        case 'Backspace': {
          text = item.text.eng;
          keyElement.textContent = text;

          keyElement.addEventListener('click', () => {
            this.inputNode.value = this.inputNode.value.substring(
              0,
              this.inputNode.value.length - 1,
            );
          });
          break;
        }

        case 'CapsLock': {
          text = item.text.eng;
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
          });

          break;
        }
        case 'Space': {
          text = ' ';
          keyElement.addEventListener('click', () => {
            this.inputNode.value += text;
          });

          break;
        }
        case 'Enter': {
          text = item.text.eng;
          keyElement.addEventListener('click', () => {
            this.inputNode.value += '\n';
          });

          break;
        }
        case 'Delete': {
          text = item.text.eng;
          keyElement.addEventListener('click', () => {
            this.inputNode.value = '';
          });

          break;
        }
        case 'Tab':
        case 'ControlLeft':
        case 'ControlRight':
        case 'MetaLeft':
        case 'AltLeft':
        case 'AltRight':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ShiftRight':
        case 'ShiftLeft': {
          text = item.text.eng;
          break;
        }

        default: {
          text = this.capsLock ? item.shift[this.language] : item.text[this.language];

          keyElement.addEventListener('click', (event) => {
            if (this.hasKeyPressed(/Shift/)) {
              this.inputNode.value += !this.capsLock
                ? item.shift[this.language]
                : item.text[this.language];
            } else {
              this.inputNode.value += event.currentTarget.textContent;
            }
          });

          break;
        }
      }
      keyElement.textContent = text;
      fragment.appendChild(keyElement);
    });

    return fragment;
  }

  toggleCapsLock() {
    this.capsLock = !this.capsLock;
    this.rewriteKeyboardContentText();
  }

  rewriteKeyboardContentText() {
    this.keyboardNode.childNodes.forEach((element) => {
      const keyboardLayoutItem = this.keyboardLayout[+element.dataset.index];
      const dataKey = element.dataset.key;

      if (/Digit/.test(dataKey) || dataKey === 'Minus' || dataKey === 'Equal') {
        element.textContent = keyboardLayoutItem.text.eng;
      } else {
        element.textContent = this.capsLock
          ? keyboardLayoutItem.shift[this.language]
          : keyboardLayoutItem.text[this.language];
      }
    });
  }

  initKeyBoardEvents() {
    document.addEventListener('keydown', (event) => {
      if (!this.keysPressed[event.code]) {
        this.keysPressed[event.code] = this.keyboardNode.querySelector(`[data-key=${event.code}]`);
        this.keysPressed[event.code].classList.add('keyboard__key_active');
        if (!this.isInputFocus) {
          this.keysPressed[event.code].click();
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      const node = this.keysPressed[event.code];
      node.classList.remove('keyboard__key_active');

      if (this.hasKeyPressed(/Shift/) && this.hasKeyPressed(/Alt/)) {
        this.toggleLanguage();
      }
      delete this.keysPressed[event.code];
    });
  }

  toggleLanguage() {
    this.language = this.language === 'eng' ? 'ru' : 'eng';
    this.rewriteKeyboardContentText();
  }

  hasKeyPressed(regexp) {
    return Object.keys(this.keysPressed).some((element) => regexp.test(element));
  }

  keyPressedLength() {
    return Object.keys(this.keysPressed).length;
  }

  initKeyboardLayout() {
    this.keyboardLayout = [
      {
        key: 'Backquote',
        classes: ['keyboard__key'],
        text: {
          eng: '`',
          ru: 'ё',
        },
        shift: {
          eng: '~',
          ru: 'ё'.toUpperCase(),
        },
      },
      {
        key: 'Digit1',
        classes: ['keyboard__key'],
        text: {
          eng: '1',
          ru: '1',
        },
        shift: {
          eng: '!',
          ru: '!',
        },
      },
      {
        key: 'Digit2',
        classes: ['keyboard__key'],
        text: {
          eng: '2',
          ru: '2',
        },
        shift: {
          eng: '@',
          ru: '"',
        },
      },
      {
        key: 'Digit3',
        classes: ['keyboard__key'],
        text: {
          eng: '3',
          ru: '3',
        },
        shift: {
          eng: '№',
          ru: '#',
        },
      },
      {
        key: 'Digit4',
        classes: ['keyboard__key'],
        text: {
          eng: '4',
          ru: '4',
        },
        shift: {
          eng: '$',
          ru: ';',
        },
      },
      {
        key: 'Digit5',
        classes: ['keyboard__key'],
        text: {
          eng: '5',
          ru: '5',
        },
        shift: {
          eng: '%',
          ru: '%',
        },
      },
      {
        key: 'Digit6',
        classes: ['keyboard__key'],
        text: {
          eng: '6',
          ru: '6',
        },
        shift: {
          eng: '^',
          ru: ':',
        },
      },
      {
        key: 'Digit7',
        classes: ['keyboard__key'],
        text: {
          eng: '7',
          ru: '7',
        },
        shift: {
          eng: '?',
          ru: '&',
        },
      },
      {
        key: 'Digit8',
        classes: ['keyboard__key'],
        text: {
          eng: '8',
          ru: '8',
        },
        shift: {
          eng: '*',
          ru: '*',
        },
      },
      {
        key: 'Digit9',
        classes: ['keyboard__key'],
        text: {
          eng: '9',
          ru: '9',
        },
        shift: {
          eng: '(',
          ru: '(',
        },
      },
      {
        key: 'Digit0',
        classes: ['keyboard__key'],
        text: {
          eng: '0',
          ru: '0',
        },
        shift: {
          eng: ')',
          ru: ')',
        },
      },
      {
        key: 'Minus',
        classes: ['keyboard__key'],
        text: {
          eng: '-',
          ru: '-',
        },
        shift: {
          eng: '_',
          ru: '_',
        },
      },
      {
        key: 'Equal',
        classes: ['keyboard__key'],
        text: {
          eng: '=',
          ru: '=',
        },
        shift: {
          eng: '+',
          ru: '+',
        },
      },
      {
        key: 'Backspace',
        classes: ['keyboard__key', 'keyboard__key_two-grid-column'],
        text: {
          eng: 'Backspace',
          ru: 'Backspace',
        },
        shift: {
          eng: 'Backspace',
          ru: 'Backspace',
        },
      },
      {
        key: 'Tab',
        classes: ['keyboard__key'],
        text: {
          eng: 'Tab',
          ru: 'Tab',
        },
        shift: {
          eng: 'Tab',
          ru: 'Tab',
        },
      },
      {
        key: 'KeyQ',
        classes: ['keyboard__key'],
        text: {
          eng: 'q',
          ru: 'й',
        },
        shift: {
          eng: 'q'.toUpperCase(),
          ru: 'й'.toUpperCase(),
        },
      },
      {
        key: 'KeyW',
        classes: ['keyboard__key'],
        text: {
          eng: 'w',
          ru: 'ц',
        },
        shift: {
          eng: 'w'.toUpperCase(),
          ru: 'ц'.toUpperCase(),
        },
      },
      {
        key: 'KeyE',
        classes: ['keyboard__key'],
        text: {
          eng: 'e',
          ru: 'у',
        },
        shift: {
          eng: 'e'.toUpperCase(),
          ru: 'у'.toUpperCase(),
        },
      },

      {
        key: 'KeyR',
        classes: ['keyboard__key'],
        text: {
          eng: 'r',
          ru: 'к',
        },
        shift: {
          eng: 'r'.toUpperCase(),
          ru: 'к'.toUpperCase(),
        },
      },
      {
        key: 'KeyT',
        classes: ['keyboard__key'],
        text: {
          eng: 't',
          ru: 'е',
        },
        shift: {
          eng: 't'.toUpperCase(),
          ru: 'е'.toUpperCase(),
        },
      },
      {
        key: 'KeyY',
        classes: ['keyboard__key'],
        text: {
          eng: 'y',
          ru: 'н',
        },
        shift: {
          eng: 'y'.toUpperCase(),
          ru: 'н'.toUpperCase(),
        },
      },
      {
        key: 'KeyU',
        classes: ['keyboard__key'],
        text: {
          eng: 'u',
          ru: 'г',
        },
        shift: {
          eng: 'u'.toUpperCase(),
          ru: 'г'.toUpperCase(),
        },
      },
      {
        key: 'KeyI',
        classes: ['keyboard__key'],
        text: {
          eng: 'i',
          ru: 'ш',
        },
        shift: {
          eng: 'i'.toUpperCase(),
          ru: 'ш'.toUpperCase(),
        },
      },
      {
        key: 'KeyO',
        classes: ['keyboard__key'],
        text: {
          eng: 'o',
          ru: 'щ',
        },
        shift: {
          eng: 'o'.toUpperCase(),
          ru: 'щ'.toUpperCase(),
        },
      },
      {
        key: 'KeyP',
        classes: ['keyboard__key'],
        text: {
          eng: 'p',
          ru: 'з',
        },
        shift: {
          eng: 'p'.toUpperCase(),
          ru: 'з'.toUpperCase(),
        },
      },
      {
        key: 'BracketLeft',
        classes: ['keyboard__key'],
        text: {
          eng: '[',
          ru: 'х',
        },
        shift: {
          eng: '{',
          ru: 'х'.toUpperCase(),
        },
      },
      {
        key: 'BracketRight',
        classes: ['keyboard__key'],
        text: {
          eng: ']',
          ru: 'ъ',
        },
        shift: {
          eng: '}',
          ru: 'ъ'.toUpperCase(),
        },
      },
      {
        key: 'Backslash',
        classes: ['keyboard__key'],
        text: {
          eng: '\\',
          ru: '\\',
        },
        shift: {
          eng: '|',
          ru: '/',
        },
      },
      {
        key: 'Delete',
        classes: ['keyboard__key'],
        text: {
          eng: 'DEL',
          ru: 'DEL',
        },
        shift: {
          eng: 'DEL',
          ru: 'DEL',
        },
      },
      {
        key: 'CapsLock',
        classes: ['keyboard__key', 'keyboard__key_two-grid-column'],
        text: {
          eng: 'Caps Lock',
          ru: 'Caps Lock',
        },
        shift: {
          eng: 'Caps Lock',
          ru: 'Caps Lock',
        },
      },
      {
        key: 'KeyA',
        classes: ['keyboard__key'],
        text: {
          eng: 'a',
          ru: 'ф',
        },
        shift: {
          eng: 'a'.toUpperCase(),
          ru: 'ф'.toUpperCase(),
        },
      },
      {
        key: 'KeyS',
        classes: ['keyboard__key'],
        text: {
          eng: 's',
          ru: 'ы',
        },
        shift: {
          eng: 's'.toUpperCase(),
          ru: 'ы'.toUpperCase(),
        },
      },
      {
        key: 'KeyD',
        classes: ['keyboard__key'],
        text: {
          eng: 'd',
          ru: 'в',
        },
        shift: {
          eng: 'd'.toUpperCase(),
          ru: 'в'.toUpperCase(),
        },
      },
      {
        key: 'KeyF',
        classes: ['keyboard__key'],
        text: {
          eng: 'f',
          ru: 'а',
        },
        shift: {
          eng: 'f'.toUpperCase(),
          ru: 'а'.toUpperCase(),
        },
      },
      {
        key: 'KeyG',
        classes: ['keyboard__key'],
        text: {
          eng: 'g',
          ru: 'п',
        },
        shift: {
          eng: 'g'.toUpperCase(),
          ru: 'п'.toUpperCase(),
        },
      },
      {
        key: 'KeyH',
        classes: ['keyboard__key'],
        text: {
          eng: 'h',
          ru: 'р',
        },
        shift: {
          eng: 'h'.toUpperCase(),
          ru: 'р'.toUpperCase(),
        },
      },
      {
        key: 'KeyJ',
        classes: ['keyboard__key'],
        text: {
          eng: 'j',
          ru: 'о',
        },
        shift: {
          eng: 'j'.toUpperCase(),
          ru: 'о'.toUpperCase(),
        },
      },
      {
        key: 'KeyK',
        classes: ['keyboard__key'],
        text: {
          eng: 'k',
          ru: 'л',
        },
        shift: {
          eng: 'k'.toUpperCase(),
          ru: 'л'.toUpperCase(),
        },
      },
      {
        key: 'KeyL',
        classes: ['keyboard__key'],
        text: {
          eng: 'l',
          ru: 'д',
        },
        shift: {
          eng: 'l'.toUpperCase(),
          ru: 'д'.toUpperCase(),
        },
      },
      {
        key: 'Semicolon',
        classes: ['keyboard__key'],
        text: {
          eng: ';',
          ru: 'ж',
        },
        shift: {
          eng: ':',
          ru: 'ж'.toUpperCase(),
        },
      },
      {
        key: 'Quote',
        classes: ['keyboard__key'],
        text: {
          eng: "'",
          ru: 'э',
        },
        shift: {
          eng: '"',
          ru: 'э'.toUpperCase(),
        },
      },
      {
        key: 'Enter',
        classes: ['keyboard__key', 'keyboard__key_two-grid-column'],
        text: {
          eng: 'ENTER',
          ru: 'ENTER',
        },
        shift: {
          eng: 'ENTER',
          ru: 'ENTER',
        },
      },
      {
        key: 'ShiftLeft',
        classes: ['keyboard__key', 'keyboard__key_three-grid-column'],
        text: {
          eng: 'Shift',
          ru: 'Shift',
        },
        shift: {
          eng: 'Shift',
          ru: 'Shift',
        },
      },
      {
        key: 'KeyZ',
        classes: ['keyboard__key'],
        text: {
          eng: 'z',
          ru: 'я',
        },
        shift: {
          eng: 'z'.toUpperCase(),
          ru: 'я'.toUpperCase(),
        },
      },
      {
        key: 'KeyX',
        classes: ['keyboard__key'],
        text: {
          eng: 'x',
          ru: 'ч',
        },
        shift: {
          eng: 'x'.toUpperCase(),
          ru: 'ч'.toUpperCase(),
        },
      },
      {
        key: 'KeyC',
        classes: ['keyboard__key'],
        text: {
          eng: 'c',
          ru: 'с',
        },
        shift: {
          eng: 'c'.toUpperCase(),
          ru: 'с'.toUpperCase(),
        },
      },
      {
        key: 'KeyV',
        classes: ['keyboard__key'],
        text: {
          eng: 'v',
          ru: 'м',
        },
        shift: {
          eng: 'v'.toUpperCase(),
          ru: 'м'.toUpperCase(),
        },
      },
      {
        key: 'KeyB',
        classes: ['keyboard__key'],
        text: {
          eng: 'b',
          ru: 'и',
        },
        shift: {
          eng: 'b'.toUpperCase(),
          ru: 'и'.toUpperCase(),
        },
      },
      {
        key: 'KeyN',
        classes: ['keyboard__key'],
        text: {
          eng: 'n',
          ru: 'т',
        },
        shift: {
          eng: 'n'.toUpperCase(),
          ru: 'т'.toUpperCase(),
        },
      },
      {
        key: 'KeyM',
        classes: ['keyboard__key'],
        text: {
          eng: 'm',
          ru: 'ь',
        },
        shift: {
          eng: 'm'.toUpperCase(),
          ru: 'ь'.toUpperCase(),
        },
      },
      {
        key: 'Comma',
        classes: ['keyboard__key'],
        text: {
          eng: ',',
          ru: 'б',
        },
        shift: {
          eng: '<',
          ru: 'б'.toUpperCase(),
        },
      },
      {
        key: 'Period',
        classes: ['keyboard__key'],
        text: {
          eng: '.',
          ru: 'ю',
        },
        shift: {
          eng: '>',
          ru: 'ю'.toUpperCase(),
        },
      },
      {
        key: 'Slash',
        classes: ['keyboard__key'],
        text: {
          eng: '/',
          ru: '.',
        },
        shift: {
          eng: '?',
          ru: ',',
        },
      },
      {
        key: 'ArrowUp',
        classes: ['keyboard__key'],
        text: {
          eng: 'arrow up',
          ru: 'arrow up',
        },
        shift: {
          eng: 'arrow up',
          ru: 'arrow up',
        },
      },
      {
        key: 'ShiftRight',
        classes: ['keyboard__key'],
        text: {
          eng: 'Shift',
          ru: 'Shift',
        },
        shift: {
          eng: 'Shift',
          ru: 'Shift',
        },
      },
      {
        key: 'ControlLeft',
        classes: ['keyboard__key'],
        text: {
          eng: 'Ctrl',
          ru: 'Ctrl',
        },
        shift: {
          eng: 'Ctrl',
          ru: 'Ctrl',
        },
      },
      {
        key: 'MetaLeft',
        classes: ['keyboard__key'],
        text: {
          eng: 'Win',
          ru: 'Win',
        },
        shift: {
          eng: 'Win',
          ru: 'Win',
        },
      },
      {
        key: 'AltLeft',
        classes: ['keyboard__key'],
        text: {
          eng: 'Alt',
          ru: 'Alt',
        },
        shift: {
          eng: 'Alt',
          ru: 'Alt',
        },
      },
      {
        key: 'Space',
        classes: ['keyboard__key', 'keyboard__key_seven-grid-column'],
        text: {
          eng: '',
          ru: '',
        },
        shift: {
          eng: '',
          ru: '',
        },
      },
      {
        key: 'AltRight',
        classes: ['keyboard__key'],
        text: {
          eng: 'Alt',
          ru: 'Alt',
        },
        shift: {
          eng: 'Alt',
          ru: 'Alt',
        },
      },
      {
        key: 'ControlRight',
        classes: ['keyboard__key'],
        text: {
          eng: 'Ctrl',
          ru: 'Ctrl',
        },
        shift: {
          eng: 'Ctrl',
          ru: 'Ctrl',
        },
      },
      {
        key: 'ArrowLeft',
        classes: ['keyboard__key'],
        text: {
          eng: 'arrow left',
          ru: 'arrow left',
        },
        shift: {
          eng: 'arrow left',
          ru: 'arrow left',
        },
      },
      {
        key: 'ArrowDown',
        classes: ['keyboard__key'],
        text: {
          eng: 'arrow down',
          ru: 'arrow down',
        },
        shift: {
          eng: 'arrow down',
          ru: 'arrow down',
        },
      },
      {
        key: 'ArrowRight',
        classes: ['keyboard__key'],
        text: {
          eng: 'arrow right',
          ru: 'arrow right',
        },
        shift: {
          eng: 'arrow right',
          ru: 'arrow right',
        },
      },
    ];
  }
}

const rootNode = document.querySelector('#App');
new VirtualKeyboard(rootNode);
