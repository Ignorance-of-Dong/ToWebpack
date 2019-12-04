import { observable, configure, runInAction, action } from "mobx";


configure({ enforceActions: 'always' }) // 强制进行action


class Pubcli {
    @observable youses = 'ture'

    // @action.bound
    changValue = () => {
        console.log(11)
        this.youses = '222222'
    }
}

export default new Pubcli()