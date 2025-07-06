import leoProfanity from "leo-profanity";

export const reviewCheck = (text: string): boolean => {
  return leoProfanity.check(text);
};
