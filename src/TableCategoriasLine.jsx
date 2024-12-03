import PropTypes from 'prop-types';

const TableCategoriasLine = ({ item, handleDeleteCategoria, handleEditCategoria }) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.ativo === 1 ? "Sim" : "Não"}</td>
            <td>
                <button 
                    className="btn btn-outline-danger btn-sm" 
                    title="Excluir Categoria" 
                    onClick={() => handleDeleteCategoria(item.id)}
                >
                    <i className="bi bi-trash"></i>
                </button>
                <button 
                    className="btn btn-outline-primary btn-sm ml-2" 
                    title="Editar Categoria" 
                    onClick={() => handleEditCategoria(item.id)}
                >
                    <i className="bi bi-pencil"></i>
                </button>
            </td>
        </tr>
    );
};

TableCategoriasLine.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        ativo: PropTypes.number.isRequired, 
        categoriaId: PropTypes.number.isRequired, // ID da categoria associada
    }).isRequired,
    handleDeleteCategoria: PropTypes.func.isRequired,
    handleEditCategoria: PropTypes.func.isRequired, 
};

export default TableCategoriasLine;
