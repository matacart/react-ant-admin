import Not from '../../assets/imgs/页面出错.svg';
import './NotOpen.scss';

const NotOpen = () => {
    return (
        <div className="NotOpen">
            <img src={Not} alt="" width={500} height={500} />
        </div>
    );
};
export default NotOpen;
