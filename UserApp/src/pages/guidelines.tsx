import { Box } from '@mui/joy';
import Layout from '../components/layout/Layout';

export default function GuidlinesPage(){
  return(
    <Layout >
      <Box
        margin= "auto"

        sx={{
          width: 700,
          fontWeight: 450,
          padding: 5,
        }}
      >
        <div>
        Welcome to Baskin, an online marketplace
         where buyers and sellers can trade goods
        and services. We strive to create a safe
        and welcoming community for all of our users.
        To ensure that our community remains a positive
         and productive space, we have established the
          following guidelines:
        </div>

        <div>
          <b>1. </b>
        No Hate Speech: We do not tolerate any hate
         speech on our platform. This includes any
          language that is derogatory, discriminatory,
           or offensive towards any individual or group.
        </div>

        <div>
          <b>2. </b>
          No Fraudulent Activity: We have a zero-tolerance
          policy for any fraudulent activity on our platform.
           This includes any attempts to scam or deceive other users.
        </div>

        <div>
          <b>3. </b>
          No Illegal Activity: All transactions on Baskin must comply
           with local, state, and federal laws. Any illegal activity
            will not be tolerated and will result in immediate
           removal from the platform.
        </div>

        <div>
          <b>4. </b>
          No Prohibited Items: Certain items are prohibited from
           being sold on our platform, including but not limited
            to drugs, weapons, and stolen goods.
        </div>

        <div>
          <b>5. </b>
          Respect Other Users: We expect all users
           to treat each other with respect and kindness.
            This includes refraining from any harassing or
             threatening behavior.
        </div>

        <div>
          <b>6. </b>
          Accurate Listings: All listings must accurately
          represent the item or service being offered.
          Sellers must provide truthful and detailed descriptions
           of their listings, including any defects or issues
            with the item.
        </div>

        <div>
          <b>7. </b>
          No Duplicate Listings: Users are not allowed to post
          duplicate listings for the same item or service. This
           helps to keep our platform organized and easy to use.
        </div>

        <div>
          <b>8. </b>
          No Spam: We do not allow any spam or unsolicited
           advertising on our platform. Users found to be engaging
           in these activities will be removed from the platform.
        </div>

        <div>
        At Baskin, we take our community guidelines very seriously.
         We have a team of moderators who monitor our platform 24/7
         to ensure that all users are following these guidelines.
          Violations of our guidelines may result in temporary or
           permanent removal from our platform.
        </div>

        <div>
        We encourage all users to report any violations of our
         guidelines that they may encounter. By working together,
          we can create a safe and welcoming community for everyone.
        </div>

        <div>
        Thank you for choosing Baskin as your online marketplace.
         We look forward to building a positive and productive community with you!
        </div>

      </Box>
    </Layout>
  );
}