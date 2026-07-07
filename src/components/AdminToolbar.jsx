import '../styles/AdminToolbar.scss'

const AdminToolbar = ({
    onUpload,
    onManage,
    onToggleSorting,
    isSorting,
}) => {
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

            <button
                className={`admin-toolbar__button ${isSorting ? "active" : ""
                    }`}
                onClick={onToggleSorting}
            >
                {isSorting ? "✅ Finalizar orden" : "↕ Reordenar"}
            </button>
        </div>
    );
};

export default AdminToolbar;