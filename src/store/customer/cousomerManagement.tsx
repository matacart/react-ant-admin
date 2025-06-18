import { makeAutoObservable } from "mobx";

interface conditionTypeOptions{
    label:string,
    value:string,
    tip:string
}

interface conditionType{
    label:string,
    options?:conditionTypeOptions[],
    selectOptions:string[],
}

interface conditionListType{
    type:string,
    condition:conditionType[]
}

class cousomerManagement {
    constructor() {
        makeAutoObservable(this)
    }

    conditionList:conditionListType[] = [
    ]

    setConditionList(value:conditionListType[]){
        this.conditionList = value
    }

}

export default new cousomerManagement();