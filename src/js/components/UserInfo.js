export class UserInfo {
    constructor(nameSelector, JobSelector) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(JobSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent
        };
    }

    setUserInfo(newName, newJob) {
        this._name.textContent = newName;
        this._description.textContent = newJob;
    }
}