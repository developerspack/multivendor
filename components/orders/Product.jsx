import Image from "next/image";
import Link from "next/link";
import { FcRating } from "react-icons/fc";

const Product = ({ id, imageUrl, Name, Price, qty }) => {
  return (
    <div className="flex justify-between p-3 border-b border-slate-800">
      {/* items */}
      <div className="flex-shrink-0 flex gap-4">
        {/* img */}
        <Image
          width={500}
          height={500}
          src={imageUrl}
          alt={Name}
          className="md:w-24 md:h-24 w-28 h-28 rounded-lg"
        />
        {/* name qty */}
        <div>
          <p className="md:text-xl text-sm font-bold">{Name.slice(0, 40)}..</p>
          <p className="text-sm font-bold md:text-2xl">{qty} Items</p>
        </div>
      </div>
      {/* Price rate link */}
      <div>
        {/* Price */}
        <p className="text-sm font-bold md:text-2xl">Ksh.{Price}</p>
        {/* Link */}
        <Link
          className="flex items-center gap-2 mt-3 border-2 border-slate-600 rounded-lg p-2 w-[150px] hover:bg-primary cursor-pointer hover:text-black"
          href={`/productRating/${id}`}
        >
          <FcRating className="w-5 h-5" />
          <span className="font-bold text-base">Rate Product</span>
        </Link>
      </div>
    </div>
  );
};

export default Product;
