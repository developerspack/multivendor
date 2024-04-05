"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import ItemDetails from "./ItemDetails";
import { db } from "@/lib/firebase";

const ClientPage = ({ id }: { id: string }) => {
  const [document, setDocument] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const obj = {
          id: id,
          ...docSnap.data(),
        };
        setDocument(obj);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Document not found");
      }
    };
    id && getDocument();
  }, [id, document]);
  return (
    <>
      <div className="py-6 p-5 bg-stone-900/10 dark:bg-stone-50/10 mt-6 rounded-md shadow-xl">
        {/* product card */}
        <div className="mt-6 rounded-lg mb-24 md:mb-12 flex">
          <ItemDetails {...document} data={document} />
        </div>
      </div>
    </>
  );
};

export default ClientPage;
