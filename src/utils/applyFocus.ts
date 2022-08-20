export const applyFocus = (name: string) => {
  const inputFocus = window.document.querySelector(
    `[name=${name}]`,
  ) as HTMLElement | null;

  if (inputFocus !== null) {
    inputFocus.focus();
  }
};
