

type simpleCustomMenuProps = {
    items:any[]
}

function SimpleCustomMenu({items}:simpleCustomMenuProps){
    return (
        <div className="simple-custom-menu">
            <div className="simple-custom-menu-item">
                <div className="simple-custom-menu-item-icon">
                    <i className="fas fa-home"></i>
                </div>
                <div className="simple-custom-menu-item-text">Home</div>
            </div>
            <div className="simple-custom-menu-item">
            </div>
        </div>
    )
}


export default SimpleCustomMenu;