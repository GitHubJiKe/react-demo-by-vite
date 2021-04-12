import { observer } from "mobx-react";
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
function EnsureLogined({ children }: EnsureLoginedProps) {
  if (Store.isLogined) {
    return <>{children(Store.visitData!)}</>;
  }

  return null;
}

export default observer(EnsureLogined);
