import { withSSRContext } from "aws-amplify";
import { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";
Auth.configure({ ...awsConfig, ssr: true });
export const requireAuth = async ({ req }: { req: any }) => {
  const { Auth } = withSSRContext({ req });

  try {
    const response = await Auth.currentAuthenticatedUser();
    return {
      props: {
        user: JSON.stringify(response),
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/user",
        permanent: false,
      },
    };
  }
};
