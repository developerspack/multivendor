import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import AddEditClient from "@/components/admin/AddDriver/AddEditClient";

interface ItemPageProps {
  params: {
    addDriver: string;
  };
}

// export async function generateMetadata({ params }: ItemPageProps) {
//   let Name = "";
//   const docRef = doc(db, "driver", params.addDriver);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     const obj = {
//       id: params.addDriver,
//       ...docSnap.data(),
//     };
//     // @ts-ignore
//     Name = obj.Name;
//   }

//   return {
//     title: Name === "" ? "Add Driver" : `Edit: ${Name}`,
//   };
// }

export default function AddEditItem({ params }: ItemPageProps) {
  return <AddEditClient id={params.addDriver} />;
}
