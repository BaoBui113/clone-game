import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  const baseUri = process.env.NEXT_PUBLIC_BASE_URI;
  return { props: {
    baseUri:baseUri
   } };
};


