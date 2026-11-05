"use client";

import { useState } from "react";
import { DemoHeading, DemoStatus } from "./Shared";

const exercises = [
  {
    title: "Inspect before you commit",
    prompt:
      "You changed a file. Which command tells you what is modified or staged?",
    code: "$ git status\nOn branch feature/course-update\nChanges not staged for commit:\n  modified: lesson.md",
    answers: ["git status", "git push --force", "git clone"],
    correct: "git status",
    explanation:
      "git status shows the working tree and staging area. It does not publish or discard your changes.",
  },
  {
    title: "Give the change its own branch",
    prompt:
      "You are about to start a new change. How do you create and switch to a feature branch?",
    code: "$ git switch -c feature/course-update\nSwitched to a new branch\n'feature/course-update'",
    answers: [
      "git reset --hard",
      "git switch -c feature/course-update",
      "git log",
    ],
    correct: "git switch -c feature/course-update",
    explanation:
      "A dedicated branch keeps the change separate while you work and gives a reviewer a focused comparison.",
  },
  {
    title: "Make the review useful",
    prompt: "Your change is ready. What should accompany the merge request?",
    code: "Change: clarify the setup exercise\nReason: make the next action explicit\nChecked: lesson, quiz and links",
    answers: [
      "Only a title",
      "A description of the change and what you checked",
      "A request to merge without review",
    ],
    correct: "A description of the change and what you checked",
    explanation:
      "Explain the change and the checks you ran so a reviewer can judge both intent and behavior.",
  },
];

export default function TrainingDemo() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const exercise = exercises[step];
  const correct = answer === exercise.correct;
  return (
    <div className="demo-split">
      <div className="demo-main">
        <DemoHeading
          title={finished ? "Exercise complete" : exercise.title}
          detail={`Original sample lesson · Step ${step + 1} of ${exercises.length}`}
        />
        {finished ? (
          <>
            <DemoStatus tone="success">
              You inspected a change, chose a branch workflow and prepared a
              useful review. This sample does not record a course completion.
            </DemoStatus>
            <button
              className="demo-secondary"
              onClick={() => {
                setStep(0);
                setAnswer("");
                setChecked(false);
                setFinished(false);
              }}
            >
              Try the exercise again
            </button>
          </>
        ) : (
          <>
            <p>{exercise.prompt}</p>
            <fieldset className="demo-answer-options">
              <legend className="sr-only">Choose an answer</legend>
              {exercise.answers.map((value) => (
                <label key={value} data-selected={answer === value}>
                  <input
                    type="radio"
                    name="training-answer"
                    checked={answer === value}
                    onChange={() => {
                      setAnswer(value);
                      setChecked(false);
                    }}
                  />
                  {value}
                </label>
              ))}
            </fieldset>
            <div className="demo-actions">
              <button
                className="demo-button"
                disabled={!answer}
                onClick={() => setChecked(true)}
              >
                Check answer
              </button>
              {checked && correct && (
                <button
                  className="demo-secondary"
                  onClick={() => {
                    if (step === exercises.length - 1) setFinished(true);
                    else {
                      setStep(step + 1);
                      setAnswer("");
                      setChecked(false);
                    }
                  }}
                >
                  {step === exercises.length - 1
                    ? "Finish exercise"
                    : "Next step"}
                </button>
              )}
            </div>
            {checked && (
              <DemoStatus tone={correct ? "success" : "warning"}>
                {correct
                  ? exercise.explanation
                  : "That does not solve this step. Read the example and try another answer."}
              </DemoStatus>
            )}
          </>
        )}
      </div>
      <div className="demo-aside">
        <h4>An example to reason about</h4>
        <pre className="demo-code">
          <code>{exercise.code}</code>
        </pre>
        <p className="demo-caption">
          The lesson and examples were written for this portfolio. No commands
          are executed.
        </p>
      </div>
    </div>
  );
}
