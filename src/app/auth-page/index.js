import {memo} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import TopBar from "../../components/top-bar";
import Login from "../../components/login";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import SideLayout from "../../components/side-layout";
import UserBar from "../../containers/user-bar";
import LoginBox from "../../containers/login-box";


function AuthPage () {
  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserBar/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <SideLayout padding="medium">
        <LoginBox/>
      </SideLayout>
    </PageLayout>
  );
}

export default memo(AuthPage)