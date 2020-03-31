class VirtualKeyboard {
  constructor(rootNode) {
    this.rootNode = rootNode;
    this.language = 'eng';
    this.capsLock = false;

    this.initKeyboardLayout();

    this.init();
  }

  init() {
    // Create main elements
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

    // Setup main elements
    // this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    // this.elements.keysContainer.classList.add('keyboard__keys');
    // this.elements.keysContainer.appendChild(this.createKeyboard());

    // this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    // this.elements.main.appendChild(this.elements.keysContainer);
    // this.rootNode.append(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    // document.querySelectorAll('.use-keyboard-input').forEach((element) => {
    //   element.addEventListener('focus', () => {
    //     this.open(element.value, (currentValue) => {
    //       element.value = currentValue;
    //     });
    //   });
    // });
  }

  createKeyboard() {
    const fragment = document.createDocumentFragment();

    // const keyboardLayout = getKeyboardLayout();
    this.keyboardLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      // const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add(...key.classes);

      switch (key.text.eng) {
        case 'Backspace': {
          const text = key.text.eng;
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
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
          });

          break;
        }

        // case 'enter':
        //   keyElement.classList.add('keyboard__key--wide');
        //   // keyElement.innerHTML = createIconHTML('keyboard_return');

        //   keyElement.addEventListener('click', () => {
        //     this.properties.value += '\n';
        //     // this.triggerEvent('oninput');
        //   });

        //   break;

        // case 'space':
        //   keyElement.classList.add('keyboard__key--extra-wide');
        //   // keyElement.innerHTML = createIconHTML('space_bar');

        //   keyElement.addEventListener('click', () => {
        //     this.properties.value += ' ';
        //     // this.triggerEvent('oninput');
        //   });

        //   break;

        // case 'done':
        //   keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
        //   // keyElement.innerHTML = createIconHTML('check_circle');

        //   keyElement.addEventListener('click', () => {
        //     // this.close();
        //     // this.triggerEvent('onclose');
        //   });

        //   break;

        default: {
          const text = key.text[this.language];
          keyElement.textContent = text;

          keyElement.addEventListener('click', () => {
            this.inputNode.value += text;
            // this.triggerEvent('oninput');
          });

          break;
        }
      }

      fragment.appendChild(keyElement);
    });

    return fragment;
  }

  // triggerEvent(handlerName) {
  //   if (typeof this.eventHandlers[handlerName] === 'function') {
  //     this.eventHandlers[handlerName](this.properties.value);
  //   }
  // }

  toggleCapsLock() {
    this.capsLock = !this.capsLock;

    // for (const key of this.elements.keys) {
    //   if (key.childElementCount === 0) {
    //     key.textContent = this.properties.capsLock
    //       ? key.textContent.toUpperCase()
    //       : key.textContent.toLowerCase();
    //   }
    // }
  }

  // open(initialValue, oninput, onclose) {
  //   this.properties.value = initialValue || '';
  //   this.eventHandlers.oninput = oninput;
  //   this.eventHandlers.onclose = onclose;
  //   this.elements.main.classList.remove('keyboard--hidden');
  // }

  initKeyboardLayout() {
    this.keyboardLayout = [
      {
        classes: ['keyboard__key'],
        text: {
          eng: '`',
          ru: 'ё',
        },
        shift: {
          eng: null,
          ru: null,
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
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'Tab',
          ru: 'Tab',
        },
        shift: {
          eng: null,
          ru: null,
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
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key', 'keyboard__key_two-grid-column'],
        text: {
          eng: 'Caps Lock',
          ru: 'Caps Lock',
        },
        shift: {
          eng: null,
          ru: null,
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
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key', 'keyboard__key_three-grid-column'],
        text: {
          eng: 'Shift',
          ru: 'Shift',
        },
        shift: {
          eng: null,
          ru: null,
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
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'Shift',
          ru: 'Shift',
        },
        shift: {
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'Ctrl',
          ru: 'Ctrl',
        },
        shift: {
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'Win',
          ru: 'Win',
        },
        shift: {
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'Alt',
          ru: 'Alt',
        },
        shift: {
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key', 'keyboard__key_seven-grid-column'],
        text: {
          eng: 'space',
          ru: 'space',
        },
        shift: {
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'Alt',
          ru: 'Alt',
        },
        shift: {
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'Ctrl',
          ru: 'Ctrl',
        },
        shift: {
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'arrow left',
          ru: 'arrow left',
        },
        shift: {
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'arrow down',
          ru: 'arrow down',
        },
        shift: {
          eng: null,
          ru: null,
        },
      },
      {
        classes: ['keyboard__key'],
        text: {
          eng: 'arrow right',
          ru: 'arrow right',
        },
        shift: {
          eng: null,
          ru: null,
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