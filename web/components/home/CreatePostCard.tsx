import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CreatePostCard = () => {
    return (
        <Card className="w-full">
            <CardContent className="mt-5">
                <div className="flex space-x-2">
                    <Input placeholder="Write about your recent travel..." />
                    <Button variant={"default"}>Create Post</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CreatePostCard;
