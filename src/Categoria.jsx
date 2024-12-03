import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import TableCategorias from './TableCategorias';
import Loading from "./Loading";
import api from "./axiosApi";
import ModalConfirm from "./ModalConfirm";

const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState(0);
    const navigate = useNavigate();

    const loadCategorias = () => {
        setLoading(true);
        const categoriasEndpoint = "admin/listar_categorias";
        api.get(categoriasEndpoint)
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteCategoria = (categoriaId) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("categoria_id", categoriaId);  // Envia como form-data
    
    api.post("admin/excluir_categoria", formData)  // Envia o FormData
        .then(response => {
            if (response.status === 204) {
                loadCategorias();  // Recarrega as categorias após a exclusão
            }
        })
        .catch(error => {
            console.error('Erro ao excluir a categoria:', error);
        })
        .finally(() => {
            setLoading(false);
        });
};


    const handleEditCategoria = (categoriaId) => {
        navigate(`/categories/${categoriaId}`); 
    };

    const handleDeleteCategoria = (categoriaId) => {
        setSelectedCategoriaId(categoriaId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteCategoria'));
        modal.show();  // Abre o modal para confirmação
    };

    useEffect(() => {
        loadCategorias();
    }, []);

    return (
        <>
            {categorias.length > 0 ? (
                <>
                    <ModalConfirm 
                        modalId="modalDeleteCategoria" 
                        question="Deseja realmente excluir esta categoria?" 
                        confirmAction={() => deleteCategoria(selectedCategoriaId)} 
                    />
                    <TableCategorias 
                        items={categorias} 
                        handleDeleteCategoria={handleDeleteCategoria} 
                        handleEditCategoria={handleEditCategoria} 
                    />
                </>
            ) : (
                !loading
            )}
            {loading && <Loading />}
        </>
    );
};

export default Categoria;
