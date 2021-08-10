import MyModal from "../../../reuse/MyModal";

const DeleteCatagoryModalComponent = (props) => {
    const {
        deleteCatagoryModal,
        setdeleteCatagoryModal,
        handleDeleteCatagoryModal,
        expandedUpdatedArray,
        checkedUpdatedArray,
    } = props
    return (
        <MyModal
            show={deleteCatagoryModal}
            handleClose={() => setdeleteCatagoryModal(false)}
            size='lg'
            title='Delete Catagory'
            saveAction={() => handleDeleteCatagoryModal()}
        >
            Are you sure?
            <h5>Expanded</h5>
            {
                expandedUpdatedArray.map((item, index) => {
                    return <span key={index}>{item.name}</span>
                })
            }
            <h5>Checked</h5>
            {
                checkedUpdatedArray.map((v, i) => {
                    return <span key={i}>{v.name}</span>
                })
            }
        </MyModal>
    );
}

export default DeleteCatagoryModalComponent;