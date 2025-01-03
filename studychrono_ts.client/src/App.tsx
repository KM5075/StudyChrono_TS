import { ChakraProvider, Heading, Table, useDisclosure } from '@chakra-ui/react';
import theme from './theme/theme';
import PrimaryButton from './components/atoms/PrimaryButton';
import { StudyRecord } from './types/api/StudyRecord';
import { useState, } from 'react';
import { toaster, Toaster } from './components/ui/toaster';
import { useForm } from 'react-hook-form';
import StudyRecordDetail from './components/organisms/StudyRecordDetail';

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
    const [onSubmit, setOnSubmit] = useState<() => void>(() => {});
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

    const onSubmitAdd = handleSubmit((data: StudyRecord) => {
        data.id = studyRecords.length + 1;
        setStudyRecords([...studyRecords, data]);
        reset();
        onClose();
        toaster.create({
            title: "新規登録",
            description: "学習記録を新規登録しました。",
            type: "success",
        });
    })

    const onSubmitEdit = handleSubmit((data: StudyRecord) => {
        const newStudyRecords = studyRecords.map((record) => {
            if (record.id === data.id) {
                return data;
            }
            return record;
        });
        setStudyRecords(newStudyRecords);
        onClose();
        toaster.create({
            title: "更新完了",
            description: "学習記録を更新しました",
            type: "success",
        });
    });

    const onClickEdit = (id: number) => {
        const targetRecord = studyRecords.find((record) => record.id === id);
        if (targetRecord) {
            setOnSubmit(() => onSubmitEdit);
            reset(targetRecord);
            onOpen();
        }
    }

    const onClickAdd = () => {
        setOnSubmit(() => onSubmitAdd);
        reset({
            id: 0,
            title: "",
            studyTime: 0,
        });
        onOpen();
    }

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
                            <Table.ColumnHeader></Table.ColumnHeader>
                            <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {studyRecords.map((record) => (
                            <Table.Row key={record.id}>
                                <Table.Cell>{record.title}</Table.Cell>
                                <Table.Cell>{record.studyTime}</Table.Cell>
                                <Table.Cell><PrimaryButton onClick={() => onClickEdit(record.id)}>編集</PrimaryButton></Table.Cell>
                                <Table.Cell><PrimaryButton onClick={() => onClickDelete(record.id)}>削除</PrimaryButton></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <br />
                <PrimaryButton onClick={ onClickAdd }>新規登録</PrimaryButton>
                <StudyRecordDetail open={open} onToggle={onToggle} onSubmit={onSubmit} errors={errors} register={register} />
            </ChakraProvider>
        </>
    );

}

export default App;