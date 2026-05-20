import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "#/components/ui/card";

const ActiveScanCard = () => {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <CardHeader className="uppercase text-(--color-text-muted) text-center">
          Active Scans
        </CardHeader>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col gap-2 font-medium w-full"></div>
      </CardFooter>
    </Card>
  );
};

export default ActiveScanCard;
