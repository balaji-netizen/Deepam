import { useState } from 'react'
import Button from '@/components/Button'

const questions = [
  { q: 'Sesame oil (gingelly oil) is considered the most auspicious for lighting diyas.', answer: true, fact: 'Sesame oil is known as "Nalla Ennai" (good oil) and holds the highest spiritual significance in lamp lighting traditions.' },
  { q: 'The lamp flame should ideally face east or north-east during morning prayers.', answer: true, fact: 'East is the direction of the rising sun and divine energy. Lamps facing east or northeast invite auspiciousness.' },
  { q: 'Lighting a lamp in the evening is called "Deepa Aradhana".', answer: false, fact: 'The evening lamp ritual is called "Sandhya Deepam" — lit at twilight to welcome the divine into the home.' },
  { q: 'Agarbattis should be placed pointing south during puja.', answer: false, fact: 'Incense should face the deity — typically east or north. South is considered inauspicious for offerings.' },
  { q: 'Karthigai month is considered the most sacred month for lamp lighting in Tamil tradition.', answer: true, fact: 'Karthigai Deepam, the festival of lamps, falls in this month. Even a single lamp lit then is said to yield immense merit.' },
  { q: 'A five-wick diya (Pancha Deepam) represents the five elements of nature.', answer: true, fact: 'The five flames represent Earth, Water, Fire, Air, and Space — the Pancha Bhoota that constitute all creation.' },
  { q: 'Ghee diyas should only be lit on festival days, not daily.', answer: false, fact: 'Ghee (clarified butter) diyas can and ideally should be lit daily — especially in temples and home shrines.' },
  { q: 'Incense smoke purifies the air and raises the spiritual vibration of a space.', answer: true, fact: 'Many agarbatti ingredients like sandalwood, camphor, and frankincense have antimicrobial properties confirmed by modern research.' },
  { q: 'The Tulsi plant is traditionally worshipped with a lamp on Thursday evenings.', answer: true, fact: "Thursday (Guruvar) and evenings are considered auspicious for Tulsi puja. A lamp lit before Tulsi invites Vishnu's blessings." },
  { q: 'Lamps should be extinguished by blowing them out with your mouth.', answer: false, fact: 'Sacred flames should never be extinguished by breath. Use your hand or a lamp snuffer — breath is considered impure for the flame.' },
]

type Answer = boolean | null

const getCoupon = (score: number) => {
  if (score >= 8) return { code: 'DHEEPAM20', level: 'Devotional Master', msg: 'You carry the wisdom of the ancients. Use code DHEEPAM20 for 20% off on your first order at Kaleesuwari.' }
  if (score >= 5) return { code: 'DHEEPAM15', level: 'Ritual Learner', msg: 'Your devotional knowledge grows with every flame you light. Use code DHEEPAM15 for 15% off.' }
  return { code: 'DHEEPAM10', level: 'Seeker of Light', msg: 'Every lamp begins with a single flame. Your journey starts here. Use code DHEEPAM10 for 10% off.' }
}

export default function DevotionalQuiz() {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>(Array(questions.length).fill(null))
  const [showFact, setShowFact] = useState(false)
  const [finished, setFinished] = useState(false)
  const [copied, setCopied] = useState(false)

  const score = answers.filter((a, i) => a === questions[i].answer).length
  const coupon = getCoupon(score)
  const isCorrect = answers[current] === questions[current].answer

  const handleAnswer = (val: boolean) => {
    if (showFact) return
    const updated = [...answers]; updated[current] = val
    setAnswers(updated); setShowFact(true)
  }

  const handleNext = () => {
    setShowFact(false)
    if (current < questions.length - 1) setCurrent(current + 1)
    else setFinished(true)
  }

  const restart = () => {
    setStarted(false); setFinished(false); setCurrent(0)
    setAnswers(Array(questions.length).fill(null)); setShowFact(false); setCopied(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(coupon.code).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="quiz" className="section relative overflow-hidden" style={{ background: '#F7E5DD' }}>
      {/* One decorative layer per section — the kolam texture is this one's */}
      <div className="pattern-kolam absolute inset-0" />

      <div className="shell-wide relative">
        <div className="grid12" style={{ rowGap: 56 }}>

          {/* Standing column: what the reward is, and how far along you are */}
          <div style={{ gridColumn: 'span 4' }}>
            <div className="eyebrow" data-anim="fade" style={{ marginBottom: 'var(--space-sm)' }}>The Reward</div>
            <h2 className="h3" data-anim="fade" data-delay="0.06" style={{ marginBottom: 20 }}>
              An exclusive coupon awaits
            </h2>
            <p className="body" data-anim="fade" data-delay="0.1">
              Score well and unlock a Dheepam discount code, redeemable on the
              Kaleesuwari store. Each answer reveals a devotional insight along the way.
            </p>
          </div>

          {/* Interactive panel */}
          <div style={{ gridColumn: '6 / span 7' }}>
            <div data-anim="fade" data-delay="0.14" style={{ background: '#FFFDF7', padding: 'clamp(28px, 4vw, 60px)' }}>

              {!started && !finished && (
                <div>
                  {/* The count is the hook — set as a display numeral against a
                      hairline rule rather than buried in the copy. */}
                  <div className="quiz-count">
                    <span className="quiz-count-num">{questions.length}</span>
                    <span className="micro quiz-count-label">
                      Questions
                      <span>True or false</span>
                    </span>
                  </div>
                  <h3 className="h3" style={{ marginBottom: 16 }}>Are You Ready?</h3>
                  <p className="body" style={{ marginBottom: 38, maxWidth: 430 }}>
                    Each answer reveals a devotional insight — and a special coupon
                    awaits you at the end.
                  </p>
                  <Button onClick={() => setStarted(true)} variant="solid">Start the Quiz</Button>
                </div>
              )}

              {started && !finished && (
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                    <span className="micro">
                      Question {String(current + 1).padStart(2, '0')} / {questions.length}
                    </span>
                    <span className="micro t-gold">
                      {answers.filter(a => a !== null).length} answered
                    </span>
                  </div>

                  <div style={{ height: 1, background: 'rgba(17,17,17,0.12)', marginBottom: 40 }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${((current + (showFact ? 1 : 0)) / questions.length) * 100}%`,
                        background: '#8F1D25',
                        transition: 'width .7s var(--ease-out-soft)',
                      }}
                    />
                  </div>

                  <h3 className="h3" style={{ marginBottom: 36, minHeight: 84 }}>{questions[current].q}</h3>

                  {!showFact && (
                    <div className="flex flex-wrap" style={{ gap: 14 }}>
                      <Button onClick={() => handleAnswer(true)} variant="outline" icon={false}>True</Button>
                      <Button onClick={() => handleAnswer(false)} variant="outline" icon={false}>False</Button>
                    </div>
                  )}

                  {showFact && (
                    <div>
                      <div style={{ paddingLeft: 22, borderLeft: `2px solid ${isCorrect ? '#C9A227' : '#F47A21'}`, marginBottom: 32 }}>
                        <p className="micro t-ink" style={{ marginBottom: 10 }}>
                          {isCorrect ? 'Correct' : 'Not quite'} — answer: {questions[current].answer ? 'True' : 'False'}
                        </p>
                        <p className="body">{questions[current].fact}</p>
                      </div>
                      <Button onClick={handleNext} variant="solid">
                        {current < questions.length - 1 ? 'Next Question' : 'See My Results'}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {finished && (
                <div>
                  <div className="flex items-baseline" style={{ gap: 16, marginBottom: 8 }}>
                    <span className="h1 t-maroon">{score}</span>
                    <span className="h3" style={{ color: '#6B6257' }}>/ {questions.length}</span>
                  </div>
                  <p className="micro" style={{ marginBottom: 10 }}>You are a</p>
                  <h3 className="h3" style={{ marginBottom: 18 }}>{coupon.level}</h3>
                  <p className="body" style={{ marginBottom: 36, maxWidth: 460 }}>{coupon.msg}</p>

                  <div
                    className="flex items-center justify-between flex-wrap"
                    style={{ gap: 18, padding: '26px 28px', border: '1px dashed rgba(201,162,39,0.7)', background: '#F5F1B5', marginBottom: 34 }}
                  >
                    <div>
                      <p className="micro" style={{ marginBottom: 6 }}>
                        Your Exclusive Coupon
                      </p>
                      <span className="h3" style={{ letterSpacing: '0.16em' }}>{coupon.code}</span>
                    </div>
                    <Button onClick={copyCode} variant="line" icon={false}>{copied ? 'Copied' : 'Copy Code'}</Button>
                  </div>

                  <div className="flex flex-wrap" style={{ gap: 16 }}>
                    <Button href="https://kaleesuwari.com" target="_blank" rel="noopener noreferrer" variant="gold">
                      Redeem on Kaleesuwari
                    </Button>
                    <Button onClick={restart} variant="line" icon={false}>Retake Quiz</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
