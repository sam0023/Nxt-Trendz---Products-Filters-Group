import {Component} from 'react'
import './index.css'
import {AiOutlineSearch} from 'react-icons/ai'

class FiltersGroup extends Component {
  state = {searchInput: ''}

  updateSearchInput = event => {
    const input = event.target.value
    this.setState({searchInput: input})
    // const {updateSearch} = this.props
    // updateSearch(input)
  }

  requestUpdateSearch = () => {
    const {searchInput} = this.state
    console.log(searchInput)
    const {updateSearch} = this.props
    updateSearch(searchInput)
  }

  requestUpdateSearch2 = event => {
    if (event.key === 'Enter') {
      const {searchInput} = this.state

      const {updateSearch} = this.props
      updateSearch(searchInput)
    }
  }

  renderSearchInput = () => {
    // const {titleSearch} = this.props
    const {searchInput} = this.state
    // console.log(`currentTitle:${currentTitle}`)
    return (
      <div>
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={this.updateSearchInput}
          onKeyDown={this.requestUpdateSearch2}
        />
        <button type="button" onClick={this.requestUpdateSearch}>
          <AiOutlineSearch />
        </button>
      </div>
    )
  }

  renderCategoryInput = () => {
    const {categoryList, updateCategory} = this.props

    return (
      <div>
        <h1>Category</h1>
        <ul>
          {categoryList.map(eachItem => {
            const {name, categoryId} = eachItem
            const requestUpdateCategory = () => {
              updateCategory(categoryId)
            }
            return (
              <li key={categoryId}>
                <button type="button" onClick={requestUpdateCategory}>
                  <p> {name}</p>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderRatingSection = () => {
    const {ratingsList, updateRating} = this.props
    // console.log(ratingsList)
    return (
      <div>
        <ul>
          {ratingsList.map(eachItem => {
            const {ratingId, imageUrl} = eachItem
            const requestUpdateRating = () => {
              updateRating(ratingId)
            }

            return (
              <li key={ratingId}>
                <button type="button" onClick={requestUpdateRating}>
                  <div>
                    <img src={imageUrl} alt={`rating ${ratingId}`} />
                    <p>& up</p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  requestReset = () => {
    this.setState({searchInput: ''})
    const {reset} = this.props
    reset()
  }

  render() {
    return (
      <div className="filters-group-container">
        {this.renderSearchInput()}
        {this.renderCategoryInput()}
        {this.renderRatingSection()}
        <div>
          <button type="button" onClick={this.requestReset}>
            Clear Filters
          </button>
        </div>
      </div>
    )
  }
}

export default FiltersGroup
