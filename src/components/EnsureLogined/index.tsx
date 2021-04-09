import React from "react";
import { VisitData } from "../../Router";
import Store from "../../Store";

interface EnsureLoginedProps {
  children: (visitData: VisitData) => React.ReactNode;
}

/**
 * render props to show some content after login
 * @param children
 */
export default function EnsureLogined({ children }: EnsureLoginedProps) {
  if (Store.isLogined) {
    return <>{children(Store.visitData!)}</>;
  }

  return null;
}
