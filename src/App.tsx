import { useState } from "react";
import * as React from "react";
import { FaCheck } from "react-icons/fa6";
import bsodImage from "./assets/bsod.png";

function generateRandomHexCodes(count = 100) {
  const hexCodes = [];
  for (let i = 0; i < count; i++) {
    const randomColor = Math.floor(Math.random() * 0xffffff);
    const hexCode = `#${randomColor.toString(16).padStart(6, "0")}`;
    hexCodes.push(hexCode.toUpperCase());
  }
  return hexCodes;
}

function Checkbox({
  text,
  onChange,
  checked,
}: {
  text: string;
  onChange: (value: boolean) => void;
  checked: boolean;
}) {
  return (
    <div className="flex gap-2">
      <button
        className="bg-zinc-800 rounded w-6 aspect-square flex items-center justify-center"
        onClick={() => onChange(!checked)}
      >
        {checked && <FaCheck className="text-white" />}
      </button>

      <div className="text-zinc-400">{text}</div>
    </div>
  );
}

function Input({
  onChange,
  placeholder,
  type,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type || "text"}
      className="w-96 py-3 px-4 rounded-full bg-zinc-800"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

function Dropdown({
  onChange,
  options,
  placeholder,
}: {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      className="w-96 py-3 px-4 rounded-full bg-zinc-800 text-white appearance-none"
      onChange={onChange}
      defaultValue=""
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

const hexCodes = generateRandomHexCodes();

const stageConfig = [
  {
    id: "username",
    type: "input",
    placeholder: "Enter username",
    validator: (value: string) => value.length > 0,
  },
  {
    id: "email",
    type: "input",
    placeholder: "Enter email",
    validator: (value: string) => {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(value);
    },
  },
  {
    id: "password",
    type: "input",
    inputType: "password",
    placeholder: "Enter password",
    validator: (value: string) => value.length > 0,
  },
  {
    id: "securityHeader",
    type: "header",
    text: "Security questions",
  },
  {
    id: "colorSecurityQ",
    type: "dropdown",
    placeholder: "What's your favorite color?",
    options: hexCodes,
    validator: (value: string) => value.length > 0,
  },
  {
    id: "gamblingSecurityQ",
    type: "dropdown",
    placeholder: "100,000$, Red or black",
    options: ["Red", "Black", "gambling is bad"],
    validator: (value: string) => value !== "gambling is bad",
    onInvalidValue: (e: React.ChangeEvent<HTMLSelectElement>) => {
      alert("wrong answer buddy");
      e.target.value = "Red";
    },
  },
  {
    id: "captcha",
    type: "input",
    placeholder: "Prove you're human: What's 9 + 10?",
    validator: (value: string) => {
      console.log(value);

      return value === "21";
    },
  },
  {
    id: "philosophyQuestion",
    type: "dropdown",
    placeholder: "What is the meaning of life?",
    options: ["42", "To be or not to be", "Pineapple"],
    validator: (value: string) => value === "42",
    onInvalidValue: () => {
      alert("Wrong answer! Try again.");
    },
  },
  {
    id: "mysteryCheckbox",
    type: "checkbox",
    text: "I solemnly swear I am up to no good",
  },
  {
    id: "timeTravel",
    type: "input",
    placeholder: "Enter the year you were born (or will be born)",
    validator: (value: string) => {
      const year = parseInt(value, 10);
      return year > 1900 && year < 3000;
    },
    onInvalidValue: () => {
      alert("That doesn't seem like a valid year.");
    },
  },
  {
    id: "riddle",
    type: "input",
    placeholder: "What has keys but can't open locks?",
    validator: (value: string) => value.toLowerCase() === "keyboard",
    onInvalidValue: () => {
      alert("Think harder! It's something you use every day.");
    },
  },
  {
    id: "colorGuess",
    type: "dropdown",
    placeholder: "Guess the secret color",
    options: ["Red", "Blue", "Green", "Yellow"],
    validator: (value: string) => value === "Blue",
    onInvalidValue: (e: React.ChangeEvent<HTMLSelectElement>) => {
      alert("Nope, try again!");
      e.target.value = "";
    },
  },
  {
    id: "tos",
    type: "checkbox",
    text: "I agree to the terms of service",
  },
  {
    id: "pineappleOnPizza",
    type: "checkbox",
    text: "I agree that pineapple on pizza is good",
  },
  {
    id: "signupButton",
    type: "button",
    text: "Sign up",
    className: "bg-red-500 w-96 p-4 rounded-full",
    onClick: () => {
      window.location.reload();
    },
  },
];

function App() {
  const [completedStages, setCompletedStages] = useState<Set<string>>(
    new Set()
  );

  const [showBsod, setShowBsod] = useState(false);

  const completeStage = (stageId: string) => {
    setCompletedStages((prev) => new Set([...prev, stageId]));
  };

  const isStageVisible = (index: number) => {
    if (index === 0) return true;

    for (let i = 0; i < index; i++) {
      const prevStage = stageConfig[i];
      if (prevStage.type !== "header" && !completedStages.has(prevStage.id)) {
        return false;
      }
    }
    return true;
  };

  const renderStage = (stage: any, index: number) => {
    if (!isStageVisible(index)) return null;

    switch (stage.type) {
      case "input":
        return (
          <Input
            key={stage.id}
            placeholder={stage.placeholder}
            type={stage.inputType}
            onChange={(e) => {
              if (stage.validator(e.target.value)) {
                completeStage(stage.id);
              }
            }}
          />
        );

      case "dropdown":
        return (
          <Dropdown
            key={stage.id}
            placeholder={stage.placeholder}
            options={stage.options}
            onChange={(e) => {
              if (stage.onInvalidValue && !stage.validator(e.target.value)) {
                stage.onInvalidValue(e);
                return;
              }
              if (stage.validator(e.target.value)) {
                completeStage(stage.id);
              }
            }}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            key={stage.id}
            text={stage.text}
            onChange={(checked) => {
              if (checked) {
                completeStage(stage.id);
              } else {
                setCompletedStages((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(stage.id);
                  return newSet;
                });
              }
            }}
            checked={completedStages.has(stage.id)}
          />
        );

      case "header":
        return (
          <div key={stage.id} className="text-xl text-center mb-2">
            {stage.text}
          </div>
        );

      case "button":
        return (
          <button
            key={stage.id}
            className={stage.className}
            onClick={() => setShowBsod(true)}
          >
            {stage.text}
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <main className="py-4 h-screen w-screen flex flex-col gap-8">
      {showBsod ? (
        <div className="w-screen h-screen flex items-center justify-center absolute left-0 top-0">
          <img
            src={bsodImage}
            alt="BSOD"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <>
          <h1 className="text-4xl text-center">Welcome to T̵̼͍̤̝̃͋̒͆H̴̬̭̹͖̙̽́̐͝͝E̴̖͕͉̥̎̈́ͅ ̶̻̣̏͛͛̊Ẅ̸̙͈͖̝̝́͐E̴̺̤͓͎̫̓B̵̢̖̎̒S̷̹̻͍̬̈́̃͑͠͝Ḭ̷̛T̸̘̬̭̹̱̊͆̕͝E̸͈̕</h1>

          <div className="w-full h-full flex flex-col items-center gap-4">
            {stageConfig.map((stage, index) => renderStage(stage, index))}
          </div>
        </>
      )}
    </main>
  );
}

export default App;
