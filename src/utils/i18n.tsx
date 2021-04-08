import Store from "../Store";
import cnLocale from "../../locale/cn.json";
import enLocale from "../../locale/en.json";
import React, { Fragment, ReactNode } from "react";

export function __(text: string): string {
  const globalLocaleMap = Store.locale === "cn" ? cnLocale : enLocale;
  // @ts-ignore
  return globalLocaleMap[text] || text;
}

export function printf(text: string, ...args: Array<string | number>): string {
  let i = 0;

  return text.replace(/%s/g, () => {
    const holder = args[i++];

    return holder === undefined ? "" : (holder as string);
  });
}

function normalSprintf(text: string | string[], ...args: ReactNode[]) {
  const rule = /%s/gi;

  if (typeof text === "string" && !rule.test(text)) {
    return text;
  }

  let i = 0;

  return (typeof text === "string" ? text.split(rule) : text).map(
    (token, index) => (
      <Fragment key={index}>
        {token}
        {args[i++]}
      </Fragment>
    )
  );
}

export function sprintf(
  text: string,
  ...args: Array<ReactNode | ((text: string) => ReactNode)>
) {
  const rule = /(\{[^{}]+\})/g;

  if (!rule.test(text)) {
    return normalSprintf(text, ...args);
  }

  const tokens = text.split(rule).filter(Boolean);
  let i = 0;

  const translate = (s: string) => {
    if (rule.test(s)) {
      const value = args[i++];

      if (typeof value !== "function") {
        console.warn(`param ${i - 1} is not a function. ${s} will be lost `);

        return value;
      }

      return value(s.slice(1, -1));
    }

    const tokens = s.split("%s");

    return normalSprintf(tokens, ...args.slice(i, (i += tokens.length - 1)));
  };

  return tokens.map((token, index) => (
    <Fragment key={index}>{translate(token)}</Fragment>
  ));
}

type I18nParser = typeof __;
type I18nPrintf = typeof printf;
type I18nSPrintf = typeof sprintf;

declare global {
  const __: I18nParser;
  const printf: I18nPrintf;
  const sprintf: I18nSPrintf;
  interface Window {
    __: I18nParser;
    printf: I18nPrintf;
    sprintf: I18nSPrintf;
  }
}
