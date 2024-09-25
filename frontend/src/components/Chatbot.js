import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaRobot } from "react-icons/fa"; // Bot ikonu için FontAwesome
import { MdPerson } from "react-icons/md"; // Kullanıcı ikonu için Material Icons
import "../App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [firstQuestionDisplayed, setFirstQuestionDisplayed] = useState(false);

  // Scroll için referans
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchQuestions = useCallback(async () => {
    const response = await fetch("http://localhost:5000/responses/questions");
    const data = await response.json();
    setQuestions(data.questions);
  }, []);

  useEffect(() => {
    const startSession = async () => {
      const response = await fetch("http://localhost:5000/responses/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "user123" }),
      });

      if (response.ok) {
        setSessionStarted(true);
        await fetchQuestions();
      } else {
        console.error("Failed to start session");
      }
    };

    startSession();
  }, [fetchQuestions]);

  useEffect(() => {
    if (questions.length > 0 && !firstQuestionDisplayed) {
      addBotMessage(questions[0]);
      setFirstQuestionDisplayed(true);
    }
  }, [questions, firstQuestionDisplayed]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userAnswer.trim() === "") return;

    addUserMessage(userAnswer);

    if (step < questions.length - 1) {
      setStep(step + 1);
      addBotMessage(questions[step + 1]);
    } else {
      addBotMessage("Thank you for answering all the questions!");
    }

    setUserAnswer("");
  };

  const addUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);
  };

  const addBotMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: message },
    ]);
  };

  return (
    <div className="chat-container">
      <h1>Bolt Chatbot</h1>
      <div className="message-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="icon">
              {msg.sender === "bot" ? <FaRobot /> : <MdPerson />}
            </div>
            <div className="content">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {sessionStarted && (
        <form onSubmit={handleSubmit} className="input-box">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default Chatbot;
