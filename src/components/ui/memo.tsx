'use client';

import { useOutsideClick } from '@/hooks/use-outside-click';
import { Check, CheckCircle2, Loader2 } from 'lucide-react';
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
                  className="bg-background absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-md px-4"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Check className="size-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm font-semibold">메모 추가 완료!</p>
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
                            key={formState}
                            transition={{
                              type: 'spring',
                              duration: 0.3,
                              bounce: 0,
                            }}
                            initial={{ opacity: 0, y: -25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 25 }}
                            className="mx-auto flex w-full items-center justify-center"
                          >
                            {formState === 'loading' ? (
                              <Loader2 className="text-background size-4 animate-spin text-center" />
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
