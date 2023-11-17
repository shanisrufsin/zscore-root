"use client";
import { cn } from "@/utilities/cn";
import * as S from "@radix-ui/react-select";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useId, useState } from "react";

interface ISelect extends S.SelectProps, S.SelectPortalProps {
  error?: string;
  label?: string;
  className?: string;
  placeholder: string;
  children: React.ReactNode;
}

const Select = ({
  error,
  label,
  className,
  placeholder,
  children,
  container = typeof window !== "undefined"
    ? document.getElementById("global-select-container")
    : undefined,
  ...rest
}: ISelect) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const inputAnimation = useAnimationControls();
  const errorText = useAnimationControls();
  useEffect(() => {
    if (error) {
      inputAnimation.start({
        x: [-2, 0, 2, 0, -2],
        transition: { repeat: 5, duration: 0.15 },
      });

      errorText.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [error]);

  return (
    <S.Root open={open} onOpenChange={(v) => setOpen(v)} {...rest}>
      <motion.div
        animate={inputAnimation}
        initial={{ x: 0 }}
        className={cn(`relative flex flex-col justify-start`, className)}
      >
        {label && (
          <label
            htmlFor={id}
            className={`mb-1 flex items-center justify-start gap-2 text-xs font-medium sm:text-sm ${
              error ? "text-red-600" : "text-gray-800"
            }`}
          >
            <AnimatePresence initial={false}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={errorText}
                  exit={{ opacity: 0, scale: 0 }}
                  className="rounded-full"
                >
                  <svg className="h-5 w-5 text-red-600" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div>{label}</motion.div>
          </label>
        )}
        <SelectTrigger id={id} error={error} placeholder={placeholder} />
      </motion.div>

      <S.Portal container={container}>
        <S.Content className="relative z-[99999999999999999999999] rounded-xl border bg-white p-1 shadow">
          <S.ScrollUpButton className="flex items-center justify-center py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.77 12.79a.75.75 0 0 1-1.06-.02L10 8.832L6.29 12.77a.75.75 0 1 1-1.08-1.04l4.25-4.5a.75.75 0 0 1 1.08 0l4.25 4.5a.75.75 0 0 1-.02 1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </S.ScrollUpButton>

          <S.Viewport>{children}</S.Viewport>

          <S.ScrollDownButton className="flex items-center justify-center py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.77 12.79a.75.75 0 0 1-1.06-.02L10 8.832L6.29 12.77a.75.75 0 1 1-1.08-1.04l4.25-4.5a.75.75 0 0 1 1.08 0l4.25 4.5a.75.75 0 0 1-.02 1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </S.ScrollDownButton>
          <S.Arrow />
        </S.Content>
      </S.Portal>
    </S.Root>
  );
};

interface ISelectGroup extends S.SelectGroupProps {
  label?: string;
}
const SelectGroup = ({ children, label }: ISelectGroup) => {
  return (
    <S.Group>
      {label && <OptionLabel>{label}</OptionLabel>}
      <div className="flex flex-col">{children}</div>
    </S.Group>
  );
};

interface ISelectTrigger extends S.SelectTriggerProps {
  error?: string;
}
const SelectTrigger = ({ error, placeholder, ...rest }: ISelectTrigger) => {
  return (
    <S.Trigger
      className={`inline-flex items-center justify-between gap-3 rounded-xl border p-3 text-sm font-medium text-gray-800 transition duration-300 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:text-gray-600 data-[placeholder]:font-normal data-[placeholder]:text-gray-600 ${
        error
          ? `${cn(
              `border-red-500 focus:border-transparent focus:ring-red-600`
            )}`
          : `${cn(
              `border-gray-300 focus:border-transparent focus:ring-blue-600`
            )}`
      }`}
      {...rest}
    >
      <S.Value placeholder={placeholder} />
      <S.Icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </S.Icon>
    </S.Trigger>
  );
};

interface IOption extends S.SelectItemProps {
  level?: number;
}
const Option = ({
  children,
  value,
  className,
  level = 1,
  ...rest
}: IOption) => {
  return (
    <S.Item
      value={value}
      style={{ paddingLeft: `${0.75 * level}rem` }}
      className={cn(
        `cursor-pointer rounded-xl p-3 text-sm text-gray-600 data-[highlighted]:bg-skin-primary data-[state=checked]:font-medium data-[highlighted]:text-white data-[highlighted]:outline-none`,
        className
      )}
      {...rest}
    >
      <S.ItemText>{children}</S.ItemText>
      <S.ItemIndicator />
    </S.Item>
  );
};

interface IOptionLabel extends S.SelectLabelProps {}
const OptionLabel = ({ children, className }: IOptionLabel) => {
  return (
    <S.Label
      className={cn(
        "mb-2 mt-3 block px-3 text-sm font-semibold tracking-wide text-gray-600",
        className
      )}
    >
      {children}
    </S.Label>
  );
};

interface IDivider extends S.SelectArrowProps {}
const Divider = ({ className, children }: IDivider) => {
  return (
    <S.Separator className={cn("my-1 px-3", className)}>
      {children ? children : <div className="w-full border-t"></div>}
    </S.Separator>
  );
};

export { Select, SelectTrigger, SelectGroup, Divider, OptionLabel, Option };
