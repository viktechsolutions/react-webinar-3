import {memo, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import TopBar from "../../components/top-bar";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.actions.auth.updateLoginStatus(true);
      store.actions.auth.setToken(token);
    } else {
      store.actions.auth.updateLoginStatus(false);
      store.actions.auth.removeToken();
    }
  }, [store]);

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <TopBar/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
