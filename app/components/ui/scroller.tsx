import { cn } from "@/utils/classnames";
import { FC, ReactNode, useEffect, useRef } from "react";

type ScrollerContent = {
  /**
   * id or key for each content
   */
  id?: string | number;

  /**
   * when component showed in viewprot
   */
  onEnter?: (params: { id?: string | number }) => void;

  /**
   * children
   */
  children?: ReactNode;
};

export type ScrollerProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  index?: number;

  setIndex?: (index: number) => void;

  threshold?: number;

  contents: ScrollerContent[];
};

export const FullScroller: FC<ScrollerProps> = ({
  index,
  setIndex,
  contents,
  threshold,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const contentRefs = useRef<HTMLDivElement[]>([]);

  /**
   * update scroll positions
   */
  useEffect(() => {
    if (index !== undefined && contentRefs.current[index])
      contentRefs.current[index].scrollIntoView();
  }, [index]);

  useEffect(() => {
    const observerConfig = {
      root: ref.current,
      rootMargin: "0px",
      threshold: threshold ?? 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-scroll"));

          setIndex?.(index);

          contents[index].onEnter?.({
            id: contents[index].id,
          });
        }
      });
    }, observerConfig);

    contentRefs.current.forEach((contentRef) => {
      contentRef && observer.observe(contentRef);
    });

    /**
     * run for first time
     */
    if (index !== undefined && contents[index])
      contents[index].onEnter?.({ id: contents[index].id });

    if (index === undefined && contents[0] !== undefined)
      contents[0].onEnter?.({ id: contents[0].id });

    return () => observer.disconnect();
  }, [contents]);

  // This function handles the reference of each video
  const handleContentRef = (index: number) => (ref: HTMLDivElement) => {
    contentRefs.current[index] = ref;
  };

  return (
    <div
      ref={ref}
      style={{ scrollSnapType: "y mandatory" }}
      className={cn(
        "no-scrollbar relative size-full overflow-y-scroll",
        className
      )}
      {...props}
    >
      {contents.map((content, idx) => (
        <div
          data-scroll={idx}
          key={content.id || idx}
          ref={handleContentRef(idx)}
          className="relative size-full"
          style={{ scrollSnapAlign: "start" }}
        >
          {content.children}
        </div>
      ))}
    </div>
  );
};
