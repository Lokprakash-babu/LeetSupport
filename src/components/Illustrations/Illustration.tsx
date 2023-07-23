import Lottie from "react-lottie";
import customerSupport from "./illustrationJson/customerSupport.json";

export type IllustrationName = "customer-support";
export interface IllustrationProps {
  name: IllustrationName;
}
const Illustration = ({ name }: IllustrationProps) => {
  let animationData = customerSupport;
  if (name === "customer-support") {
    animationData = customerSupport;
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default Illustration;
