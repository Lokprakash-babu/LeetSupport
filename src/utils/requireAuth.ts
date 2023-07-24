import { withSSRContext } from "aws-amplify";
import { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";
Auth.configure({ ...awsConfig, ssr: true });
export const requireAuth = async ({ req }: { req: any }) => {
  const { Auth } = withSSRContext({ req });
  console.log("request", req);
  const url = req.url;
  try {
    const response = await Auth.currentAuthenticatedUser();
    console.log("user", response);
    return {
      props: {
        user: JSON.stringify(response),
      },
    };
  } catch (err) {
    console.log("error", err);
    if (url === "/user") {
      return {
        props: {
          user: null,
        },
      };
    }
    return {
      redirect: {
        destination: "/user",
        permanent: false,
      },
    };
  }
};
