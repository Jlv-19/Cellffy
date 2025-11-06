const allQuestions = [
  {
    question: "The theme for International Co-operative Day 2025 was ______.",
    options: [
      "Co-operatives Build a Better Future for All",
      "Co-operatives for Sustainable Development",
      "Co-operatives Build a Better World",
      "Co-operatives: Driving Inclusive and Sustainable Solutions for a Better World"
    ],
    answer: 3
  },
  {
    question: "Who is described as a man who was 'Rich in ideals but poor in Performance'?",
    options: ["Dr. William King", "Robert Owen", "Luzzatti", "Raiffeisen"],
    answer: 1
  },
  {
    question: "Who formed the Brighton Co-operative Benevolent Fund Association?",
    options: ["William King", "Robert Owen", "Raiffeisen", "Hudson Kelly"],
    answer: 0
  },
  {
    question: "Co-operative Bacon Factory is associated with the Co-operative movement of ______.",
    options: ["Germany", "England", "Denmark", "China"],
    answer: 2
  },
  {
    question: "Who was the Chairman of the Agricultural Finance Sub-Committee appointed in 1944?",
    options: ["Herman Schultze", "Fredrick Nicholsen", "Prof. D. R. Gadgil", "H. C. Sonne"],
    answer: 2
  },
  {
    question: "The foundation stone of Tribhuvan Sahakari University was laid on ______.",
    options: ["November 14, 2024", "January 1, 2025", "June 12, 2025", "July 5, 2025"],
    answer: 3
  },
  {
    question: "How many members shall be elected by 'A' class members in Kerala State Co-operative Bank?",
    options: ["12", "14", "15", "17"],
    answer: 2
  },
  {
    question: "Who was the Chairman of NAFSCOB during the 103rd International Co-operative Day?",
    options: ["Konduru Ravinder Rao", "Dileep Sanghani", "Dr. Bijender Singh", "Ashok Bandyopadhyay"],
    answer: 0
  },
  {
    question: "NUCFDC obtained registration from RBI in:",
    options: ["May 1977", "February 2024", "March 2025", "September 2020"],
    answer: 1
  },
  {
    question: "Who records the minutes of Co-operative society meetings?",
    options: [
      "President",
      "Any member of the committee",
      "CEO of the society",
      "President, committee member, or CEO"
    ],
    answer: 3
  },
  {
    question: "The Kerala State Legislative Assembly building is located _______ Palayam ______ Thiruvananthapuram.",
    options: ["at, in", "at, at", "in, at", "in, in"],
    answer: 0
  },
  {
    question: "Identify the grammatically correct sentence.",
    options: [
      "The assistant as well as the secretary are attending a meeting.",
      "The secretary as well as the assistants is attending a meeting.",
      "The assistants as well as the secretary is attending a meeting.",
      "The secretary as well as the assistant are attending a meeting."
    ],
    answer: 1
  },
  {
    question: "They will take the examination, ______.",
    options: ["isn't it?", "will they?", "will they not?", "won't they?"],
    answer: 3
  },
  {
    question: "We cannot live without oxygen. Which is the correct question form?",
    options: [
      "Can we not live without any oxygen?",
      "Who can live without oxygen?",
      "Can we live without oxygen?",
      "Can't we live with no oxygen?"
    ],
    answer: 2
  },
  {
    question: "Find the part of the sentence that contains an error:\n\"While I was complaining of loneliness, I realized that that yard seemed empty and deserted was full of life.\"",
    options: [
      "While I was complaining of loneliness",
      "I realized that",
      "that yard seemed",
      "empty and deserted was full of life"
    ],
    answer: 3
  },
  {
    question: "Which of the following sentences is grammatically incorrect?",
    options: [
      "She is waiting for your reply since two years.",
      "She has been waiting for your reply since 2023.",
      "She has waited for your reply for two years now.",
      "She has been waiting for your reply for two years."
    ],
    answer: 0
  },
  {
    question: "People speak English all over the world.",
    options: [
      "English is spoken all over the world by people.",
      "English is spoken by people all over the world.",
      "All over the world English is spoken by people.",
      "English is spoken all over the world."
    ],
    answer: 3
  },
  {
    question: "Ahamed is smarter than Mohammed. Which sentence means the same?",
    options: [
      "Ahamed is as smart as Mohammed.",
      "Ahamed is not as smart as Mohammed.",
      "Mohammed is as smart as Ahamed.",
      "Mohammed is not as smart as Ahamed."
    ],
    answer: 3
  },
  {
    question: "What does the phrasal verb 'to pass out' mean?",
    options: [
      "To become successful.",
      "To faint or lose consciousness.",
      "To complete a course of study.",
      "To fail an examination."
    ],
    answer: 1
  },
  {
    question: "One who loves mankind and works for human welfare.",
    options: ["Philanthropist", "Bibliophile", "Anglophile", "Anthropologist"],
    answer: 0
  },

  // ... add the rest of your questions here
];

// Get 10 random questions every time the page loads
const questions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
