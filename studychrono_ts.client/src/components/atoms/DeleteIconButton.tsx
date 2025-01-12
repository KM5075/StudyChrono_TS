import { MdDeleteOutline } from "react-icons/md";
import { Button } from "../ui/button";
import { FC } from "react";

type Props = {
    onClick: () => void;
}

export const DeleteIconButton: FC<Props> = (props) => {
    const { onClick } = props;
    return (
        <Button
            colorPalette="red"
            variant="outline"
            mr={{ md: 4, base: 0 }}
            size={{ md: 'md', base: 'sm' }}
            onClick={onClick}
            aria-label="delete study record"
            data-testid="delete-button"
        >
            <MdDeleteOutline />
        </Button>
    );
}