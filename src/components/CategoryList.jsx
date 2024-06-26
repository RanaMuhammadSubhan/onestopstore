// import { useCategories } from "../hooks/useCategoies";
// // import electronic from "../assets/images/lcd.jpg";
// // import mensclothing from "../assets/images/mensclothing.jpg";
// // import jewelery from "../assets/images/jewelery.jpg";
// // import femaleclothing from "../assets/images/clothes.jpg";
// import categoryImages from "../data/categoryimages";
// const CategoryList = () => {
//   const { categories, isLoading, isError } = useCategories();

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Failed to load categories.</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-4">Categories</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {categories.map((category, index) => (
//           <div key={index} className="relative group">
//             <img
//               src={
//                 categoryImages[category] || "/src/assets/categories/default.jpg"
//               }
//               alt={category}
//               className="w-full h-48 object-cover rounded-2xl "
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <h3 className="text-white text-lg font-semibold">
//                 {category.toUpperCase()}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryList;
import React from "react";
import { useCategories } from "../hooks/useCategoies";
import categoryImages from "../data/categoryimages";

const CategoryList = ({ onCategorySelect }) => {
  const { categories, isLoading, isError } = useCategories();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load categories.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => onCategorySelect(category)}
          >
            <img
              src={
                categoryImages[category] || "/src/assets/categories/default.jpg"
              }
              alt={category}
              className="w-full h-48 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black rounded-2xl bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold">
                {category.toUpperCase()}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
