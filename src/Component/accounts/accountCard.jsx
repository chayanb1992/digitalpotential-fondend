export default function AccountCard({ item }) {
  // console.log(item)
  return (
    <div
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white
      transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="overflow-hidden">
        {/* <img
          src={item.image}
          alt={item.title}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        /> */}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold">
            {item.icon}
            <span className="text-slate-600">{item.platform}</span>
          </div>

          <span className="text-xs text-slate-500">{item.followers}</span>
        </div>

        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">
          {item.title}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">{item.price}</span>

          <button className="text-xs font-semibold text-orange-500 hover:underline">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
