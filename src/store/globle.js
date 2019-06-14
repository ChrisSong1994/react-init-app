import { observable, action, runInAction, values } from "mobx";

class Global {
    @observable background = "#ccc"

    @action
    setBg(value) {
        this.background = value
    }
}

export default Global;