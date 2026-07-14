import { makeAutoObservable } from "mobx";


interface Channel {
    id: string;
    appId: string;
    channelName: string;
    menuLogo: string;
    sort: number;
}

class Channels {

    constructor() {
        makeAutoObservable(this)
    }

    // 渠道列表
    channelList: Channel[] = [];
    setChannelList(channel:Channel[]) {
        this.channelList = channel;
    }


}

export default new Channels();
