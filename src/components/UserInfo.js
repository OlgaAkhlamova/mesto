class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.about = this._userJob.textContent;
    userInfo.avatar = this._userAvatar.src;
    return userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._userAvatar.src = data.avatar;
    this._userId = data._id;
  }
}

export { UserInfo };
