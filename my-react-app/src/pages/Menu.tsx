import { useState, useEffect } from "react";
import axios from "axios";

interface Category {
    id: number;
    name: string;
}

interface Product{
    id: number;
    name: string;
    description: string;
    photo_url?: string;
}

function Menu() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('http://localhost:4097/api/categories')
            .then(res => {
                setCategories(res.data);
                if(res.data.length > 0) {
                    setSelectedCategoryId(res.data[0].id);
                }
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedCategoryId === null) return;

        axios.get(`http://localhost:4097/api/products/?category_id=${selectedCategoryId}`)

            .then(res => setProducts(res.data))
            .catch(err => {
                console.error(err);
                setProducts([]);
            });
    }, [selectedCategoryId]);

    return (
        <div className="container my-4">
            <h2 className="text-black font-bold text-3xl p-6">Меню</h2>

            <ul className="flex flex-wrap justify-center gap-4 px-10 mb-6 overflow-x-auto max-w-full">
                {categories.map(cat => (
                    <li
                        key={cat.id}
                        className={`list-group-item cursor-pointer px-4 py-2 rounded-md whitespace-nowrap flex-shrink-0 ${
                            cat.id === selectedCategoryId
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                        onClick={() => setSelectedCategoryId(cat.id)}
                    >
                        {cat.name}
                    </li>
                ))}
            </ul>

            <section className="px-4 sm:px-10" style={{ height: 'calc(100vh - 150px)'}}>
              {products.length === 0 ? (
                <p className="text-center text-gray-500">Немає продуктів у цій категорії.</p>
              ) : (
                <div className="flex justify-center h-full overflow-auto">
                  <ul className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full max-w-screen-2xl h-full">
                    {products.map(prod => (
                      <li key={prod.id} className="bg-stone-100 rounded-xl shadow-md p-4 flex flex-col items-center text-center h-full">
                        {prod.photo_url ? (
                          <img
                            src={prod.photo_url}
                            alt={prod.name}
                            className="w-full object-cover rounded-md mb-3 flex-grow"
                            style={{ maxHeight: '300px' }}
                          />
                        ) : (
                          <div className="w-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400 mb-3 flex-grow" style={{ maxHeight: '300px' }}>
                            Нема фото
                          </div>
                        )}
                        <h3 className="font-bold text-xl pt-2 mb-1">{prod.name}</h3>
                        <p className="text-gray-700 text-base pt-4 p-2.5 line-clamp-3">{prod.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
        </div>
    );
}

export default Menu;
