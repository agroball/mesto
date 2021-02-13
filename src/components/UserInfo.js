export class UserInfo {
    constructor({ nameSelector, jobSelector }) {
            this._name = document.querySelector(nameSelector);
            this._job = document.querySelector(jobSelector);
        }
        // берет данные пользователя
    getUserInfo() {
            return {
                name: this._name.textContent,
                job: this._job.textContent
            }
        }
        // принимает новые данные пользователя и передает обратно
    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}