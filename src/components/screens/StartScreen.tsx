import { useEffect, useState } from 'react';
import { LEVELS, CATEGORIES } from '../../data/levels';
import { getAllHighScores } from '../../hooks/useHighScore';
import type { Category } from '../../types/game';

interface Props {
  onStart: (levelIndex: number) => void;
}

const DIFF_COLORS: Record<string, string> = {
  Easy:   'diff--easy',
  Medium: 'diff--medium',
  Hard:   'diff--hard',
};

export function StartScreen({ onStart }: Props) {
  const [scores, setScores] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  useEffect(() => {
    setScores(getAllHighScores(LEVELS.length));
  }, []);

  const popularLevels = LEVELS.filter(l => l.popular);
  const filteredLevels = activeCategory === 'all'
    ? LEVELS
    : LEVELS.filter(l => l.category === activeCategory);

  return (
    <div className="start-screen">
      {/* ── HERO ── */}
      <header className="hero" role="banner">
        <div className="hero__logo" aria-hidden="true">🔍</div>
        <h1 className="hero__title">Spot the Difference</h1>
        <p className="hero__subtitle">Find all 5 hidden differences between two images. Free puzzles for all ages!</p>
      </header>

      {/* ── POPULAR / FEATURED ── */}
      <section aria-label="Popular games" className="section">
        <h2 className="section__heading">
          <span className="section__heading-icon">🔥</span> Most Popular
        </h2>
        <div className="popular-grid">
          {popularLevels.map((level) => {
            const globalIndex = LEVELS.indexOf(level);
            const score = scores[globalIndex] ?? 0;
            return (
              <button
                key={level.id}
                className="popular-card"
                onClick={() => onStart(globalIndex)}
                aria-label={`Play ${level.title} – ${level.difficulty}`}
              >
                <div className="popular-card__emoji">{level.emoji}</div>
                <div className="popular-card__body">
                  <span className="popular-card__title">{level.title}</span>
                  <div className="popular-card__meta">
                    <span className={`badge ${DIFF_COLORS[level.difficulty]}`}>{level.difficulty}</span>
                    <span className="meta-text">{level.differences.length} differences</span>
                  </div>
                  {score > 0 && <span className="popular-card__score">⭐ {score} pts</span>}
                </div>
                <span className="popular-card__play" aria-hidden="true">▶</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section aria-label="Game categories" className="section">
        <h2 className="section__heading">
          <span className="section__heading-icon">🎮</span> Browse by Category
        </h2>
        <div className="category-tabs" role="tablist" aria-label="Filter by category">
          <button
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`cat-tab ${activeCategory === 'all' ? 'cat-tab--active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {CATEGORIES.map(cat => {
            const count = LEVELS.filter(l => l.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`cat-tab ${activeCategory === cat.id ? 'cat-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.id as Category)}
              >
                {cat.emoji} {cat.label}
                <span className="cat-tab__count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="level-grid">
          {filteredLevels.map(level => {
            const globalIndex = LEVELS.indexOf(level);
            const score = scores[globalIndex] ?? 0;
            return (
              <article key={level.id} className="level-card" aria-label={`${level.title} puzzle`}>
                <div className="level-card__top">
                  <span className="level-card__emoji" aria-hidden="true">{level.emoji}</span>
                  <span className={`badge ${DIFF_COLORS[level.difficulty]}`}>{level.difficulty}</span>
                </div>
                <h3 className="level-card__title">{level.title}</h3>
                <p className="level-card__desc">{level.description}</p>
                <div className="level-card__meta">
                  <span className="meta-text">⏱ 3 min</span>
                  <span className="meta-text">🎯 {level.differences.length} diffs</span>
                  <span className="meta-text">💡 3 hints</span>
                </div>
                {score > 0 && <div className="level-card__score">⭐ Best: {score} pts</div>}
                <button
                  className="level-card__btn"
                  onClick={() => onStart(globalIndex)}
                  aria-label={`Play ${level.title}`}
                >
                  Play Now
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── SEO TEXT ── */}
      <section className="seo-text" aria-label="About spot the difference games">
        <h2>Play Spot the Difference Games Online – Free &amp; No Download</h2>
        <p>
          Welcome to the best collection of free <strong>spot the difference games</strong> online!
          Our puzzles challenge you to compare two seemingly identical images and find every hidden difference.
          With categories including <strong>sports</strong>, nature, space, fantasy and more,
          there is always a new brain puzzle to solve.
        </p>
        <p>
          Each <strong>spot the difference puzzle</strong> features 5 carefully hidden differences,
          a 3-minute timer, and a scoring system that rewards speed and accuracy.
          Use hints wisely — they reveal a difference but reduce your score.
          Can you find all 5 with a perfect score?
        </p>
        <h3>Why Play Spot the Difference?</h3>
        <ul>
          <li><strong>Sharpen your focus</strong> – training attention to detail and visual memory</li>
          <li><strong>Stress-free fun</strong> – relaxing brain exercises for all ages</li>
          <li><strong>Mobile-friendly</strong> – play on any device, anywhere, anytime</li>
          <li><strong>New puzzles added regularly</strong> – sports, anime, celebrities and more coming soon</li>
        </ul>
      </section>

      {/* ── FAQ ── */}
      <section className="faq" aria-label="Frequently asked questions">
        <h2 className="faq__title">Frequently Asked Questions</h2>
        <div className="faq__list">
          {[
            {
              q: 'How do you play spot the difference?',
              a: 'Two nearly identical images are shown side by side. Click (or tap) on an area where you notice a difference. Find all 5 differences before time runs out to win!',
            },
            {
              q: 'Are these spot the difference games free?',
              a: 'Yes! Every puzzle on this site is 100% free to play. No download, no registration, no payment required.',
            },
            {
              q: 'How many differences are in each puzzle?',
              a: 'Every level has exactly 5 differences to find. You have 3 minutes and up to 3 hints per puzzle.',
            },
            {
              q: 'Can I play on my phone or tablet?',
              a: 'Absolutely. The games are designed mobile-first and work on all modern smartphones and tablets — just tap the differences!',
            },
            {
              q: 'What categories of puzzles are available?',
              a: 'Current categories include Sports (soccer, basketball, tennis), Nature, Space, and Fantasy. Celebrities and Anime levels are coming soon!',
            },
            {
              q: 'How is the score calculated?',
              a: 'You start with 1,000 base points. You lose 10 points per second elapsed and 50 points per hint used. Find all differences quickly without hints for the highest score!',
            },
          ].map(({ q, a }, i) => (
            <details key={i} className="faq__item">
              <summary className="faq__question">{q}</summary>
              <p className="faq__answer">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>Free spot the difference games · No download needed · Play on any device</p>
      </footer>
    </div>
  );
}
