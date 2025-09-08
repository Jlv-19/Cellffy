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
  // ... add the rest of your questions here
];

// Get 10 random questions every time the page loads
const questions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
