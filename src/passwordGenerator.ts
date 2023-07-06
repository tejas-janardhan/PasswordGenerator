// No validations here, minimum length of ....
// provides password with any strength

const MAX_LENGTH = 128;

const SMALL_CHAR_ARRAY = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const NUMBER_ARRAY = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SPECIAL_ARRAY = [
  "~",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "{",
  "}",
  "<",
  ">",
  "?",
  "+",
  "=",
  "-",
  "_",
  ".",
];

const BIG_CHAR_ARRAY = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export type CONFIG = {
  isSpecialAllowed: boolean;
  isCapsAllowed: boolean;
  isNumbersAllowed: boolean;
};

export const defaultConfig: CONFIG = {
  isSpecialAllowed: true,
  isCapsAllowed: true,
  isNumbersAllowed: true,
};

export type PASSWORD = {
  password: string;
  strength: "low" | "medium" | "high";
};

export const passwordGeneratorFactory = (config: CONFIG = defaultConfig) => {
  let passwordChoice = [...SMALL_CHAR_ARRAY];
  let low = 14;
  let medium = 24;
  if (config.isCapsAllowed) {
    passwordChoice = [...passwordChoice, ...BIG_CHAR_ARRAY];
    low -= 2;
    medium -= 2;
  }

  if (config.isSpecialAllowed) {
    passwordChoice = [...passwordChoice, ...SPECIAL_ARRAY];
    low -= 2;
    medium -= 2;
  }

  if (config.isNumbersAllowed) {
    passwordChoice = [...passwordChoice, ...NUMBER_ARRAY];
    low -= 2;
    medium -= 2;
  }
  const choiceLen = passwordChoice.length;

  return (length: number): PASSWORD => {
    if (length === MAX_LENGTH) {
      throw Error("Password length too long");
    }

    const passwordArray: string[] = [];

    for (let i = 0; i < length; i++) {
      passwordArray.push(passwordChoice[Math.floor(Math.random() * choiceLen)]);
    }

    let strength: "low" | "medium" | "high";

    if (length < low) {
      strength = "low";
    } else if (length >= low && length < medium) {
      strength = "medium";
    } else {
      strength = "high";
    }

    return {
      password: passwordArray.join(""),
      strength,
    };
  };
};

const config1: CONFIG = {
  isSpecialAllowed: false,
  isCapsAllowed: false,
  isNumbersAllowed: false,
};

const config2: CONFIG = {
  isSpecialAllowed: true,
  isCapsAllowed: false,
  isNumbersAllowed: false,
};

const config3: CONFIG = {
  isSpecialAllowed: false,
  isCapsAllowed: true,
  isNumbersAllowed: false,
};

const config4: CONFIG = {
  isSpecialAllowed: false,
  isCapsAllowed: false,
  isNumbersAllowed: true,
};

const config5: CONFIG = {
  isSpecialAllowed: true,
  isCapsAllowed: true,
  isNumbersAllowed: true,
};

const lengths = [3, 6, 8, 19, 45];

// const passwordGenerator1 = passwordGeneratorFactory(config1);
// console.log(lengths.map((length) => passwordGenerator1(length)));

// const passwordGenerator2 = passwordGeneratorFactory(config2);
// console.log(lengths.map((length) => passwordGenerator2(length)));

// const passwordGenerator3 = passwordGeneratorFactory(config3);
// console.log(lengths.map((length) => passwordGenerator3(length)));

// const passwordGenerator4 = passwordGeneratorFactory(config4);
// console.log(lengths.map((length) => passwordGenerator4(length)));

// const passwordGenerator5 = passwordGeneratorFactory(config5);
// console.log(lengths.map((length) => passwordGenerator5(length)));
