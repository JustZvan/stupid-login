import { useState } from "react";
import * as React from "react";

function generateRandomHexCodes(count = 100) {
  const hexCodes = [];
  for (let i = 0; i < count; i++) {
    const randomColor = Math.floor(Math.random() * 0xffffff);
    const hexCode = `#${randomColor.toString(16).padStart(6, "0")}`;
    hexCodes.push(hexCode.toUpperCase());
  }
  return hexCodes;
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

function App() {
  const [stage, setStage] = useState({
    username: false,
    email: false,
    password: false,
    colorSecurityQ: false,
    gamblingSecurityQ: false,
  });

  return (
    <main className="py-4 h-screen w-screen flex flex-col gap-8">
      <h1 className="text-4xl text-center">Welcome to T̵̼͍̤̝̃͋̒͆H̴̬̭̹͖̙̽́̐͝͝E̴̖͕͉̥̎̈́ͅ ̶̻̣̏͛͛̊Ẅ̸̙͈͖̝̝́͐E̴̺̤͓͎̫̓B̵̢̖̎̒S̷̹̻͍̬̈́̃͑͠͝Ḭ̷̛T̸̘̬̭̹̱̊͆̕͝E̸͈̕</h1>

      <div className="w-full h-full flex flex-col items-center gap-4">
        <Input
          placeholder="Enter username"
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setStage({ ...stage, username: true });
            }
          }}
        />

        {stage.username && (
          <Input
            placeholder="Enter email"
            onChange={(e) => {
              const emailRegex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              // big thanks to https://emailregex.com/ for the regex

              if (emailRegex.test(e.target.value)) {
                setStage({ ...stage, email: true });
              }
            }}
          />
        )}

        {stage.email && (
          <Input
            placeholder="Enter password"
            type="password"
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setStage({ ...stage, password: true });
              }
            }}
          />
        )}

        {stage.password && (
          <div className="flex flex-col gap-4">
            <div className="text-xl text-center mb-2">Security questions</div>

            <Dropdown
              placeholder="What's your favorite color?"
              options={hexCodes}
              onChange={(e) => {
                setStage({ ...stage, colorSecurityQ: true });
              }}
            />

            {stage.colorSecurityQ && (
              <Dropdown
                placeholder="100,000$, Red or black"
                options={["Red", "Black", "gambling is bad"]}
                onChange={(e) => {
                  if (e.target.value == "gambling is bad") {
                    alert("wrong answer buddy");

                    e.target.value = "Red";

                    return;
                  }

                  setStage({ ...stage, gamblingSecurityQ: true });
                }}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
