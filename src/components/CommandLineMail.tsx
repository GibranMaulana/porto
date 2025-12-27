import { useState, useEffect } from 'react';

const CommandLineMail = () => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("READY"); // READY, ERROR, SENT, COOLDOWN
  const [placeholder, setPlaceholder] = useState("type_message_here...");

  useEffect(() => {
    if (status === "ERROR") {
      const timer = setTimeout(() => {
        setStatus("READY");
        setPlaceholder("type_message_here...");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "COOLDOWN" || status === "SENT") return;

    if (!input.trim()) {
      setStatus("ERROR");
      setPlaceholder("ERROR: INPUT_VOID");
      setInput("");
      return;
    }

    const safeBody = encodeURIComponent(input);
    const safeSubject = encodeURIComponent("Incoming Transmission [Footer]");

    window.location.href = `mailto:narbiganaluam@gmail.com?subject=${safeSubject}&body=${safeBody}`;

    setStatus("SENT");
    setInput("");
    setPlaceholder("MESSAGE_INITIATED...");
    
    setTimeout(() => {
      setStatus("READY");
      setPlaceholder("type_message_here...");
    }, 5000);
  };

  return (
    <div className="w-full max-w-sm font-space">
      <div className="flex justify-between items-end mb-2">
        <p className="text-xs text-tertiary">
          {"> SEND_MESSAGE"}
        </p>
        <p className={`text-[10px] ${status === "ERROR" ? "text-red-500" : "text-accent"}`}>
          [{status}]
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <span className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${status === "ERROR" ? "text-red-500" : "text-accent"}`}>
          $
        </span>
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={status === "COOLDOWN" || status === "SENT"}
          className={`
            w-full bg-transparent border py-2 pl-8 pr-12 text-sm font-mono transition-all outline-none
            ${status === "ERROR" 
              ? "border-red-500 text-red-500 placeholder-red-500/50" 
              : "border-tertiary/30 text-white placeholder-tertiary/50 focus:border-accent"
            }
            ${status === "SENT" ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />

        <button 
          type="submit"
          disabled={status !== "READY"}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-tertiary hover:text-accent disabled:opacity-0 transition-all"
        >
          [ENTER]
        </button>
      </form>
    </div>
  );
};

export default CommandLineMail;