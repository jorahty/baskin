import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

export function getClickable(pattern: string) {
  return screen.getByRole("button", {
    name: pattern,
  });
}

export function getManyVisible(pattern: string, count: number) {
  const elements = screen.queryAllByText(pattern);
  let visible = 0;
  let one: HTMLElement | undefined = undefined;
  elements.map((element) => {
    try {
      expect(element).toBeVisible();
      visible++;
      one = one ? one : element;
    } catch {} // eslint-disable-line no-empty
    return null;
  });
  if (count !== undefined) {
    expect(visible).toBe(count);
  } else {
    expect(visible >= 1).toBe(true);
  }
  return count === 1 || count === undefined ? one : undefined;
}

export function getNotVisible(pattern: string) {
  getManyVisible(pattern, 0);
}

export function getOnlyVisible(pattern: string) {
  return getManyVisible(pattern, 1);
}

export function getAnyVisible(pattern: string) {
  return getManyVisible(pattern, undefined);
}

function setWidth(width: number) {
  global.innerWidth = width;
  act(() => {
    global.dispatchEvent(new Event("resize"));
  });
}

export function setNarrow() {
  setWidth(550);
}

export function setWide() {
  setWidth(750);
}
