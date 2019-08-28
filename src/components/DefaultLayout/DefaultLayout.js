// @flow
import React, { Suspense } from 'reactn';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import uuid from 'uuid';

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '_nav';
// routes config
import routes from 'routes';
import { userServices } from 'services';
import localizationHelper from 'helpers/localization';
import { useAuthorizationNavigation, useAuthorizationRoute } from 'hooks/user';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

function DefaultLayout(props: Object) {
  const loading = (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  const signOut = e => {
    e.preventDefault();
    userServices.logout();
  };

  // change language by user
  const handleChangeLanguage = lang => {
    localizationHelper.changeLanguage(lang);
  };
  const language = localizationHelper.getCurrentLanguage();

  const { filteredNavigation } = useAuthorizationNavigation(navigation);
  const { filteredRoutes } = useAuthorizationRoute(routes);

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading}>
          <DefaultHeader
            onLogout={e => signOut(e)}
            onChangeLanguage={handleChangeLanguage}
            language={language}
          />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={filteredNavigation} {...props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main" style={{ marginTop: 0 }}>
          <div className="header-divider" />
          <AppBreadcrumb appRoutes={routes} />
          <Container fluid>
            <Suspense fallback={loading}>
              <Switch>
                {filteredRoutes.map(route =>
                  route.component ? (
                    <Route
                      key={uuid.v4()}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={rprops => (
                        <route.component {...rprops} title={route.name} />
                      )}
                    />
                  ) : null,
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
      </div>
      <AppFooter>
        <Suspense fallback={loading}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
}

export default DefaultLayout;
