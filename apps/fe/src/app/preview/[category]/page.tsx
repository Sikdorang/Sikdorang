interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  return <div>My Post: {category}</div>;
}

//   return (
//     <>
//       <TopNav />
//       <div className="wrapper mx-auto flex flex-col sm:flex-row gap-16 mt-12">
//         <Sidebar categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

//         <div className=" grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 flex-1">
//           {filteredMenuItems.map((item: IMenu) => (
//             <Menu key={item.id} item={item} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// function Sidebar() {
//   return <ul>

//   </ul>
// }

// function MenuGrid() {}
