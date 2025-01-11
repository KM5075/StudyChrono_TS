import { FC } from "react";
import { Input } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle
} from "../ui/dialog"
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import { StudyRecord } from "../../types/api/StudyRecord";

type Props = {
    open: boolean;
    onToggle: () => void;
    onSubmit: () => Promise<void>;
    errors: FieldErrors<StudyRecord>;
    register: UseFormRegister<StudyRecord>;
}

const StudyRecordDetail: FC<Props> = (props) => {
    const { open, onToggle, onSubmit, errors, register } = props;
    return (
        <>
            <DialogRoot open={open} onOpenChange={onToggle}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>新規登録</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>
                        <DialogBody>
                            <Field label="Title" invalid={!!errors.title} errorText={errors.title?.message}>
                                <Input bg="white" placeholder="Study Title" data-testid="input-title"
                                    {...register("title", {
                                        required: "Title is required",
                                    })} />
                            </Field>
                            <Field label="Time(h)" invalid={!!errors.studyTime} errorText={errors.studyTime?.message}>
                                <Input bg="white" placeholder="Time" type="number" data-testid="input-time"
                                    {...register("studyTime", {
                                        required: { value: true, message: "Study Time is required" },
                                        min: { value: 1, message: "Time must be greater than 0" }
                                    })} />
                            </Field>
                            <br />
                        </DialogBody>
                        <DialogFooter>
                            <DialogActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogActionTrigger>
                            <Button type="submit" bg="teal" color="white">登録</Button>
                        </DialogFooter>
                    </form>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </>
    );
}

export default StudyRecordDetail;
