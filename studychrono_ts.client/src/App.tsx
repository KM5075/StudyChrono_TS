import { Box, ChakraProvider, Heading, Input, Table } from '@chakra-ui/react';
import theme from './theme/theme';
import PrimaryButton from './components/atoms/PrimaryButton';
import { StudyRecord } from './types/api/StudyRecord';
import { Field } from './components/ui/field';
import { useState } from 'react';
import { toaster, Toaster } from './components/ui/toaster';



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

    const [studyRecords, setStudyRecords] = useState<Array<StudyRecord>>(studyRecordsFakeData);
    const [studyTitle, setStudyTitle] = useState<string>("");
    const [studyTime, setStudyTime] = useState<number>(0);

    const onChangeStudyTitle = (e: React.ChangeEvent<HTMLInputElement>) => { setStudyTitle(e.target.value); }
    const onChangeStudyTime = (e: React.ChangeEvent<HTMLInputElement>) => { setStudyTime(Number(e.target.value)); }

    const onClickAddRecord = () => {
        // バリデーション
        if (studyTitle === "" ) {
            toaster.create({
                title: "エラー",
                description: "内容の入力は必須です。",
                type: "error"
            });
            return;
        }

        if(studyTime <= 0) {
            toaster.create({
                title: "エラー",
                description: "時間は1以上の数字を入力してください。",
                type: "error"
            });
            return;
        }

        const newRecord: StudyRecord = {
            id: studyRecords.length+1,// サーバー側でIDを振るため仮の値
            title: studyTitle,
            studyTime: studyTime,
        }
        setStudyRecords([...studyRecords, newRecord]);
        setStudyTitle("");
        setStudyTime(0);
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
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <br />

                <Box>
                    <h2 style={{ fontWeight: "bold", fontSize: "lg" }}>学習記録登録</h2>
                    <Field label="Title">
                        <Input bg="white" placeholder="Study Title" value={studyTitle} onChange={onChangeStudyTitle} />
                    </Field>
                    <Field label="Time(h)">
                        <Input bg="white" placeholder="Time" value={studyTime} onChange={onChangeStudyTime} type='number' />
                    </Field>
                </Box>
                <PrimaryButton onClick={ onClickAddRecord}>登録</PrimaryButton>
            </ChakraProvider>
        </>
    );

}

export default App;