import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

interface ModalCardProps {
    name: string;
    sku: string;
    amount: number;
  }
export default function ProductCards({name, sku, amount}: ModalCardProps) {
  return (
    <Card>
      <CardBody>
        <p>{name} beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
}