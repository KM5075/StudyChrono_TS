import { ChakraProvider, Heading, Table, useDisclosure } from '@chakra-ui/react';
import theme from './theme/theme';
import PrimaryButton from './components/atoms/PrimaryButton';
import { StudyRecord } from './types/api/StudyRecord';
import { useEffect, useState, } from 'react';
import { toaster, Toaster } from './components/ui/toaster';
import { useForm } from 'react-hook-form';
import StudyRecordDetail from './components/organisms/StudyRecordDetail';
import axios from 'axios';
import { getStudyRecords } from './utils/ApiAccess';

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
  const [count, setCount] = useState<number>(0);
  const [onClickCount, setOnClickCount] = useState<() => void>();

  const IncrementOne = () => {
    setCount(count + 1);
  }
  const IncrementTwo = () => {
    setCount(count + 2);
  }

  const onClickIncrementOne = () => {
    setOnClickCount(IncrementOne);
  }

  const onClickIncrementTwo = () => {
    setOnClickCount(IncrementTwo);
  }


  // const [onSubmit, setOnSubmit] = useState<() => Promise<void>>(() => Promise.resolve());
  const [onSubmit, setOnSubmit] = useState<() => Promise<void>>(() => Promise.resolve());
  const { register, handleSubmit, formState: { errors }, reset } = useForm<StudyRecord>({
    criteriaMode: "all",
    defaultValues: {
      id: 0,
      title: "",
      studyTime: 0,
    },
  });

  const [studyRecords, setStudyRecords] = useState<Array<StudyRecord>>(studyRecordsFakeData);
  const [loadig, setLoading] = useState<boolean>(true);

  //useEffect(() => {
  //  axios.get<Array<StudyRecord>>("api/studyrecord").then((res) => {
  //    setStudyRecords(res.data);
  //  });
  //}, []);

  useEffect(() => {
    const getAllRecords = async () => {
      const records = await getStudyRecords();
      setStudyRecords(records);
      setLoading(false);
    }

    getAllRecords();
  }, []);

  /*   async function getStudyRecords(): Promise<StudyRecord[]> {
      const res = await axios.get<Array<StudyRecord>>("api/studyrecord");
      return res.data;
     */



  const { open, onOpen, onClose, onToggle } = useDisclosure();

  const onSubmitAdd = handleSubmit((data: StudyRecord) => {

    console.log('Start adding');
    data.id = 0; // 仮のIDを設定
    axios.post<StudyRecord>("api/studyrecord", data).then((res) => {
      console.log(res.data);
      setStudyRecords([...studyRecords, data]);
      reset();
      onClose();
      toaster.create({
        title: "新規登録",
        description: "学習記録を新規登録しました。",
        type: "success",
      });
    });
  })
  // const onSubmitEdit = handleSubmit((data: StudyRecord) => {
  const onSubmitEdit = handleSubmit((data: StudyRecord) => {
    console.log(data);
    axios.put<StudyRecord>(`api/studyrecord/${data.id}`, data).then((res) => {
      console.log('Start updating');
      console.log(res.data);
      const updatedRecord = res.data;
      console.log(updatedRecord);
      const newStudyRecords = studyRecords.map((record) => {
        if (record.id === updatedRecord.id) {
          return updatedRecord;
        }
        return record;
      });
      console.log(newStudyRecords);
      console.log('End updating');
      onClose();
      console.log('Close dialog');
      setStudyRecords(newStudyRecords);
      toaster.create({
        title: "更新完了",
        description: "学習記録を更新しました",
        type: "success",
      });

    });
  });

  const onClickEdit = (id: number) => {
    console.log('Edit button clicked');
    const targetRecord = studyRecords.find((record) => record.id === id);
    if (targetRecord) {
      console.log('Record found');
      setOnSubmit(() => onSubmitEdit);
      reset(targetRecord);
      onOpen();
      console.log('Dialog opened');
    }
    else {
      console.log('Record not found');
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
    axios.delete(`api/studyrecord/${id}`).then((res) => {
      console.log(res.data);
    });
    const newStudyRecords = studyRecords.filter((record) => record.id !== id);
    setStudyRecords(newStudyRecords);
    toaster.create({
      title: "削除完了",
      description: "学習記録を削除しました",
      type: "success",
    });
  }

  const onClickGetInfo = () => {
    axios.get<Array<StudyRecord>>("api/studyRecord").then((res) => {
      console.log(res.data);
      setStudyRecords(res.data);
    });
  }

  return (
    <>
      <ChakraProvider value={theme}>
        <Toaster />
        <br />
        <Heading as="h1" fontSize="5xl" fontWeight="bold">Study Chrono</Heading>
        <br />
        <h2 style={{ fontWeight: "bold", fontSize: " 3xl" }} >学習記録一覧</h2>
        {loadig ?
          <p>ローディング中...</p>
          :
          <Table.Root variant="line" data-testid="table">
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
        }
        <PrimaryButton onClick={onClickGetInfo}>更新</PrimaryButton>
        <br />
        <PrimaryButton onClick={onClickAdd}>新規登録</PrimaryButton>
        <StudyRecordDetail open={open} onToggle={onToggle} onSubmit={onSubmit} errors={errors} register={register} />
        <p>Count is :{count}</p>
        <PrimaryButton onClick={onClickCount}>Increment Click</PrimaryButton>
        <PrimaryButton onClick={onClickIncrementOne}>Increment One</PrimaryButton>
        <PrimaryButton onClick={onClickIncrementTwo}>Increment Two</PrimaryButton>
      </ChakraProvider>
    </>
  );

}

export default App;