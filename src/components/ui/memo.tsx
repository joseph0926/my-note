'use client';

import { useOutsideClick } from '@/hooks/use-outside-click';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type FormStateType = 'idle' | 'loading' | 'success';

export const Memo = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  // TODO: 임시 Form 상태 (애니메이션 체크용) - joseph0926 2025.07.02
  const [formState, setFormState] = useState<FormStateType>('idle');
  const [feedback, setFeedback] = useState<string>('');

  useOutsideClick(wrapperRef, () => setOpen(false));

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (formState === 'loading') {
      timer1 = setTimeout(() => {
        setFormState('success');
        timer2 = setTimeout(() => {
          setFormState('idle');
          setOpen(false);
          setFeedback('');
        }, 2000);
        return () => {
          clearTimeout(timer2);
        };
      }, 2000);
    }
    console.log(formState);

    return () => {
      clearTimeout(timer1);
    };
  }, [formState]);

  return (
    <div className="">
      <motion.button
        key="button"
        layoutId="wrapper"
        onClick={() => {
          setOpen(true);
          setFormState('idle');
        }}
        className="cursor-pointer rounded-md border px-4 py-1"
      >
        <motion.span layoutId="title" className="block text-sm font-semibold">
          Memo
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {open ? (
          <motion.div
            layoutId="wrapper"
            ref={wrapperRef}
            className="bg-background fixed top-1/2 left-1/2 aspect-video w-80 -translate-x-1/2 -translate-y-1/2 rounded-md border p-1"
          >
            <motion.span
              aria-hidden
              layoutId="title"
              className="text-input absolute top-4 left-4 text-sm font-semibold data-[memo='true']:!opacity-0"
              data-memo={feedback ? 'true' : 'false'}
            >
              Memo
            </motion.span>
            <AnimatePresence mode="popLayout">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{
                    y: -32,
                    opacity: 0,
                    filter: 'blur(4px)',
                  }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{
                    type: 'spring',
                    duration: 0.4,
                    bounce: 0,
                  }}
                  className="absolute inset-0"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                      fill="#2090FF"
                      fillOpacity="0.16"
                    />
                    <path
                      d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                      stroke="#2090FF"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3>Feedback received!</h3>
                  <p>Thanks for helping me improve Sonner.</p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormState('loading');
                  }}
                  key="form"
                  exit={{
                    y: 8,
                    opacity: 0,
                    filter: 'blur(4px)',
                  }}
                  transition={{
                    type: 'spring',
                    duration: 0.4,
                    bounce: 0,
                  }}
                  className="size-full"
                >
                  <div className="flex h-full flex-col justify-between gap-4">
                    <textarea
                      autoFocus
                      className="w-full basis-3/4 resize-none p-3 text-sm outline-none"
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div className="flex w-full items-center justify-end">
                      <button
                        type="submit"
                        className="bg-primary h-8 basis-1/4 cursor-pointer rounded-md px-4 text-center"
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            transition={{
                              type: 'spring',
                              duration: 0.3,
                              bounce: 0,
                            }}
                            initial={{ opacity: 0, y: -25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 25 }}
                            className="text-center"
                          >
                            {formState === 'loading' ? (
                              <Loader2 className="text-foreground bg-background size-4 animate-spin" />
                            ) : (
                              <span className="text-sm font-semibold text-white">
                                Add
                              </span>
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
