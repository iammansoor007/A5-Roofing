import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { id: 1, question: "What type of property is this for?", options: ["Residential", "Commercial", "Industrial", "Historic/Heritage"] },
  { id: 2, question: "What's the primary concern?", options: ["New Installation", "Repair", "Inspection", "Maintenance Program"] },
  { id: 3, question: "What's your preferred timeline?", options: ["Urgent (< 1 week)", "Soon (1–4 weeks)", "Planning (1–3 months)", "Flexible"] },
];

const QAForm = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const completed = step >= questions.length;

  const selectAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[step].id]: answer }));
    setTimeout(() => setStep((s) => s + 1), 300);
  };

  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="accent-line mx-auto mb-6" />
          <h2 className="heading-md text-foreground">Tell Us About Your Project.</h2>
          <p className="body-sm text-muted-foreground mt-4">Step {Math.min(step + 1, questions.length)} of {questions.length}</p>
        </div>

        <div className="h-px bg-foreground/15 mb-12 relative">
          <motion.div className="absolute top-0 left-0 h-full bg-foreground" animate={{ width: `${(step / questions.length) * 100}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
        </div>

        <div className="min-h-[280px] relative">
          <AnimatePresence mode="wait">
            {completed ? (
              <motion.div key="done" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="text-center py-8">
                <h3 className="heading-md text-foreground mb-4">Thank You.</h3>
                <p className="body-lg text-muted-foreground mb-8">Our team will prepare a tailored response.</p>
                <motion.a href="#contact" className="inline-flex items-center gap-3 bg-foreground text-primary px-8 py-4 font-heading font-medium tracking-tight" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>Complete Your Inquiry</motion.a>
              </motion.div>
            ) : (
              <motion.div key={step} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <h3 className="heading-md text-foreground mb-8 text-center">{questions[step].question}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[step].options.map((opt) => (
                    <motion.button key={opt} onClick={() => selectAnswer(opt)}
                      className={`text-left p-6 border transition-all duration-300 font-body ${
                        answers[questions[step].id] === opt ? "border-foreground bg-foreground/10 text-foreground" : "border-foreground/20 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                      }`} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default QAForm;
