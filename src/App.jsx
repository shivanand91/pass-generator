import { useCallback, useState, useEffect } from "react"

function App() {
  const [length, setLength] = useState(12)
  const [password, setPassword] = useState("")
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charactersAllowed, setCharactersAllowed] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) str += "0123456789"
    if (charactersAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?/~`"
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charactersAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charactersAllowed, generatePassword])

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 transition-all duration-1000">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 flex flex-col items-center animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg tracking-wide animate-slideDown">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Password Generator
          </span>
        </h1>
        <div className="flex items-center w-full mb-6">
          <input
            type="text"
            readOnly
            value={password}
            className="flex-1 text-lg font-mono bg-white/70 text-gray-800 rounded-l-xl p-3 outline-none border-none transition-all duration-300 focus:ring-2 focus:ring-pink-400"
            style={{ letterSpacing: "0.1em" }}
          />
          <button
            onClick={handleCopy}
            className={`bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold px-5 py-3 rounded-r-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
              copied ? "animate-bounce" : ""
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <label className="text-white font-medium">Length</label>
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-48 accent-pink-500"
            />
            <span className="text-pink-200 font-bold text-lg w-8 text-center">{length}</span>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={(e) => setNumberAllowed(e.target.checked)}
                className="accent-indigo-500 w-5 h-5 transition-all duration-300"
              />
              Numbers
            </label>
            <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={charactersAllowed}
                onChange={(e) => setCharactersAllowed(e.target.checked)}
                className="accent-pink-500 w-5 h-5 transition-all duration-300"
              />
              Symbols
            </label>
            <button
              onClick={generatePassword}
              className="ml-auto bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300 animate-pulse"
            >
              Regenerate
            </button>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease;
        }
        .animate-slideDown {
          animation: slideDown 1s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-40px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  )
}

export default App
