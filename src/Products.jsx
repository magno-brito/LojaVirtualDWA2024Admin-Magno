import { useEffect, useState } from "react";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";
import { NavLink } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const loadProducts = () => {
        setLoading(true);
        const productsEndpoint = "admin/obter_produtos";
        api.get(productsEndpoint)
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data); 
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    
   const loadCategories = () => {
    const categoriesEndpoint = "admin/listar_categorias_ativas";
    api.get(categoriesEndpoint)
        .then((response) => {
            console.log(response.data); 
            setCategories(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};


    const deleteProduct = (productId) => {
        setLoading(true);
        api.postForm("admin/excluir_produto", {"id_produto": productId})
            .then(response => {
                if (response.status === 204)
                    loadProducts();
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteProduct = (productId) => {
        setSelectedProductId(productId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteProduct'));
        modal.show();
    }

    
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        if (category === '') {
            setFilteredProducts(products); 
        } else {
            setFilteredProducts(products.filter(product => product.categoria_nome === category));
        }
    }

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    return (
        <>
            <NavLink to="/products/create" className="btn btn-primary my-3">Novo Produto</NavLink>
            
            <div className="my-3">
                <label htmlFor="categoryFilter" className="form-label">Filtrar por Categoria</label>
                <select 
                    id="categoryFilter" 
                    className="form-select" 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                >
                    <option value="">Todas as Categorias</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.nome}>
                            {category.nome}
                        </option>
                    ))}
                </select>
            </div>

            {filteredProducts.length > 0 ? 
                <>
                    <ModalConfirm modalId="modalDeleteProduct" question="Deseja realmente excluir o produto?" confirmAction={() => deleteProduct(selectedProductId)} />
                    <TableProducts items={filteredProducts} handleDeleteProduct={handleDeleteProduct} />
                </> : 
                (!loading && <NoProducts />)
            }
            {loading && <Loading />}
        </>
    );
}

export default Products;
