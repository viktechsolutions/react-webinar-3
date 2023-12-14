import {memo} from "react";
import PageLayout from "../page-layout";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";

function Profile () {
    const store = useStore();

    const {t} = useTranslate();

    return (
      <PageLayout>
    <div>
      profile
    </div>
      </PageLayout>
    );


}

export default memo(Profile);