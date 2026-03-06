import channels from "@/store/menu/channels";
import { useLocation, useParams } from "@umijs/max";
import { useEffect } from "react";
import Index from "../FaceBook/Index/Index";

function Mount() {

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        console.log(currentPath)

        console.log(channels.channelList)
    }, []);

    // switch (currentPath) {
    //     case "/channels/facebook":
    //         return <Facebook/>;
    //     case "/channels/instagram":
    //         return <div>Instagram</div>;
    //     default:
    //         return null;
    // }

    switch (currentPath) {
        case "/channels/facebook":
            return <Index/>;
        case "/channels/facebook/settings/website":
            return <div>Website Settings</div>;
        case "/channels/instagram":
            return <div>Instagram</div>;
        case "/channels/default":
            return <div>404 Not Found</div>;
        default:
            return <div>404 Not Found</div>;
    }
       
}


export default Mount;