export class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
            this._name = document.querySelector(nameSelector);
            this._job = document.querySelector(jobSelector);
            this._avatar = document.querySelector(avatarSelector);
        }
        // берет данные пользователя
    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        }
    }


    // принимает новые данные пользователя и передает обратно
    // setUserInfo(name, job) {
    //     this._name.textContent = name;
    //     this._job.textContent = job;
    // }

    setAvatar(data) {
        this._avatar.src = data.avatar__link === '' ? this._avatar.src : data.avatar__link;
    }

    initUserInfo(name, job, avatar) {
        this._name.textContent = name;
        this._job.textContent = job;
        this._avatar.src = avatar;
    }
    setUserId(id) {
        this._userId = id;
    }
    returnUserId() {
        return this._userId;
    }
}