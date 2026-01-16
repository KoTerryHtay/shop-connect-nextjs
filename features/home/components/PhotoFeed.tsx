import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import ImageCarouselDot from "@/features/home/components/ImageCarouselDot";
import { description, images } from "@/features/home/dummyData";
import PhotoFeedButton from "@/features/home/components/PhotoFeedButton";
import PhotoFeedText from "./PhotoFeedText";

export default function PhotoFeed() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    // sm:max-w-lg
    <div className="mx-auto max-w-lg min-h-screen flex justify-between gap-4">
      <Carousel setApi={setApi} className="w-full relative">
        <CarouselContent className="min-h-screen">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="relative w-lg sm:w-xl aspect-square overflow-hidden"
            >
              <Image
                src={image}
                alt={image}
                // width={600}
                // height={400}
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* PhotoFeedButton ( profile, like, comment, share) */}
        <PhotoFeedButton />

        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
          <CarouselPrevious className="bg-background/50! cursor-pointer" />
          <div className="text-muted-foreground py-2 text-center text-sm">
            <ImageCarouselDot currentCount={current} totalCount={count} />
          </div>
          <CarouselNext className="bg-background/50! cursor-pointer" />
        </div>
        <div className="absolute bottom-16 left-4 ">
          <PhotoFeedText text={description} />
        </div>
      </Carousel>
      {/* Desktop Photo Description */}
      {/* <div className="max-md:hidden md:max-w-lg text-white">
        <div className="w-full">Desktop Photo Description</div>
      </div> */}
    </div>
  );
}
