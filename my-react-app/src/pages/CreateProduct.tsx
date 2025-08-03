import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent, SetStateAction} from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

function CreateProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    photo: null as File | null,
  });

  const [formProgress, setFormProgress] = useState<number>(0);
  const calculateProgress = (data: typeof formData) => {
    const totalFields = 4; // category, name, price, photo
    let filled = 0;
    if (data.category) filled++;
    if (data.name.trim() !== "") filled++;
    if (data.price.trim() !== "") filled++;
    if (data.photo) filled++;

    return Math.round((filled / totalFields) * 100);
  };

  useEffect(() => {
    setFormProgress(calculateProgress(formData));
  }, [formData])  ;

  useEffect(() => {
    axios.get('http://localhost:4097/api/categories')
        .then((res: { data: SetStateAction<Category[]>; }) => setCategories(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Будь ласка, виберіть категорію");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    if (formData.photo) data.append("photo", formData.photo);

    try {

      await axios.post("http://localhost:4097/api/products/", data, {
        headers: {"Content-Type": "multipart/form-data"},
      });

      alert("Страва створена!");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        photo: null,
      });
      setFormProgress(0);
    } catch (error) {
      alert("Сталася помилка при створенні");
      console.error(error);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-lime-50 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Створити нову страву</h2>

      <form onSubmit={handleSubmit} className="space-y-6 ">

        <label className="block">
          <span className="text-gray-700 font-medium">Категорія</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">-- Виберіть категорію --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Назва страви</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введіть назву"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Опис</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Опишіть страву"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 resize-y"
            rows={4}
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Ціна</span>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Введіть ціну"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            min="0"
            step="0.01"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium mb-1 block">Фото</span>
          <div>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="inline-block cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Обрати файл
            </label>
            {formData.photo && (
              <span className="ml-3 text-gray-700">{formData.photo.name}</span>
            )}
          </div>
        </label>

        <button
          type="submit"
           className="w-full bg-lime-200 text-teal-600 py-3 rounded-md hover:bg-lime-300 transition duration-300 font-semibold text-center shadow-md"
        >
          Створити
        </button>
      </form>

      {formProgress > 0 && formProgress < 100 && (
        <div className="fixed bottom-4 right-4 w-64 bg-white border border-gray-300 shadow-lg rounded-lg p-3 z-50">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center text-gray-700 mt-1">
            {formProgress}% заповнено
          </p>
        </div>
      )}
    </div>
  );
}

export default CreateProduct;