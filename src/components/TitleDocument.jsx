import { Helmet } from "react-helmet-async";

const TitleDocument = ({ children }) => (
  <Helmet>
    <title>{children}</title>
  </Helmet>
);
export default TitleDocument;