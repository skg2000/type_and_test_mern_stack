export const fetchTypingText = async () => {
  try {
    const response = await fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1");
    const data = await response.json();
    return data[0]; // Return the paragraph
  } catch (error) {
    return "Typing is a skill that improves with consistent practice and focus. Each day you spend improving your accuracy and speed adds to your efficiency. Mistakes are a part of learning, and overcoming them helps you become faster. Take a deep breath, sit comfortably, and begin your journey to typing mastery.Remember, it's not about racing to the finish but building muscle memory and confidence.Keep pushing forward and challenge yourself one word at a time. ( Offline Fallback text) ";
  }
};

