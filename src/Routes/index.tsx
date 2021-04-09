import React from "react";
import {
  RouteProps,
  Redirect,
  useLocation,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { History } from "history";
import { VisitData } from "../Router";
import Store from "../Store";

export interface IRouteProps extends RouteProps {
  // eslint-disable-next-line no-unused-vars
  visitable?: (data: VisitData) => boolean;
  // eslint-disable-next-line no-unused-vars
  redirect?: string | ((data: VisitData) => string);
  key: string;
  children?: IRouteProps[];
}

export interface ComponentRouteProps {
  location: RouteProps["location"];
  history: History;
}

export default function Routes<R extends Array<IRouteProps> = IRouteProps[]>({
  routes,
  visitData,
}: {
  routes: R;
  visitData?: VisitData;
}) {
  const routers = routes.map((route) => {
    const {
      component: Component,
      visitable,
      children,
      redirect,
      key,
      ...rest
    } = route;
    const location = useLocation();
    const history = useHistory();

    if (!Store.isLogined) {
      if (key === "login") {
        return (
          <Route
            key={key}
            // @ts-ignore
            render={() => <Component location={location} history={history} />}
            {...rest}
          />
        );
      }

      return null;
    }

    if (visitData && visitable && !visitable?.(visitData)) {
      return (
        <Route
          key={key}
          // @ts-ignore
          render={() => (
            <>
              {/** @ts-ignore */}
              <Component location={location} history={history} />
              <Redirect
                key={key}
                to={{
                  ...location,
                  pathname:
                    typeof redirect === "function"
                      ? redirect(visitData)
                      : redirect,
                }}
              />
            </>
          )}
          {...rest}
        />
      );
    }

    if (redirect && visitData) {
      return (
        <Redirect
          key={key}
          to={{
            ...location,
            pathname:
              typeof redirect === "function" ? redirect(visitData) : redirect,
          }}
        />
      );
    }

    if (children) {
      return (
        <Route key={key} {...rest}>
          <Routes routes={children} />
        </Route>
      );
    }

    return (
      <Route
        key={key}
        // @ts-ignore
        render={() => <Component location={location} history={history} />}
        {...rest}
      />
    );
  });

  if (!Store.isLogined) {
    routers.push(
      <Redirect
        to={{ ...location, pathname: Store.routePathMap.login }}
        key="redirect_login"
      />
    );
  }

  const realRouters = routers.filter((v) => v);

  return <Switch>{realRouters}</Switch>;
}
