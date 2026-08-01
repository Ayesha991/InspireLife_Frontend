import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import IndustriesSection from '../components/home/IndustriesSection';
import AboutPreview from '../components/home/AboutPreview';
import GlobalPresenceCTA from '../components/home/GlobalPresenceCTA';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>IPTS Global</title>
        <meta name="description" content="IPTS Global provides premier industrial, engineering, and MEP products across the Middle East. Excellence in sourcing and supply." />
        <meta
          name="description"
          content="IPTS is a leading supplier of industrial, electrical, mechanical, chemical and oilfield equipment for Oil & Gas, Power, Marine and Industrial industries across UAE and the Middle East."
        />
        <meta property="og:title" content="IPTS — Engineering Solutions. Delivering Excellence." />
        <meta
          property="og:description"
          content="A leading procurement and product supply company with branches in UAE and Oman."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <main id="main-content" className="w-full overflow-hidden">
        <Hero />
        <IndustriesSection />
        <AboutPreview />
        <GlobalPresenceCTA />
      </main>
    </>
  );
}
