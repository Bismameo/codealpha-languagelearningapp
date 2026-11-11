"use client";

import { useEffect, useState } from "react";

const vocabulary = [
  { word: "sobremesa", pronunciation: "so-breh-MEH-sah", meaning: "time spent lingering at the table after a meal", type: "noun", example: "La sobremesa duró toda la tarde." },
  { word: "aprovechar", pronunciation: "ah-proh-veh-CHAR", meaning: "to make the most of; to take advantage of", type: "verb", example: "Aprovechamos el buen tiempo." },
  { word: "de repente", pronunciation: "deh reh-PEHN-teh", meaning: "suddenly; all of a sudden", type: "phrase", example: "De repente, empezó a llover." },
  { word: "la charla", pronunciation: "lah CHAR-lah", meaning: "a chat; a friendly conversation", type: "noun", example: "Tuvimos una charla muy agradable." },
];

const grammarCards = [
  { word: "ser", pronunciation: "sehr", meaning: "to be: identity, origin, and lasting traits", type: "verb · present", example: "Soy de México. — I’m from Mexico." },
  { word: "estar", pronunciation: "ehs-TAR", meaning: "to be: location, feelings, and changing states", type: "verb · present", example: "Estoy en casa. — I’m at home." },
  { word: "tener", pronunciation: "teh-NEHR", meaning: "to have; also used to talk about age", type: "verb · present", example: "Tengo veinte años. — I’m twenty." },
  { word: "voy a + verb", pronunciation: "boy ah", meaning: "use this pattern to talk about near-future plans", type: "grammar pattern", example: "Voy a estudiar. — I’m going to study." },
];

const phraseCards = [
  { word: "¿Qué tal?", pronunciation: "keh TAL", meaning: "How are you?; How’s it going?", type: "greeting", example: "¡Hola, Ana! ¿Qué tal?" },
  { word: "¿Te apetece?", pronunciation: "teh ah-peh-TEH-theh", meaning: "Do you feel like it?; Would you like to?", type: "invitation", example: "¿Te apetece un café?" },
  { word: "No pasa nada.", pronunciation: "no PAH-sah NAH-dah", meaning: "No worries.; It’s all right.", type: "expression", example: "Perdona. — No pasa nada." },
  { word: "Hasta luego.", pronunciation: "AHS-tah LWEH-goh", meaning: "See you later.", type: "farewell", example: "¡Gracias y hasta luego!" },
];

const quizQuestions = [
  { prompt: "We made the most of the sunny afternoon.", answer: "Aprovechamos la tarde soleada.", options: ["Aprovechamos la tarde soleada.", "Llegamos tarde a la cena.", "La sobremesa fue muy corta."] },
  { prompt: "What does “de repente” mean?", answer: "Suddenly", options: ["Carefully", "Suddenly", "Together"] },
  { prompt: "Choose the word for a friendly chat.", answer: "la charla", options: ["la mesa", "la charla", "el tiempo"] },
];

const categories = [
  { name: "Overview", icon: "grid" },
  { name: "Vocabulary", icon: "book" },
  { name: "Grammar", icon: "type" },
  { name: "Phrases", icon: "message" },
];

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20" /></>,
    type: <><path d="M4 7V4h16v3M12 4v16M8 20h8" /></>,
    message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /></>,
    sound: <><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    flame: <><path d="M8.5 14.5A4.5 4.5 0 0 0 13 19a4.5 4.5 0 0 0 4.5-4.5c0-2.5-1.5-4-3-5.5-.6 1.6-1.8 2.5-1.8 2.5S10.8 8.8 12 5c-3 2-7 5.5-7 9.5A8 8 0 0 0 13 22a8 8 0 0 0 8-8" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.6 9A7 7 0 0 1 18 6l2 1M4 17l2 1a7 7 0 0 0 12.4-3" /></>,
  };

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Overview");
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [progress, setProgress] = useState({ cardsLearned: 0, quizScore: 0, streak: 4 });
  const [hydrated, setHydrated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem("lingua-progress");
        if (saved) setProgress((current) => ({ ...current, ...JSON.parse(saved) }));
      } catch {
        window.localStorage.removeItem("lingua-progress");
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("lingua-progress", JSON.stringify(progress));
  }, [hydrated, progress]);

  const activeCards = activeCategory === "Grammar" ? grammarCards : activeCategory === "Phrases" ? phraseCards : vocabulary;
  const currentCard = activeCards[cardIndex];
  const currentQuestion = quizQuestions[questionIndex];
  const completedCount = Math.min(progress.cardsLearned, vocabulary.length);
  const displayCategory = activeCategory === "Overview" ? "Today’s lesson" : activeCategory;

  function playPronunciation(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  }

  function nextCard() {
    setCardIndex((index) => (index + 1) % activeCards.length);
    setRevealed(false);
    setProgress((current) => ({ ...current, cardsLearned: Math.min(current.cardsLearned + 1, vocabulary.length) }));
  }

  function startQuiz() {
    setQuestionIndex(0);
    setSelectedAnswer("");
    setQuizCorrect(0);
    setQuizComplete(false);
    setQuizOpen(true);
  }

  function answerQuestion(answer) {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === currentQuestion.answer) setQuizCorrect((score) => score + 1);
  }

  function nextQuestion() {
    if (questionIndex === quizQuestions.length - 1) {
      setQuizComplete(true);
      setProgress((current) => ({ ...current, quizScore: Math.max(current.quizScore, quizCorrect) }));
      return;
    }
    setQuestionIndex((index) => index + 1);
    setSelectedAnswer("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="Lingua home">
          <span className="brand-mark">l.</span><span>lingua<span className="brand-dot">.</span></span>
        </a>

        <div className="course-select">
          <span className="course-flag" aria-hidden="true">ES</span>
          <span className="course-copy"><strong>Spanish</strong><small>Beginner · A2</small></span>
          <span className="course-chevron">⌄</span>
        </div>

        <p className="nav-label">YOUR SPACE</p>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="learning-navigation"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        >
          <Icon name={mobileMenuOpen ? "close" : "menu"} size={20} />
        </button>

        <nav id="learning-navigation" className={`side-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Learning categories">
          <span className="mobile-nav-label">YOUR SPACE</span>
          {categories.map((category) => (
            <button className={`nav-item ${activeCategory === category.name ? "is-active" : ""}`} key={category.name} onClick={() => { setActiveCategory(category.name); setMobileMenuOpen(false); }}>
              <Icon name={category.icon} size={17} /><span>{category.name}</span>
              {category.name === "Vocabulary" && <span className="nav-count">24</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="streak-card">
            <div className="streak-heading"><span className="streak-flame"><Icon name="flame" size={17} /></span><span>On a roll</span></div>
            <strong>{progress.streak} day streak</strong>
            <div className="streak-days" aria-label="Four day learning streak"><i className="done" /><i className="done" /><i className="done" /><i className="done" /><i /><i /><i /></div>
            <small>Keep showing up. It adds up.</small>
          </div>
          <button className="profile-button" aria-label="Your profile"><span className="avatar">M</span><span className="profile-name"><strong>Marina Lee</strong><small>Free learner</small></span><span className="profile-more">···</span></button>
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div className="breadcrumb"><span>My learning</span><b>/</b><strong>{activeCategory}</strong></div>
          <div className="topbar-right"><span className="today-label">THURSDAY, OCT 15</span><button className="icon-button" aria-label="Open your profile"><span className="avatar avatar-small">M</span></button></div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">YOUR THURSDAY IN SPANISH</p>
              <h1>Hola, Marina<span>.</span></h1>
              <p className="welcome-copy">A little practice today goes a long way.</p>
            </div>
            <div className="daily-progress">
              <div className="progress-ring" style={{ "--progress": `${Math.min(100, completedCount * 25 + (progress.quizScore ? 25 : 0))}%` }}><span>{Math.min(100, completedCount * 25 + (progress.quizScore ? 25 : 0))}<small>%</small></span></div>
              <span><strong>Daily goal</strong><small>{Math.min(20, completedCount * 5 + (progress.quizScore ? 5 : 0))} of 20 min</small></span>
            </div>
          </section>

          <section className="lesson-banner">
            <div className="lesson-copy">
              <div className="lesson-kicker"><span className="live-dot" /> TODAY’S LESSON <span className="lesson-divider">·</span> 8 MIN</div>
              <h2>Little moments,<br />big conversations.</h2>
              <p>Learn the words that make everyday Spanish feel more natural.</p>
              <button className="light-button" onClick={() => { setActiveCategory("Vocabulary"); document.getElementById("study-area")?.scrollIntoView({ behavior: "smooth" }); }}>Pick up where you left off <Icon name="arrow" size={16} /></button>
            </div>
            <div className="lesson-art" role="img" aria-label="Sunlit Spanish courtyard with orange trees">
              <div className="art-sun" /><div className="art-window"><span /><span /><span /><span /></div><div className="art-plant plant-one"><i /><i /><i /><b /></div><div className="art-plant plant-two"><i /><i /><i /><b /></div><div className="art-table"><span /><i /></div><div className="art-tile" />
              <span className="art-caption">UN DÍA EN SEVILLA</span>
            </div>
          </section>

          <section className="stats-row" aria-label="Learning progress">
            <article className="stat-block"><span className="stat-icon green"><Icon name="book" size={17} /></span><div><strong>{24 + completedCount} <small>words</small></strong><span>Vocabulary learned</span></div><span className="stat-trend">+{completedCount || 2} this week</span></article>
            <article className="stat-block"><span className="stat-icon coral"><Icon name="flame" size={17} /></span><div><strong>{progress.streak} <small>days</small></strong><span>Current streak</span></div><span className="stat-trend">Personal best: 9</span></article>
            <article className="stat-block"><span className="stat-icon yellow"><Icon name="check" size={17} /></span><div><strong>{progress.quizScore ? `${Math.round((progress.quizScore / 3) * 100)}%` : "—"}</strong><span>Last quiz score</span></div><span className="stat-trend">3 questions</span></article>
          </section>

          <section className="learning-grid" id="study-area">
            <div className="study-column">
              <div className="section-heading"><div><p className="eyebrow">A SMALL DAILY RITUAL</p><h2>{displayCategory}</h2></div><button className="text-button" onClick={() => setActiveCategory("Vocabulary")}>All vocabulary <Icon name="arrow" size={15} /></button></div>
              <article className="flashcard">
                <div className="flashcard-top"><span className="word-count">WORD <b>{String(cardIndex + 1).padStart(2, "0")}</b> <i>/ {String(activeCards.length).padStart(2, "0")}</i></span><span className="part-of-speech">{currentCard.type}</span></div>
                <div className="flashcard-main">
                  <div className="word-line"><h3>{currentCard.word}</h3><button className="sound-button" aria-label={`Hear ${currentCard.word} pronounced`} onClick={() => playPronunciation(currentCard.word)}><Icon name="sound" size={20} /></button></div>
                  <p className="pronunciation">/{currentCard.pronunciation}/</p>
                  <div className={`definition ${revealed ? "definition-revealed" : ""}`}>
                    {revealed ? <><p>{currentCard.meaning}</p><span>{currentCard.example}</span></> : <p className="hidden-definition">Tap to reveal the meaning</p>}
                  </div>
                </div>
                <div className="flashcard-footer"><button className="reveal-button" onClick={() => setRevealed((value) => !value)}>{revealed ? "Hide meaning" : "Reveal meaning"}</button><button className="next-button" aria-label="Next word" onClick={nextCard}><Icon name="arrow" size={17} /></button></div>
              </article>
              <div className="card-pagination" aria-label={`Card ${cardIndex + 1} of ${activeCards.length}`}>
                {activeCards.map((item, index) => <button key={item.word} aria-label={`Show word ${index + 1}`} className={index === cardIndex ? "current" : ""} onClick={() => { setCardIndex(index); setRevealed(false); }} />)}
                <span>{completedCount} of 4 reviewed</span>
              </div>
            </div>

            <aside className="practice-column">
              <div className="section-heading"><div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Quick practice</h2></div></div>
              <article className="practice-card">
                <div className="practice-illustration"><div className="practice-paper"><span /><span /><span /></div><div className="practice-pencil" /><div className="practice-star">✳</div></div>
                <div className="practice-card-content"><span className="practice-tag">3 QUESTIONS · 2 MIN</span><h3>Put it into practice.</h3><p>A quick check-in helps new words stick for longer.</p><button className="dark-button" onClick={startQuiz}>Start a mini quiz <Icon name="arrow" size={16} /></button></div>
              </article>
              <div className="tip-row"><span className="tip-mark">“</span><p><strong>Try saying it out loud.</strong><br />Speaking a new word helps it stay with you.</p></div>
            </aside>
          </section>

          <section className="continue-section">
            <div className="section-heading"><div><p className="eyebrow">YOUR LEARNING PATH</p><h2>Keep the rhythm</h2></div><button className="text-button" onClick={() => setActiveCategory("Grammar")}>View study plan <Icon name="arrow" size={15} /></button></div>
            <div className="path-list">
              <button className="path-item path-complete" onClick={() => setActiveCategory("Vocabulary")}><span className="path-status"><Icon name="check" size={14} /></span><span className="path-info"><strong>Useful words for everyday life</strong><small>Vocabulary · 8 min</small></span><span className="path-state">COMPLETED</span></button>
              <button className="path-item" onClick={() => setActiveCategory("Grammar")}><span className="path-status path-number">02</span><span className="path-info"><strong>Present tense: the essentials</strong><small>Grammar · 12 min</small></span><span className="path-state next-up">UP NEXT</span></button>
              <button className="path-item" onClick={() => setActiveCategory("Phrases")}><span className="path-status path-number">03</span><span className="path-info"><strong>Making plans with friends</strong><small>Useful phrases · 6 min</small></span><span className="path-state">LOCKED</span></button>
            </div>
          </section>
          <footer className="page-footer"><span>Small steps, fluency follows.</span><span>Progress saved on this device</span></footer>
        </div>
      </main>

      {quizOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuizOpen(false); }}>
        <section className="quiz-dialog" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
          <button className="quiz-close icon-button" aria-label="Close quiz" onClick={() => setQuizOpen(false)}><Icon name="close" /></button>
          {quizComplete ? <div className="quiz-result"><div className="result-seal"><Icon name="check" size={30} /></div><p className="eyebrow">MINI QUIZ COMPLETE</p><h2 id="quiz-title">Nice work, Marina.</h2><p>You got <strong>{quizCorrect} out of {quizQuestions.length}</strong> correct. Every bit of practice counts.</p><button className="dark-button" onClick={() => setQuizOpen(false)}>Back to learning <Icon name="arrow" size={16} /></button><button className="retry-button" onClick={startQuiz}><Icon name="refresh" size={15} /> Try again</button></div> : <>
            <div className="quiz-heading"><p className="eyebrow">QUICK PRACTICE <span>·</span> {questionIndex + 1} OF {quizQuestions.length}</p><h2 id="quiz-title">{currentQuestion.prompt}</h2><div className="quiz-progress"><span style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }} /></div></div>
            <div className="answer-list">{currentQuestion.options.map((option, index) => {
              const isCorrect = selectedAnswer && option === currentQuestion.answer;
              const isWrong = selectedAnswer === option && option !== currentQuestion.answer;
              return <button key={option} className={`answer-option ${isCorrect ? "answer-correct" : ""} ${isWrong ? "answer-wrong" : ""}`} onClick={() => answerQuestion(option)} disabled={Boolean(selectedAnswer)}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{isCorrect && <Icon name="check" size={17} />}</button>;
            })}</div>
            {selectedAnswer && <div className={`answer-feedback ${selectedAnswer === currentQuestion.answer ? "feedback-correct" : "feedback-wrong"}`}>{selectedAnswer === currentQuestion.answer ? "¡Muy bien! That's right." : `Not quite. The answer is “${currentQuestion.answer}”`}</div>}
            <button className="dark-button quiz-next" disabled={!selectedAnswer} onClick={nextQuestion}>{questionIndex === quizQuestions.length - 1 ? "See my results" : "Next question"} <Icon name="arrow" size={16} /></button>
          </>}
        </section>
      </div>}
    </div>
  );
}
