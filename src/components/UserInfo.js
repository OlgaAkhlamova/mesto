class UserInfo {
    constructor({userNameSelector, userJobSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._userName.textContent;
        userInfo.job = this._userJob.textContent;
        return userInfo;
        
    }

    setUserInfo(formData) {
        this._userName.textContent = formData.username;
        this._userJob.textContent = formData.userjob;
    }
}

export {UserInfo}
