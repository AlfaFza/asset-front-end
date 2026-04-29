import { useState } from "react";

function Tickets() {
  const [issue, setIssue] = useState("");

  const handleSubmit = () => {
    console.log("Ticket created:", issue);
    setIssue("");
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">Create Ticket</h2>

      <textarea
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

    </div>
  );
}

export default Tickets;