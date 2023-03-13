import Layout from '../components/layout/Layout';
import { Box } from '@mui/joy';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations((context.locale as string) ?? 'en', ['common'])),
      locale: (context.locale as string) ?? 'en',
    },
  };
};

interface Props {
  locale: string;
}

export default function AboutPage({ locale }: Props) {
  return (
    <Layout locale={locale} disableSidebarToggle>
      <Box
        margin="auto"
        sx={{
          width: 700,
          fontWeight: 450,
          padding: 5,
        }}
      >
        <div>
          Welcome to our Full Stack Web Development Capstone project, Baskin! We are a team of six
          students from UCSC, consisting of James Tennant, Eric Hernandez, Nout Reusken, José Chavez,
          Cody Lambert, and Ash Yaw.
        </div>
        <div>
          Our goal with Baskin was to create a seamless and user-friendly online marketplace where buyers
          and sellers can come together to trade goods and services. We chose to use GraphQL, Next.js,
          and PostgresSQL to create our website, utilizing separate microservices for each of our
          database tables.
        </div>
        <div>
          We believe that our website will provide a superior user experience compared to other online
          marketplaces. By using Next.js, we have been able to create a website that is fast and
          responsive, making it easy for users to navigate and find what they are looking for. Our use of
          GraphQL also makes it easy for us to fetch data from our database, which helps to further
          improve the speed and performance of our website.
        </div>
        <div>
          At Baskin, we are committed to creating a safe and secure platform for all of our users. We
          have implemented a variety of measures to ensure that our users can trust the people they are
          buying from and selling to. We also have a strong set of terms and conditions that all users
          must agree to when they use our website.
        </div>
        <div>
          We are proud of the work we have done on Baskin, and we hope that our website will be a
          valuable resource for buyers and sellers alike. Thank you for visiting our website, and we look
          forward to seeing you on Baskin!
        </div>
      </Box>
    </Layout>
  );
}
