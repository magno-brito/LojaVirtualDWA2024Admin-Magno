import PropTypes from 'prop-types';
import TableCategoriasLine from './TableCategoriasLine';

const TableCategorias = ({ items, handleDeleteCategoria, handleEditCategoria }) => {
    // Ensure that 'ativo' is a boolean for each item
    const normalizedItems = items.map(item => ({
        ...item,
        ativo: item.ativo  // Convert 1 or 0 to true or false
    }));

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Ativo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {normalizedItems.map(item => (
                    <TableCategoriasLine 
                        key={item.id} 
                        item={item} 
                        handleDeleteCategoria={handleDeleteCategoria} 
                        handleEditCategoria={handleEditCategoria} 
                    />
                ))}
            </tbody>
        </table>
    );
};

TableCategorias.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            nome: PropTypes.string.isRequired,
            ativo: PropTypes.bool.isRequired,
        })
    ).isRequired,
    handleDeleteCategoria: PropTypes.func.isRequired,
    handleEditCategoria: PropTypes.func.isRequired,
};

export default TableCategorias;
