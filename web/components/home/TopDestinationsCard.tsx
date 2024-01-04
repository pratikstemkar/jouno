import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const TopDestinationsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center group hover:cursor-pointer">
                    <span>Top Destinations</span>
                    <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition duration-200" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ol>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#1</span>{" "}
                        <span className="group-hover:underline">Srinagar</span>
                    </li>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#2</span>{" "}
                        <span className="group-hover:underline">Manali</span>
                    </li>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#3</span>{" "}
                        <span className="group-hover:underline">Andaman</span>
                    </li>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#4</span>{" "}
                        <span className="group-hover:underline">Udaipur</span>
                    </li>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#5</span>{" "}
                        <span className="group-hover:underline">Goa</span>
                    </li>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#6</span>{" "}
                        <span className="group-hover:underline">Varanasi</span>
                    </li>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#7</span>{" "}
                        <span className="group-hover:underline">Munnar</span>
                    </li>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#8</span>{" "}
                        <span className="group-hover:underline">Alleppey</span>
                    </li>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#9</span>{" "}
                        <span className="group-hover:underline">Jaipur</span>
                    </li>
                    <li className="group hover:cursor-pointer">
                        <span className="group-hover:text-blue-500">#10</span>{" "}
                        <span className="group-hover:underline">Coorg</span>
                    </li>
                </ol>
            </CardContent>
        </Card>
    );
};

export default TopDestinationsCard;
