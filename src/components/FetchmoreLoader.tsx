import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export interface IFetchMore {
  fetchMore: () => any;
}
const FetchmoreLoader = ({ fetchMore }: IFetchMore) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    fetchMore();
  }, [inView]);
  return (
    <div ref={ref}>
      <p>Fetch More</p>
    </div>
  );
};

export default FetchmoreLoader;
