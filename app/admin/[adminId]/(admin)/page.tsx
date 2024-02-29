import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

import AdminProfile from "@/components/admin/AdminProfile";

// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     adminId: string;
//   };
// }) {
//   let Name = "";
//   const docRef = doc(db, "users", params.adminId);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     const obj = {
//       id: params.adminId,
//       ...docSnap.data(),
//     };
//     // @ts-ignore
//     Name = obj.name;
//   }

//   return {
//     title: `Admin: ${Name}`,
//   };
// }

const AdminPage = ({
  params,
}: {
  params: {
    adminId: string;
  };
}) => {
  return <AdminProfile userId={params.adminId} />;
};

export default AdminPage;
