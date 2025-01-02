import { Box, Button, ChakraProvider, Heading, Input, Table } from '@chakra-ui/react';
import theme from './theme/theme';
import PrimaryButton from './components/atoms/PrimaryButton';
import { StudyRecord } from './types/api/StudyRecord';
import { Field } from './components/ui/field';
import { useState } from 'react';



const studyRecords: Array<StudyRecord> = [
    {
        id: '1',
        title: 'TypeScript',
        studyTime: 1,
    },
    {
        id: '2',
        title: 'React',
        studyTime: 2,
    },
    {
        id: '3',
        title: 'Next.js',
        studyTime: 3,
    },
];


function App() {
    return (
        <>
            <ChakraProvider value={theme}>
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
                <br />Button, 
                <Button bg={"teal"}>Click me</Button>
                <PrimaryButton>Click me primary</PrimaryButton>
            </ChakraProvider>
        </>
    );

}

export default App;