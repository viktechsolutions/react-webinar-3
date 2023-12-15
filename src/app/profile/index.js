import {memo} from "react";
import PageLayout from "../../components/page-layout";
import Navigation from "../../containers/navigation";
import TopBar from "../../components/top-bar";
import ProfileLayout from "../../components/profile-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Profile() {

const {t} = useTranslate();
  return (
    <PageLayout>
      <TopBar  />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileLayout/>
    </PageLayout>
  );
}

export default memo(Profile);
