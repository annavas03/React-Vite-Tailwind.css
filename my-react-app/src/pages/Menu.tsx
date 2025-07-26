import { useState, useEffect } from "react";
import axios from "axios";

interface Category {
    id: number;
    name: string;
}

function Menu() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios.get('http://localhost:4097/api/categories')
            .then(res => setCategories(res.data)    )
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="container my-4">
            <h2 className="mb-3">Меню</h2>
            <ul className="list-group list-group-horizontal">
                {categories.map(cat => (
                    <li key={cat.id} className="list-group-item">
                        {cat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;
