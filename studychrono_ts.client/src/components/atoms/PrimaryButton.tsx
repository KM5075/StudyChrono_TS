import React, { FC } from "react";
import { Button } from "../ui/button";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
}

const PrimaryButton: FC<Props> = (props) => {
    const { children, onClick } = props;
    return (
        <Button bg={"teal"} onClick={onClick} borderRadius={50} _hover={{ opacity: 0.8 }}> {children}</Button >
    );
}

export default PrimaryButton;