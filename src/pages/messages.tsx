import Layout from "../components/layout/Layout";
// import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     props: {},
//   }
// }

export default function MessagesPage() {
  return (
    <Layout
      sidebar={<>conversations go here</>}
    >
      messages go here
    </Layout>
  );
}
