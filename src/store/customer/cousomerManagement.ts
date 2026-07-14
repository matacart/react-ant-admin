import { makeAutoObservable } from "mobx";

interface ConditionTypeOptions{
    label:string,
    value:string,
    tip:string
}

interface ConditionType{
    label:string,
    options?:ConditionTypeOptions[],
    selectOptions:string[],
}

interface ConditionListType{
    type:string,
    condition:ConditionType[]
}

class CustomerManagement {
    constructor() {
        makeAutoObservable(this)
    }

    conditionList:ConditionListType[] = [
    ]

    setConditionList(value:ConditionListType[]){
        this.conditionList = value
    }

}

export default new CustomerManagement();
