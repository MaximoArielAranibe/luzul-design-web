import '../styles/AdminToolbar.scss'

const AdminToolbar = ({ onUpload, onManage }) => {

    return (

        <div className="admin-toolbar">

            <button
                className="admin-toolbar__button"
                onClick={onUpload}
            >
                ➕ Agregar contenido
            </button>

            <button
                className="admin-toolbar__button"
                onClick={onManage}
            >
                ⚙ Administrar
            </button>

        </div>

    );

};

export default AdminToolbar;