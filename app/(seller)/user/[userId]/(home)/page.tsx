// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";

// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     userId: string;
//   };
// }) {
//   let Name = "";
//   const docRef = doc(db, "users", params.userId);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     const obj = {
//       id: params.userId,
//       ...docSnap.data(),
//     };
//     // @ts-ignore
//     Name = obj.name;
//   }

//   return {
//     title: Name,
//   };
// }

const DashboardHomePage = ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  return <div>home</div>;
};

export default DashboardHomePage;
