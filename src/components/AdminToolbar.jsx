import "../styles/AdminToolbar.scss";

const AdminToolbar = ({
    onUpload,
    onManage,
    onToggleSorting,
    onSaveSorting,
    isSorting,
    savingOrder
}) => {
    return (
        <div className="admin-toolbar">
            <button
                className="admin-toolbar__button"
                onClick={onUpload}
                disabled={isSorting || savingOrder}
            >
                ➕ Agregar contenido
            </button>

            <button
                className="admin-toolbar__button"
                onClick={onManage}
                disabled={isSorting || savingOrder}
            >
                ⚙ Administrar
            </button>

            {!isSorting ? (
                <button
                    className="admin-toolbar__button"
                    onClick={() => onToggleSorting(true)}
                >
                    ↕ Reordenar
                </button>
            ) : (
                <>
                    <button
                        className="admin-toolbar__button"
                        onClick={() => onToggleSorting(false)}
                        disabled={savingOrder}
                    >
                        ✖ Cancelar
                    </button>

                    <button
                        className="admin-toolbar__button admin-toolbar__button--success"
                        onClick={onSaveSorting}
                        disabled={savingOrder}
                    >
                        {savingOrder ? "Guardando..." : "💾 Guardar orden"}
                    </button>
                </>
            )}
        </div>
    );
};

export default AdminToolbar;