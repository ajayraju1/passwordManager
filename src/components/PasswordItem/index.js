import './index.css'

const PasswordItem = props => {
  const {passwordItem, showPassword, deletePasswordObj} = props
  const {id, website, username, password, bgColor} = passwordItem

  const onDeletePasswordObj = () => {
    deletePasswordObj(id)
  }

  return (
    <li className="password-item-con">
      <div className="profile-icon-txt-con">
        <div className={`profile-con ${bgColor}`}>
          <h1 className="profile-name">{username[0].toUpperCase()}</h1>
        </div>
        <div className="profile-txt-con">
          <p className="website-name">{website}</p>
          <p className="username">{username}</p>
          {showPassword ? (
            <p className="username">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              className="password-img"
              alt="stars"
            />
          )}
        </div>
      </div>

      <button
        className="delete-btn"
        type="button"
        data-testid="delete"
        onClick={onDeletePasswordObj}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-img"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
