import {FC, useRef} from "react";
import {Modal} from 'bootstrap';

interface Props {
    id: number;
    text: string;
    deleteFunc: (id: number) => void;
}

const ModalDelete: FC<Props> = ({
    id = 0,
    text = "",
    deleteFunc
}) => {
    const modalRef = useRef(null);
    const showModal = () => {
        const modal = modalRef.current;
        if (modal != null) {
            const bsModal = new Modal(modal);
            bsModal.show();
        }
    }
    const confirmDelete = () => {
        const modal = modalRef.current;
        if (modal != null) {
            const bsModal = Modal.getInstance(modal);
            bsModal?.hide();
            deleteFunc(id);
        }
    }

    return (
        <>
            <button className="btn btn-danger" onClick={showModal}>Видалити <i className="fa fa-trash" aria-hidden="true"></i></button>
            <div className="modal fade" ref={modalRef} tabIndex={-1} aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Видалення</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Ви дійсно бажаєте видалити категорію `{text}`
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
                            <button type="button" className="btn btn-primary" onClick={confirmDelete}>Видалити</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalDelete;