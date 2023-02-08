import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const viewOptions = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    // isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: categoryOptions[0].categoryId,
    activeRating: ratingsList[0].ratingId,
    titleSearch: '',
    activeView: viewOptions.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      activeView: viewOptions.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied
    const {
      activeOptionId,
      activeCategoryId,
      activeRating,
      titleSearch,
    } = this.state

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${titleSearch}&rating=${activeRating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        // isLoading: false,
        activeView: viewOptions.success,
      })
    } else {
      this.setState({
        // isLoading: false,
        activeView: viewOptions.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  updateSearch = search => {
    console.log('in all search')
    this.setState({titleSearch: search}, this.getProducts)
  }

  updateCategory = categoryId => {
    // console.log('in all cat')
    // console.log(categoryId)
    this.setState({activeCategoryId: categoryId}, this.getProducts)
  }

  updateRating = rating => {
    this.setState({activeRating: rating}, this.getProducts)
  }

  reset = () => {
    this.setState(
      {
        productsList: [],
        // isLoading: false,
        activeOptionId: sortbyOptions[0].optionId,
        activeCategoryId: categoryOptions[0].categoryId,
        activeRating: ratingsList[0].ratingId,
        titleSearch: '',
        activeView: viewOptions.initial,
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
          />
          <h1>No Products Found</h1>
          <p>We could not find any products. Try other filters</p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having trouble processing your request</p>
      <p>Please try again</p>
    </div>
  )

  renderFinalView = () => {
    const {activeView} = this.state
    switch (activeView) {
      case viewOptions.success:
        return this.renderProductsList()

      case viewOptions.failure:
        return this.renderFailureView()

      case viewOptions.loading:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    const {titleSearch, activeView} = this.state
    // console.log('all title')
    console.log(`titleSearch:${titleSearch}, activeView:${activeView}`)
    // console.log('all title')
    // console.log(ratingsList)
    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryList={categoryOptions}
          ratingsList={ratingsList}
          updateSearch={this.updateSearch}
          updateCategory={this.updateCategory}
          updateRating={this.updateRating}
          reset={this.reset}
          currentTitle={titleSearch}
        />

        {/* {isLoading ? this.renderLoader() : this.renderProductsList()} */}
        {this.renderFinalView()}
      </div>
    )
  }
}

export default AllProductsSection
