import { FC } from "react";
import { Button } from "../ui/button";
import { MdEdit } from "react-icons/md";

type Props = {
    onClick: () => void;
}

export const EditIconButton: FC<Props> = (props) => {
    const { onClick } = props;
    return (
        <Button
            colorPalette="blue"
            variant="outline"
            mr={{ md: 4, base: 0 }}
            size={{ md: 'md', base: 'sm' }}
            onClick={onClick}
            aria-label="open edit modal"
            data-testid="edit-button"
        >
            <MdEdit />
        </Button>
    );
}