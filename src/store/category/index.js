import StoreModule from "../module";

class CategoryState extends StoreModule {

  initState() {
    return {
      categories: [],
    }
  }

  async fetchCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    const flatCategories = json.result.items;

    this.setState({
      ...this.getState(),
      categories: this.formatCategories(flatCategories),
    }, 'Категории из API');
  }

  formatCategories(categories, parentId = null, prefix = '', isFirstCall = true) {
    let formatted = [];

    if (isFirstCall) {
      formatted.push({ value: '', title: 'Все' });
    }

    categories.forEach(category => {
      if ((category.parent && category.parent._id === parentId) || (!category.parent && parentId === null)) {
        formatted.push({ value: category._id, title: prefix + category.title });
        formatted = formatted.concat(this.formatCategories(categories, category._id, prefix + '- ', false));
      }
    });

    return formatted;
  }
}
export default CategoryState;
