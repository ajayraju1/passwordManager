import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colorArr = ['yellow', 'green', 'orange', 'red', 'blue', 'grey']

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    search: '',
    showPassword: false,
    passwordList: [],
    site: 'https://ajaypswdmanager.ccbp.tech/',
  }

  renderInpCon = () => {
    const {website, username, password} = this.state

    return (
      <>
        <div className="pm-inp-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            className="pm-inp-img"
            alt="website"
          />
          <hr className="hr-line" />
          <input
            className="pm-inp"
            type="text"
            placeholder="Enter Website"
            value={website}
            onChange={this.onChangeWebsite}
          />
        </div>

        <div className="pm-inp-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            className="pm-inp-img"
            alt="username"
          />
          <hr className="hr-line" />
          <input
            className="pm-inp"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={this.onChangeUsername}
          />
        </div>

        <div className="pm-inp-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            className="pm-inp-img"
            alt="password"
          />
          <hr className="hr-line" />
          <input
            className="pm-inp"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
      </>
    )
  }

  renderNoPasswords = () => (
    <div className="no-password-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        className="no-password-img"
        alt="no passwords"
      />

      <p className="no-password-txt">No Passwords</p>
    </div>
  )

  renderPasswordsItem = passwordList => {
    const {showPassword} = this.state

    return (
      <ul className="passwords-list-con">
        {passwordList.map(eachItem => (
          <PasswordItem
            passwordItem={eachItem}
            key={eachItem.id}
            showPassword={showPassword}
            deletePasswordObj={this.deletePasswordObj}
          />
        ))}
      </ul>
    )
  }

  onChangeWebsite = e => this.setState({website: e.target.value})

  onChangeUsername = e => this.setState({username: e.target.value})

  onChangePassword = e => this.setState({password: e.target.value})

  onAddNewPasswordObj = e => {
    e.preventDefault()
    const {website, username, password} = this.state
    const bgColor = colorArr[Math.ceil(Math.random() * colorArr.length - 1)]
    const newObj = {
      id: uuidV4(),
      website,
      username,
      password,
      bgColor,
    }

    this.setState(prevState => ({
      website: '',
      username: '',
      password: '',
      passwordList: [...prevState.passwordList, newObj],
    }))
  }

  onChangeSearch = e => this.setState({search: e.target.value})

  onToggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  deletePasswordObj = id =>
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(
        eachObject => eachObject.id !== id,
      ),
    }))

  render() {
    const {search, passwordList} = this.state
    const filteredList = passwordList.filter(eachObject =>
      eachObject.website.toLowerCase().includes(search.toLowerCase()),
    )
    const passwordCount = filteredList.length

    return (
      <div className="pm-bg-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="pm-logo"
          alt="app logo"
        />

        <div className="pm-card-con pm-card-top-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="pm-img"
            alt="password manager"
          />

          <form className="pm-inp-card-con" onSubmit={this.onAddNewPasswordObj}>
            <h1 className="pm-inp-card-heading">Add New Password</h1>

            {this.renderInpCon()}
            <button className="pm-add-btn" type="submit">
              Add
            </button>
          </form>
        </div>

        <div className="pm-card-con">
          <div className="pm-down-card-con">
            <div className="password-count-search-con">
              <div className="password-heading-count-con">
                <h1 className="password-sub-heading">Your Passwords</h1>
                <p className="password-count">{passwordCount}</p>
              </div>

              <div className="pm-inp-con password-search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  className="pm-inp-img"
                  alt="search"
                />
                <hr className="hr-line" />
                <input
                  className="pm-inp"
                  placeholder="Search"
                  type="search"
                  value={search}
                  onChange={this.onChangeSearch}
                />
              </div>
            </div>

            <hr className="password-hr" />

            <div className="show-password-con">
              <input
                type="checkbox"
                className="show-password-inp"
                onChange={this.onToggleShowPassword}
                id="show"
              />
              <label className="show-password-txt" htmlFor="show">
                Show Passwords
              </label>
            </div>

            {passwordCount === 0
              ? this.renderNoPasswords()
              : this.renderPasswordsItem(filteredList)}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
