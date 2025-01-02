import { Box, ChakraProvider, Heading, Input, Table, useDisclosure } from '@chakra-ui/react';
import theme from './theme/theme';
import PrimaryButton from './components/atoms/PrimaryButton';
import { StudyRecord } from './types/api/StudyRecord';
import { Field } from './components/ui/field';
import { useState, } from 'react';
import { toaster, Toaster } from './components/ui/toaster';
import { useForm } from 'react-hook-form';
import { Button } from './components/ui/button';

import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "./components/ui/dialog"



const studyRecordsFakeData: Array<StudyRecord> = [
    {
        id: 1,
        title: 'TypeScript',
        studyTime: 1,
    },
    {
        id: 2,
        title: 'React',
        studyTime: 2,
    },
    {
        id: 3,
        title: 'Next.js',
        studyTime: 3,
    },
];

function App() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<StudyRecord>({
        criteriaMode: "all",
        defaultValues: {
            id: 0,
            title: "",
            studyTime: 0,
        },
    });

    const [studyRecords, setStudyRecords] = useState<Array<StudyRecord>>(studyRecordsFakeData);
    const { open, onOpen, onClose, onToggle } = useDisclosure();

    const onSubmit = handleSubmit((data: StudyRecord) => {
        setStudyRecords([...studyRecords, data]);
        reset();
    })


    const onClickDelete = (id: number) => {
        const newStudyRecords = studyRecords.filter((record) => record.id !== id);
        setStudyRecords(newStudyRecords);
        toaster.create({
            title: "削除完了",
            description: "学習記録を削除しました",
            type: "success",
        });
    }

    return (
        <>
            <ChakraProvider value={theme}>
                <Toaster />
                <br />
                <Heading as="h1" fontSize="5xl" fontWeight="bold">Study Chrono</Heading>
                <br />
                <h2 style={{ fontWeight: "bold", fontSize: " 3xl" }}>学習記録一覧</h2>
                <Table.Root variant="line">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Title</Table.ColumnHeader>
                            <Table.ColumnHeader>Study Time(h)</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {studyRecords.map((record) => (
                            <Table.Row key={record.id}>
                                <Table.Cell>{record.title}</Table.Cell>
                                <Table.Cell>{record.studyTime}</Table.Cell>
                                <Table.Cell><PrimaryButton>編集</PrimaryButton></Table.Cell>
                                <Table.Cell><PrimaryButton onClick={() => onClickDelete(record.id)}>削除</PrimaryButton></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <br />


                <DialogRoot open={open} onOpenChange={onToggle}>
                    <DialogTrigger asChild>
                        <PrimaryButton>新規登録</PrimaryButton>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>新規登録</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                            <form onSubmit={onSubmit}>
                                <Field label="Title" invalid={!!errors.title} errorText={errors.title?.message}>
                                    <Input bg="white" placeholder="Study Title"
                                        {...register("title", {
                                            required: "Title is required",
                                        })} />
                                </Field>
                                <Field label="Time(h)" invalid={!!errors.studyTime} errorText={errors.studyTime?.message}>
                                    <Input bg="white" placeholder="Time" type="number"
                                        {...register("studyTime", {
                                            required: { value: true, message: "Study Time is required" },
                                            min: { value: 1, message: "Time must be greater than 0" }
                                        })} />
                                </Field>
                                <br />
                                <Button type="submit" bg="teal" color="white">登録</Button>
                            </form>
                        </DialogBody>
                        <DialogFooter>
                            <DialogActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogActionTrigger>
                            <Button>Save</Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                    </DialogContent>
                </DialogRoot>
            </ChakraProvider>
        </>
    );

}

export default App;