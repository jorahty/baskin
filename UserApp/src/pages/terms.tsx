import { Box } from '@mui/joy';
import Layout from '../components/layout/Layout';

export default function TermsPage() {
  return (
    <Layout >
      <Box
        margin= "auto"

        sx={{
          width: 700,
          fontWeight: 450,
          padding: 5,
        }}
      >

        <div>Welcome to Baskin, an online marketplace where buyers and sellers can trade goods
           and services. By using our website, you agree to the following terms and conditions:</div>

        <div><b>Prohibited Content:</b> Baskin prohibits the use of foul language, hate
         speech, offensive material, and illegal activities on our website.
          We reserve the right to remove any listings that violate these policies.</div>

        <div><b>Final Sale:</b> All transactions on Baskin are final, and we do not offer
         returns or refunds. We encourage buyers to carefully review listings
          and ask sellers any questions before making a purchase.</div>

        <div><b>Liability:</b> Baskin is not responsible for any issues that arise during
         a transaction, including but not limited to misrepresentation of goods
          or services, non-delivery, or fraudulent activity.
          Buyers and sellers assume all risks associated with their transactions.</div>

        <div><b>User Conduct:</b> Users are responsible for complying with all applicable
         laws and regulations when using our website. Users must not engage in
          any behavior that violates these terms and conditions,
          including but not limited to impersonating another person or entity,
           using false information, or interfering with
          other users&apos; access to our website.</div>

        <div><b>Termination:</b> Baskin reserves the right to terminate any
        user&apos;s access to our website for any reason,
         including but not limited to violating these terms and conditions or
          engaging in illegal activities.</div>

        <div>By using Baskin&apos;s services, you agree to these terms and conditions.
           If you do not agree to these
           terms and conditions, you should not use our website.</div>
      </Box>
    </Layout>
  );
}
