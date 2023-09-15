const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
]

function sortProductByCategoryForTabs(products: any[]) {
    const result = []
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]
        const productsInCategory = products.filter(product => product.category === category)

        // if productsInCategory is empty, skip
        if (productsInCategory.length === 0) continue

        result.push({
            id: category,
            label: category,
            content: productsInCategory
        })
    }

    return result
}

export { categories, sortProductByCategoryForTabs }