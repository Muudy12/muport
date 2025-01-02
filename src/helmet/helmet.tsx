import { Helmet } from "react-helmet-async";

interface PageHelmetProps {
  page?: string;
  content: string;
  href: string;
}

class HelmetProps implements PageHelmetProps {
  page?: string;
  content: string;
  href: string;

  constructor(content: string, href: string, page?: string) {
    this.page = page;
    this.content = content;
    this.href = href;
  }
}

function PageHelmet(props: PageHelmetProps) {
  return (
    <>
      <Helmet>
        <title>Mu Port</title>
        <meta name="description" content={props.content} />
        <link rel="canonical" href={props.href} />
      </Helmet>
    </>
  );
}

export { HelmetProps };
export default PageHelmet;