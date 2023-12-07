import {Link} from "react-router-dom";
import PageLayout from "../page-layout";
import Head from "../head";
import './style.css';

function Error() {
  return (
  <PageLayout>
    <Head title='Error'/>
    <div className="Error">
      <h1>Error</h1>
      <p>Что-то пошло не так</p>
      <p>Попробуйте перезагрузить страницу</p>
      <p>Или вернитесь на главную страницу</p>
      <Link to={'/'}>Главная</Link>
    </div>
</PageLayout>
);
}

export default Error;