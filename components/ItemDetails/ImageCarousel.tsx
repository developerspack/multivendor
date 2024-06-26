import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ImageCarousel = ({ otherImages }: { otherImages: string[] }) => {
  return (
    <Carousel className="w-full items-center flex justify-center">
      <CarouselContent className="-ml-1">
        {otherImages.map((image) => (
          <CarouselItem
            key={image}
            className="pl-1 md:basis-1/2 lg:basis-1/3 h-full"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-4">
                  <img src={image} alt="" className="rounded-md h-full" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageCarousel;
