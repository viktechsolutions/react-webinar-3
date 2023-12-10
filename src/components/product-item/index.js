import {numberFormat} from "../../utils";
function ProductItem({ item, addToBasket }) {
  return (
    <div className="Product-boxInfo">
      <p>{item.description}</p>
      <p>Страна производитель: <b>{item.madeIn.title}</b></p>
      <p>Категория: <b>{item.category.title}</b></p>
      <p>Год выпуска: <b>{item.edition}</b></p>
      <p className="price"><b>Цена: {numberFormat(item.price)} ₽</b></p>
      <button onClick={addToBasket}>Добавить</button>
    </div>
  );
}


export default ProductItem;