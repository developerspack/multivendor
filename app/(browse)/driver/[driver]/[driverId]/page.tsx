import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import AddEditClient from "@/components/admin/AddDriver/AddEditClient";

interface ItemPageProps {
  params: {
    driverId: string;
  };
}

// export async function generateMetadata({ params }: ItemPageProps) {
//   let Name = "";
//   const docRef = doc(db, "driver", params.driverId);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     const obj = {
//       id: params.driverId,
//       ...docSnap.data(),
//     };
//     // @ts-ignore
//     Name = obj.Name;
//   }

//   return {
//     title: Name === "" ? "Add Driver" : `Edit: ${Name}`,
//   };
// }

const EditDriver = ({ params }: ItemPageProps) => {
  return <AddEditClient id={params.driverId} />;
};

export default EditDriver;
