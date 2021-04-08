import React, { ComponentType, createElement } from "react";
import { Observer } from "mobx-react-lite";
import Store from "../../Store";

export default function withPermissions<P>(
  Com: ComponentType<P>,
  permissions: string[]
) {
  return function AllowedAccessContent(props: P) {
    return (
      <Observer>
        {() => {
          if (
            permissions.filter((v) => Store.visitData?.permissions.includes(v))
              .length > 0
          ) {
            return createElement(Com, props);
          }

          return null;
        }}
      </Observer>
    );
  };
}
