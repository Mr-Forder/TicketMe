import Head from "next/head";
import { useRouter } from "next/router";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ title, keywords, description, children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      {router.pathname === "/" && <h1>BANNER</h1>}
      <div>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "TicketMe",
  description: "Ticketing system for support issues",
  keywords: "whatever",
};

export default Layout;
