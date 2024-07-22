// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {

    const response = await fetch("http://localhost:8080/products")
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function fetchProductByFilter(filter, sort, pagination) {

  // filter = {"category": ["beauty", "furnitute"]}
  // sort = {_sort:"price", _order:"desc"}
  // TODO = on server we will support multiple value

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {

      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }

  console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) => {

    const response = await fetch("http://localhost:8080/products?" + queryString)        
    const data = await response.json()
    // const totalItems = await response.headers.get('X-Total-Count')
    resolve({ data })
  }
  );
}
