import PropTypes from 'prop-types';

const TableProductsLine = ({ item, handleDeleteProduct }) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.preco}</td>
            <td>{item.estoque}</td>
            <td>{item.categoria_nome || 'Categoria não encontrada'}</td> {/* Exibe o nome da categoria */}
            <td>
                <button 
                    className="btn btn-outline-danger btn-sm" 
                    title="Excluir Produto" 
                    onClick={() => handleDeleteProduct(item.id)}
                >
                    <i className="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    );
}

TableProductsLine.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        preco: PropTypes.number.isRequired,
        estoque: PropTypes.number.isRequired,
        categoria_nome: PropTypes.string // Adiciona a validação para categoria_nome
    }).isRequired,
    handleDeleteProduct: PropTypes.func.isRequired
};

export default TableProductsLine;
