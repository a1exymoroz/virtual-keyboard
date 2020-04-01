class VirtualKeyboard {
  constructor(rootNode) {
    this.rootNode = rootNode;
    this.language = 'eng';
    this.capsLock = false;

    this.initKeyboardLayout();

    this.initKeyBoard();
  }

  initKeyBoard() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    this.inputNode = document.createElement('input');
    this.inputNode.classList.add('wrapper__input');
    this.inputNode.setAttribute('type', 'textarea');
    wrapper.append(this.inputNode);

    this.keyboardNode = document.createElement('div');
    this.keyboardNode.classList.add('keyboard');
    this.keyboardNode.append(this.createKeyboard());
    wrapper.append(this.keyboardNode);

    this.rootNode.append(wrapper);
  }

  createKeyboard() {
    const fragment = document.createDocumentFragment();
    this.keyboardLayout.forEach((key, index) => {
      const keyElement = document.createElement('button');

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.dataset.index = `${index}`;
      keyElement.classList.add(...key.classes);
      let text;
      switch (key.text.eng) {
        case 'Backspace': {
          text = key.text.eng;
          keyElement.textContent = text;

          keyElement.addEventListener('click', () => {
            this.inputNode.value = this.inputNode.value.substring(
              0,
              this.inputNode.value.length - 1,
            );
          });
          break;
        }

        case 'Caps Lock': {
          text = key.text.eng;
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
          });

          break;
        }
        case 'space': {
          text = ' ';
          keyElement.addEventListener('click', () => {
            this.inputNode.value += text;
          });

          break;
        }
        case 'ENTER': {
          text = key.text.eng;
          keyElement.addEventListener('click', () => {
            this.inputNode.value += '\n';
          });

          break;
        }
        case 'DEL': {
          text = key.text.eng;
          keyElement.addEventListener('click', () => {
            this.inputNode.value = '';
          });

          break;
        }
        case 'Tab':
        case 'Ctrl':
        case 'Win':
        case 'Alt':
        case 'arrow left':
        case 'arrow down':
        case 'arrow right':
        case 'arrow up':
        case 'Shift': {
          text = key.text.eng;
          break;
        }

        default: {
          text = this.capsLock ? key.shift[this.language] : key.text[this.language];

          keyElement.addEventListener('click', (event) => {
            this.inputNode.value += event.currentTarget.textContent;
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
    this.rewriteKeyboardText();
  }

  rewriteKeyboardText() {
    this.keyboardNode.childNodes.forEach((element) => {
      const key = this.keyboardLayout[+element.dataset.index];
      element.textContent = this.capsLock ? key.shift[this.language] : key.text[this.language];
    });
  }

  initKeyboardLayout() {
    this.keyboardLayout = [
      {
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
        classes: ['keyboard__key', 'keyboard__key_seven-grid-column'],
        text: {
          eng: 'space',
          ru: 'space',
        },
        shift: {
          eng: 'space',
          ru: 'space',
        },
      },
      {
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
// window.addEventListener('DOMContentLoaded', () => {
//   new VirtualKeyboard();
// });

//TODO:
// "husky": {
//   "hooks": {
//     "pre-commit": "lint-staged"
//   }
// },
// "lint-staged": {
//   "*.(js)": ["npm run lint:write", "git add"]
// },
